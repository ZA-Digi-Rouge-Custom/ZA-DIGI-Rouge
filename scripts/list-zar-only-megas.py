# Lists mega forms present in ZARouge pokemon-species but not in digirogue.
from __future__ import annotations

import re
from pathlib import Path

SPECIES_RE = re.compile(r"new PokemonSpecies\(SpeciesId\.([A-Z0-9_]+)")
FORM_RE = re.compile(
    r'new PokemonForm\("([^"]+)".*SpeciesFormKey\.(MEGA(?:_[XY]|_Z)?|GIGANTAMAX[^,)]*)',
)


def extract_megas(path: Path) -> set[tuple[str, str]]:
    text = path.read_text(encoding="utf-8")
    megas: set[tuple[str, str]] = set()
    current: str | None = None
    for line in text.splitlines():
        sm = SPECIES_RE.search(line)
        if sm:
            current = sm.group(1)
        fm = FORM_RE.search(line)
        if fm and current and fm.group(1).startswith("Mega"):
            megas.add((current, fm.group(2)))
    return megas


def main() -> None:
    zar = Path(r"D:\pokeupdate\ZARouge-pokechan(startbat run)\src\data\balance\pokemon-species.ts")
    digi = Path(r"D:\pokeupdate\digirogue\src\data\balance\pokemon-species.ts")
    only_zar = sorted(extract_megas(zar) - extract_megas(digi))
    print(len(only_zar))
    for s, fk in only_zar:
        print(f"{s},{fk}")


if __name__ == "__main__":
    main()
