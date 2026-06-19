# SPDX-License-Identifier: AGPL-3.0-only
"""
Repack horizontal mega sprite strips into square TexturePacker atlases (method A: pad to square).

Only touches *-mega* PNG+JSON with aspect ratio >= 4 under assets/images/pokemon
(excludes icons/, exp/, variant/).
"""

from __future__ import annotations

import json
import math
import re
import sys
from pathlib import Path

from PIL import Image

REPO_ROOT = Path(__file__).resolve().parents[2]
POKEMON_DIR = REPO_ROOT / "assets" / "images" / "pokemon"
REPORT_PATH = REPO_ROOT / "assets-backup-mega-strips" / "repack-report.csv"
FRAME_RE = re.compile(r"^(\d+)\.png$", re.IGNORECASE)

EXCLUDE_PARTS = frozenset({"icons", "exp", "variant"})
STRIP_RATIO = 4.0


def is_strip_png(path: Path) -> bool:
    if "mega" not in path.stem.lower():
        return False
    if any(part in EXCLUDE_PARTS for part in path.parts):
        return False
    with Image.open(path) as im:
        w, h = im.size
    if min(w, h) == 0:
        return False
    return max(w, h) / min(w, h) >= STRIP_RATIO


def frame_sort_key(filename: str) -> int:
    m = FRAME_RE.match(filename)
    if not m:
        raise ValueError(f"Unexpected frame filename: {filename}")
    return int(m.group(1))


def repack_pair(png_path: Path, dry_run: bool = False) -> dict:
    json_path = png_path.with_suffix(".json")
    if not json_path.exists():
        raise FileNotFoundError(f"Missing JSON: {json_path}")

    with open(json_path, encoding="utf-8") as f:
        data = json.load(f)

    tex = data["textures"][0]
    frames = sorted(tex["frames"], key=lambda fr: frame_sort_key(fr["filename"]))
    n = len(frames)
    if n == 0:
        raise ValueError("No frames in atlas")

    with Image.open(png_path) as src:
        src_w, src_h = src.size
        if src_w != tex["size"]["w"] or src_h != tex["size"]["h"]:
            raise ValueError(f"PNG/JSON size mismatch for {png_path.name}")

        cells: list[Image.Image] = []
        cell_w = cell_h = None
        for i, fr in enumerate(frames):
            rect = fr["frame"]
            x, y, w, h = rect["x"], rect["y"], rect["w"], rect["h"]
            if y != 0 and i < min(5, n):
                pass  # still allow if all y=0 checked below
            if i == 0:
                cell_w, cell_h = w, h
            elif (w, h) != (cell_w, cell_h):
                raise ValueError(f"Non-uniform frame size in {png_path.name}")

            expected_x = i * cell_w if cell_w else x
            if x != expected_x or y != 0:
                raise ValueError(f"Non-horizontal strip layout in {png_path.name} frame {fr['filename']}")

            cells.append(src.crop((x, y, x + w, y + h)))

        if cell_w is None or src_w != cell_w * n or src_h != cell_h:
            raise ValueError(f"Strip dimensions don't match frame count for {png_path.name}")

        cols = math.ceil(math.sqrt(n))
        rows = math.ceil(n / cols)
        content_w = cols * cell_w
        content_h = rows * cell_h
        side = max(content_w, content_h)

        if dry_run:
            return {
                "rel": str(png_path.relative_to(POKEMON_DIR)),
                "n": n,
                "old": f"{src_w}x{src_h}",
                "new": f"{side}x{side}",
                "status": "dry-run",
            }

        out = Image.new("RGBA", (side, side), (0, 0, 0, 0))
        for i, cell in enumerate(cells):
            col = i % cols
            row = i // cols
            out.paste(cell, (col * cell_w, row * cell_h))

        for i, fr in enumerate(frames):
            col = i % cols
            row = i // cols
            fr["frame"]["x"] = col * cell_w
            fr["frame"]["y"] = row * cell_h
            # w, h unchanged

        tex["size"]["w"] = side
        tex["size"]["h"] = side
        out.save(png_path, "PNG")

        with open(json_path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(data, f, indent="\t", ensure_ascii=False)
            f.write("\n")

    return {
        "rel": str(png_path.relative_to(POKEMON_DIR)),
        "n": n,
        "old": f"{src_w}x{src_h}",
        "new": f"{side}x{side}",
        "status": "ok",
    }


def iter_strip_pngs() -> list[Path]:
    out: list[Path] = []
    for png in sorted(POKEMON_DIR.rglob("*mega*.png")):
        if is_strip_png(png):
            out.append(png)
    return out


def main() -> int:
    dry_run = "--dry-run" in sys.argv
    paths = iter_strip_pngs()
    if not paths:
        print("No strip mega PNGs found.")
        return 1

    print(f"Found {len(paths)} strip atlases.")
    results: list[dict] = []
    errors: list[tuple[str, str]] = []

    for png in paths:
        try:
            results.append(repack_pair(png, dry_run=dry_run))
            print(f"{'[dry] ' if dry_run else ''}OK {png.relative_to(POKEMON_DIR)}")
        except Exception as e:
            rel = str(png.relative_to(POKEMON_DIR))
            errors.append((rel, str(e)))
            print(f"FAIL {rel}: {e}", file=sys.stderr)

    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(REPORT_PATH, "w", encoding="utf-8") as f:
        f.write("rel,n,old_size,new_size,status\n")
        for r in results:
            f.write(f"{r['rel']},{r['n']},{r['old']},{r['new']},{r['status']}\n")
        for rel, msg in errors:
            f.write(f"{rel},,,,error:{msg}\n")

    print(f"\nDone: {len(results)} ok, {len(errors)} failed.")
    print(f"Report: {REPORT_PATH}")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
