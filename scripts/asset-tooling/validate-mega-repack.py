# Quick validation after repack-mega-strips.py
from __future__ import annotations

import json
from pathlib import Path

from PIL import Image

REPO = Path(__file__).resolve().parents[2]
ROOT = REPO / "assets" / "images" / "pokemon"
BACKUP = REPO / "assets-backup-mega-strips" / "images" / "pokemon"
MANIFEST = REPO / "assets-backup-mega-strips" / "manifest.txt"


def main() -> None:
    errors: list[str] = []
    strips_left: list[str] = []
    max_side = 0

    for rel in MANIFEST.read_text(encoding="utf-8").splitlines():
        rel = rel.strip()
        if not rel:
            continue
        p = ROOT / rel
        with Image.open(p) as im:
            w, h = im.size
        max_side = max(max_side, w, h)
        if max(w, h) / min(w, h) >= 4:
            strips_left.append(rel)
        if w != h:
            errors.append(f"not square: {rel} {w}x{h}")
        if w > 4096:
            errors.append(f">4096: {rel}")

        data = json.loads(p.with_suffix(".json").read_text(encoding="utf-8"))
        tex = data["textures"][0]
        if tex["size"]["w"] != w or tex["size"]["h"] != h:
            errors.append(f"json size mismatch: {rel}")

        for fr in tex["frames"]:
            r = fr["frame"]
            fn = fr["filename"]
            if r["x"] + r["w"] > w or r["y"] + r["h"] > h:
                errors.append(f"frame OOB: {rel} {fn}")

        bdata = json.loads((BACKUP / rel).with_suffix(".json").read_text(encoding="utf-8"))
        if len(bdata["textures"][0]["frames"]) != len(tex["frames"]):
            errors.append(f"frame count changed: {rel}")

    print(f"checked: {len(list(MANIFEST.read_text().splitlines())) - 1}")
    print(f"strips_left: {len(strips_left)}")
    print(f"errors: {len(errors)}")
    print(f"max_side: {max_side}")
    for e in errors[:20]:
        print(e)
    if strips_left:
        print("still strip:", strips_left[:5])

    # pixel check 26-mega-x first frame
    rel = "26-mega-x.png"
    p = ROOT / rel
    b = BACKUP / rel
    data = json.loads(p.with_suffix(".json").read_text(encoding="utf-8"))
    fr = sorted(data["textures"][0]["frames"], key=lambda x: int(x["filename"][:4]))[0]
    r = fr["frame"]
    with Image.open(p) as new, Image.open(b) as old:
        new_crop = new.crop((r["x"], r["y"], r["x"] + r["w"], r["y"] + r["h"]))
        old_crop = old.crop((0, 0, 96, 96))
        diff = sum(1 for a, bpx in zip(new_crop.getdata(), old_crop.getdata()) if a != bpx)
    print(f"26-mega-x frame0 pixel diffs: {diff}")


if __name__ == "__main__":
    main()
