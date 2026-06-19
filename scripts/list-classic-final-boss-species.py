"""List species IDs eligible for classic final boss / END boss pool."""
import re
from pathlib import Path

def main():
    content = Path("src/data/balance/classic-final-boss-species.ts").read_text(encoding="utf-8")
    match = re.search(
        r"CLASSIC_FINAL_BOSS_SPECIES_IDS: readonly SpeciesId\[\] = \[(.*?)\];",
        content,
        re.DOTALL,
    )
    if not match:
        raise SystemExit("Could not find CLASSIC_FINAL_BOSS_SPECIES_IDS in classic-final-boss-species.ts")
    ids = re.findall(r"SpeciesId\.(\w+)", match.group(1))
    print(f"Count: {len(ids)}")
    print(", ".join(ids))

if __name__ == "__main__":
    main()
