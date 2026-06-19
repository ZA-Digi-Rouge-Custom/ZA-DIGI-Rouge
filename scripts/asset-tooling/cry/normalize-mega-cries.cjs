// SPDX-FileCopyrightText: 2026 Pagefault Games
//
// SPDX-License-Identifier: AGPL-3.0-only
//
// Normalizes mega evolution cry volumes to match their base form cries.
// Usage:
//   node scripts/asset-tooling/cry/normalize-mega-cries.cjs           # dry-run
//   node scripts/asset-tooling/cry/normalize-mega-cries.cjs --apply   # apply changes

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "../../..");
const CRY_DIR = path.join(ROOT, "assets/audio/cry");
const BACKUP_DIR = path.join(CRY_DIR, "_backup");
const APPLY = process.argv.includes("--apply");

/** Skip adjustment when mega is within this many dB of the base cry. */
const MEAN_TOLERANCE_DB = 1.0;

/** Also adjust when mega mean exceeds this threshold (loud mega cries). */
const LOUD_MEAN_THRESHOLD_DB = -9.5;

/** Always adjust when base-to-mega mean delta exceeds this. */
const LARGE_DELTA_THRESHOLD_DB = 3;

function getVolume(filePath) {
  try {
    const out = execSync(`ffmpeg -hide_banner -i "${filePath}" -af volumedetect -f null - 2>&1`, {
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
    });
    const mean = out.match(/mean_volume:\s*([-\d.]+)\s*dB/);
    const max = out.match(/max_volume:\s*([-\d.]+)\s*dB/);
    return {
      mean: mean ? parseFloat(mean[1]) : null,
      max: max ? parseFloat(max[1]) : null,
    };
  } catch (error) {
    const out = `${error.stdout ?? ""}${error.stderr ?? ""}${error.message ?? ""}`;
    const mean = out.match(/mean_volume:\s*([-\d.]+)\s*dB/);
    const max = out.match(/max_volume:\s*([-\d.]+)\s*dB/);
    return {
      mean: mean ? parseFloat(mean[1]) : null,
      max: max ? parseFloat(max[1]) : null,
    };
  }
}

function loadSpeciesNames() {
  const enumText = fs.readFileSync(path.join(ROOT, "src/enums/species-id.ts"), "utf8");
  const idToName = {};
  let current = 0;
  for (const line of enumText.split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*(?:=\s*(\d+))?,?\s*$/);
    if (!match) {
      continue;
    }
    if (match[2] !== undefined) {
      current = parseInt(match[2], 10);
    } else {
      current += 1;
    }
    idToName[current] = match[1];
  }
  return idToName;
}

function shouldAdjust({ megaMean, baseMean, megaMax, deltaMean }) {
  if (megaMean == null || baseMean == null) {
    return false;
  }

  // Never amplify quieter mega cries.
  if (megaMean <= baseMean) {
    return false;
  }

  if (deltaMean >= MEAN_TOLERANCE_DB) {
    return true;
  }

  if (megaMean >= LOUD_MEAN_THRESHOLD_DB) {
    return true;
  }

  // Peak clipping with any loudness increase vs base.
  if (megaMax != null && megaMax >= 0 && deltaMean > 0) {
    return true;
  }

  return deltaMean >= LARGE_DELTA_THRESHOLD_DB;
}

function computeGainDb({ megaMean, baseMean }) {
  const gainDb = baseMean - megaMean;
  if (gainDb >= 0) {
    return null;
  }

  return gainDb;
}

function applyGain(inputPath, outputPath, gainDb) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  execSync(
    `ffmpeg -hide_banner -y -i "${inputPath}" -af "volume=${gainDb.toFixed(2)}dB" -c:a aac -b:a 100k -ar 44100 -ac 1 "${outputPath}"`,
    { stdio: "pipe" },
  );
}

function main() {
  const idToName = loadSpeciesNames();
  const megaFiles = fs
    .readdirSync(CRY_DIR)
    .filter(file => file.includes("mega") && file.endsWith(".m4a"))
    .sort();

  const planned = [];
  const skipped = [];

  for (const file of megaFiles) {
    const id = parseInt(file.match(/^(\d+)/)[1], 10);
    const megaPath = path.join(CRY_DIR, file);
    const basePath = path.join(CRY_DIR, `${id}.m4a`);
    const name = idToName[id] ?? "UNKNOWN";

    if (!fs.existsSync(basePath)) {
      skipped.push({ file, name, reason: "missing base cry" });
      continue;
    }

    const megaVol = getVolume(megaPath);
    const baseVol = getVolume(basePath);

    if (megaVol.mean == null || baseVol.mean == null) {
      skipped.push({ file, name, reason: "volume analysis failed" });
      continue;
    }

    const deltaMean = megaVol.mean - baseVol.mean;
    const entry = {
      file,
      id,
      name,
      megaMean: megaVol.mean,
      baseMean: baseVol.mean,
      megaMax: megaVol.max,
      baseMax: baseVol.max,
      deltaMean,
    };

    if (!shouldAdjust({ ...entry })) {
      skipped.push({ file, name, reason: `within tolerance (delta ${deltaMean.toFixed(1)} dB)` });
      continue;
    }

    const gainDb = computeGainDb(entry);
    if (gainDb == null) {
      skipped.push({ file, name, reason: "mega already quieter than base" });
      continue;
    }

    planned.push({ ...entry, gainDb });
  }

  console.log(`Mode: ${APPLY ? "APPLY" : "DRY-RUN"}`);
  console.log(`Mega cries scanned: ${megaFiles.length}`);
  console.log(`Planned adjustments: ${planned.length}`);
  console.log(`Skipped: ${skipped.length}`);
  console.log("");

  if (planned.length > 0) {
    console.log("FILE               SPECIES           GAIN_DB  MEGA_MEAN  BASE_MEAN  DELTA");
    for (const row of planned.sort((a, b) => a.gainDb - b.gainDb)) {
      console.log(
        `${row.file.padEnd(18)} ${row.name.padEnd(17)} ${row.gainDb.toFixed(1).padStart(6)}  ${row.megaMean.toFixed(1).padStart(6)}  ${row.baseMean.toFixed(1).padStart(6)}  ${row.deltaMean >= 0 ? "+" : ""}${row.deltaMean.toFixed(1)}`,
      );
    }
    console.log("");
  }

  if (!APPLY) {
    console.log("Run with --apply to write normalized files (originals backed up to assets/audio/cry/_backup/).");
    return;
  }

  fs.mkdirSync(BACKUP_DIR, { recursive: true });

  for (const row of planned) {
    const sourcePath = path.join(CRY_DIR, row.file);
    const backupPath = path.join(BACKUP_DIR, row.file);
    const tempPath = path.join(CRY_DIR, `${row.file}.tmp.m4a`);

    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(sourcePath, backupPath);
    }

    applyGain(sourcePath, tempPath, row.gainDb);
    fs.renameSync(tempPath, sourcePath);

    const after = getVolume(sourcePath);
    console.log(
      `Updated ${row.file}: gain ${row.gainDb.toFixed(1)} dB, mean ${row.megaMean.toFixed(1)} -> ${after.mean?.toFixed(1) ?? "?"} dB`,
    );
  }

  console.log(`\nDone. ${planned.length} files updated. Backups in assets/audio/cry/_backup/`);
}

main();
