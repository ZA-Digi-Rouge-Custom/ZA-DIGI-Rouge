/**
 * Merges ZARouge custom mega form-change entries and form-change-item enums.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const zarRoot = path.resolve(root, "../ZARouge-pokechan(startbat run)");

function extractFormBlocks(source, speciesIds) {
  const blocks = [];
  for (const id of speciesIds) {
    const marker = `[SpeciesId.${id}]:`;
    const start = source.indexOf(marker);
    if (start === -1) {
      console.warn(`Missing block: ${id}`);
      continue;
    }
    let depth = 0;
    let i = start;
    let started = false;
    while (i < source.length) {
      if (source[i] === "[") {
        depth++;
        started = true;
      }
      if (source[i] === "]" && started) {
        depth--;
        if (depth === 0) {
          let end = i + 1;
          while (end < source.length && source[end] !== "\n") {
            end++;
          }
          blocks.push(source.slice(start, end + 1).trimEnd());
          break;
        }
      }
      i++;
    }
  }
  return blocks;
}

// ZAR-only species from prior analysis + extras with new megas
const zarOnlySpecies = [
  "BARBARACLE",
  "BAXCALIBUR",
  "CHANDELURE",
  "CHESNAUGHT",
  "CHIMECHO",
  "CLEFABLE",
  "CRABOMINABLE",
  "DARKRAI",
  "DELPHOX",
  "DRAGALGE",
  "DRAGONITE",
  "DRAMPA",
  "EELEKTROSS",
  "EMBOAR",
  "ETERNAL_FLOETTE",
  "EXCADRILL",
  "FALINKS",
  "FERALIGATR",
  "FROSLASS",
  "GLIMMORA",
  "GOLISOPOD",
  "GOLURK",
  "HAWLUCHA",
  "HEATRAN",
  "MAGEARNA",
  "MALAMAR",
  "MEGANIUM",
  "MEOWSTIC",
  "PYROAR",
  "RAICHU",
  "SCOLIPEDE",
  "SCOVILLAIN",
  "SCRAFTY",
  "SKARMORY",
  "STARAPTOR",
  "STARMIE",
  "TATSUGIRI",
  "VICTREEBEL",
  "ZERAORA",
];

const zarFormsPath = path.join(zarRoot, "src/data/pokemon-forms.ts");
const aioFormsPath = path.join(root, "src/data/pokemon-forms.ts");
const zarForms = fs.readFileSync(zarFormsPath, "utf8");
let aioForms = fs.readFileSync(aioFormsPath, "utf8");

const blocks = extractFormBlocks(zarForms, zarOnlySpecies);
const insertText = `\n  // --- ZARouge custom mega form changes ---\n${blocks.map(b => `  ${b}`).join(",\n")},\n`;

// Update ABSOL with MEGA_Z if missing
if (!aioForms.includes("SpeciesFormKey.MEGA_Z") || !aioForms.includes("ABSOLITE_Z")) {
  aioForms = aioForms.replace(
    /\[SpeciesId\.ABSOL\]: \[[\s\S]*?\],/,
    `  [SpeciesId.ABSOL]: [
    new SpeciesFormChange(SpeciesId.ABSOL, "", SpeciesFormKey.MEGA, new SpeciesFormChangeManualTrigger()),
    new SpeciesFormChange(SpeciesId.ABSOL, "", SpeciesFormKey.MEGA, new SpeciesFormChangeItemTrigger(FormChangeItem.ABSOLITE)),
    new SpeciesFormChange(SpeciesId.ABSOL, "", SpeciesFormKey.MEGA_Z, new SpeciesFormChangeItemTrigger(FormChangeItem.ABSOLITE_Z)),
  ],`,
  );
}

if (!aioForms.includes("ZARouge custom mega form changes")) {
  aioForms = aioForms.replace(/\n};\n\nexport function initPokemonForms/, `${insertText}\n};\n\nexport function initPokemonForms`);
  fs.writeFileSync(aioFormsPath, aioForms, "utf8");
  console.log(`Inserted ${blocks.length} form-change blocks into pokemon-forms.ts`);
} else {
  console.log("pokemon-forms.ts already has ZARouge blocks");
}

// form-change-item enum
const zarItemPath = path.join(zarRoot, "src/enums/form-change-item.ts");
const aioItemPath = path.join(root, "src/enums/form-change-item.ts");
const zarItem = fs.readFileSync(zarItemPath, "utf8");
let aioItem = fs.readFileSync(aioItemPath, "utf8");

if (!aioItem.includes("MEGANIUMITE")) {
  const customItems = zarItem
    .slice(zarItem.indexOf("ABSOLITE_Z"), zarItem.lastIndexOf("}"))
    .trim();
  aioItem = aioItem.replace(
    "  NORMAL_MEMORY,\n}",
    `  NORMAL_MEMORY,\n\n  ${customItems}\n}`,
  );
  fs.writeFileSync(aioItemPath, aioItem, "utf8");
  console.log("Added custom FormChangeItem enums");
}

// pokemon-evolutions megaFormKeys
const evoPath = path.join(root, "src/data/balance/pokemon-evolutions.ts");
let evo = fs.readFileSync(evoPath, "utf8");
if (!evo.includes("SpeciesFormKey.MEGA_Z")) {
  evo = evo.replace(
    "const megaFormKeys = [SpeciesFormKey.MEGA, \"\", SpeciesFormKey.MEGA_X, \"\", SpeciesFormKey.MEGA_Y];",
    "const megaFormKeys = [SpeciesFormKey.MEGA, \"\", SpeciesFormKey.MEGA_X, \"\", SpeciesFormKey.MEGA_Y, SpeciesFormKey.MEGA_Z];",
  );
  fs.writeFileSync(evoPath, evo, "utf8");
  console.log("Updated megaFormKeys in pokemon-evolutions.ts");
}
