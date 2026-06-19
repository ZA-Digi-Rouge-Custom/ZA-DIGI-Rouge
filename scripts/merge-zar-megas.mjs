/**
 * Merges ZARouge pokemon-species (vanilla + custom megas) with digirogue custom species.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const zarPath = path.resolve(root, "../ZARouge-pokechan(startbat run)/src/data/balance/pokemon-species.ts");
const aioPath = path.resolve(root, "src/data/balance/pokemon-species.ts");
const outPath = aioPath;

const zar = fs.readFileSync(zarPath, "utf8");
const aio = fs.readFileSync(aioPath, "utf8");

const digimonStart = aio.indexOf("new PokemonSpecies(SpeciesId.BOTAMON");
if (digimonStart === -1) {
  throw new Error("Could not find BOTAMON in all-in-one pokemon-species.ts");
}

const digimonEnd = aio.lastIndexOf("  );");
const digimonBlock = aio.slice(digimonStart, digimonEnd).trimEnd();

// ZAR ends with BLOODMOON_URSALUNA line then "  );"
const zarEndMarker = "new PokemonSpecies(SpeciesId.BLOODMOON_URSALUNA";
const bloodmoonIdx = zar.lastIndexOf(zarEndMarker);
if (bloodmoonIdx === -1) {
  throw new Error("Could not find BLOODMOON_URSALUNA in ZARouge pokemon-species.ts");
}

const zarCloseIdx = zar.indexOf("  );", bloodmoonIdx);
if (zarCloseIdx === -1) {
  throw new Error("Could not find closing ); in ZARouge pokemon-species.ts");
}

// Find end of BLOODMOON line (include trailing comma if any)
let bloodmoonLineEnd = zar.indexOf("\n", bloodmoonIdx);
const bloodmoonLine = zar.slice(bloodmoonIdx, bloodmoonLineEnd);
const bloodmoonWithComma = bloodmoonLine.endsWith(",") ? bloodmoonLine : `${bloodmoonLine},`;

const zarHead = zar.slice(0, bloodmoonIdx);
const merged =
  `${zarHead}${bloodmoonWithComma}\n    ${digimonBlock}\n  );\n}\n`;

fs.writeFileSync(outPath, merged, "utf8");

const zarMegas = (zar.match(/new PokemonForm\("Mega"/g) || []).length;
const mergedMegas = (merged.match(/new PokemonForm\("Mega"/g) || []).length;
const digimonCount = (digimonBlock.match(/new PokemonSpecies/g) || []).length;

console.log(`Wrote ${outPath}`);
console.log(`ZAR mega forms: ${zarMegas}, merged mega forms: ${mergedMegas}`);
console.log(`Digimon species appended: ${digimonCount}`);
