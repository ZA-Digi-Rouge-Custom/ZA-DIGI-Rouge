# SPDX-License-Identifier: AGPL-3.0-only
"""Merge ZARouge passives and egg-moves into all-in-one, preserving digimon-only entries."""

from __future__ import annotations

import re
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
ZAR = Path(r"D:\pokeupdate\ZARouge-pokechan(startbat run)")

ENTRY_RE = re.compile(
    r"^(\s*)\[SpeciesId\.([A-Z0-9_]+)\]:(.*,\s*)$",
    re.MULTILINE,
)


def parse_entries(text: str) -> dict[str, tuple[str, str, str]]:
    """species -> (indent, name, rest including trailing comma line content)."""
    out: dict[str, tuple[str, str, str]] = {}
    for m in ENTRY_RE.finditer(text):
        out[m.group(2)] = (m.group(1), m.group(2), m.group(3))
    return out


def digimon_only(aio_names: set[str], zar_names: set[str]) -> set[str]:
    return aio_names - zar_names


def merge_file(
    aio_path: Path,
    zar_path: Path,
    *,
    object_name: str,
) -> tuple[str, int]:
    aio_text = aio_path.read_text(encoding="utf-8")
    zar_text = zar_path.read_text(encoding="utf-8")

    aio_entries = parse_entries(aio_text)
    zar_entries = parse_entries(zar_text)
    digi = digimon_only(set(aio_entries), set(zar_entries))

    replaced = 0
    lines: list[str] = []
    for line in aio_text.splitlines():
        m = ENTRY_RE.match(line)
        if not m:
            lines.append(line)
            continue
        name = m.group(2)
        if name in digi:
            lines.append(line)
            continue
        if name in zar_entries and name in aio_entries:
            z_indent, _, z_rest = zar_entries[name]
            if parse_line_body(line) != parse_line_body(zar_line(name, zar_entries)):
                replaced += 1
                lines.append(f"{z_indent}[SpeciesId.{name}]:{z_rest}")
                continue
        lines.append(line)

    return "\n".join(lines) + ("\n" if aio_text.endswith("\n") else ""), replaced


def parse_line_body(line: str) -> str:
    m = ENTRY_RE.match(line)
    return m.group(3).strip() if m else line


def zar_line(name: str, zar_entries: dict) -> str:
    indent, _, rest = zar_entries[name]
    return f"{indent}[SpeciesId.{name}]:{rest}"


def main() -> None:
    targets = [
        (
            REPO / "src/data/balance/passives.ts",
            ZAR / "src/data/balance/passives.ts",
            "starterPassiveAbilities",
        ),
        (
            REPO / "src/data/balance/moves/egg-moves.ts",
            ZAR / "src/data/balance/egg-moves.ts",
            "speciesEggMoves",
        ),
    ]
    for aio_path, zar_path, obj in targets:
        merged, n = merge_file(aio_path, zar_path, object_name=obj)
        aio_path.write_text(merged, encoding="utf-8", newline="\n")
        print(f"{aio_path.name}: replaced {n} entries ({obj})")


if __name__ == "__main__":
    main()
