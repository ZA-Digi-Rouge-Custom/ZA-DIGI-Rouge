// Add SpeciesId.BOTAMON to the COMMON tier of every editable trainer pool.
// Mirrors the pool sources used by the in-app editor:
//  - src/data/trainers/trainer-config.ts (every `.setSpeciesPools(...)` chain)
//  - src/data/trainers/evil-admin-trainer-pools.ts (every TrainerTierPools const)
//
// Usage: `node scripts/add_botamon_to_common_pools.mjs`

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const TRAINER_CONFIG_PATH = path.join(projectRoot, 'src/data/trainers/trainer-config.ts');
const EVIL_POOLS_PATH = path.join(projectRoot, 'src/data/trainers/evil-admin-trainer-pools.ts');
const NEW_SPECIES = 'SpeciesId.BOTAMON';

function findMatchingBracketEnd(text, openIdx) {
  const open = text[openIdx];
  const close = open === '[' ? ']' : open === '{' ? '}' : open === '(' ? ')' : '';
  if (!close) return -1;
  let depth = 0;
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  for (let i = openIdx; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];
    if (lineComment) {
      if (ch === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      if (ch === '*' && next === '/') { blockComment = false; i++; }
      continue;
    }
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '/' && next === '/') { lineComment = true; i++; continue; }
    if (ch === '/' && next === '*') { blockComment = true; i++; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === open) depth++;
    else if (ch === close) { depth--; if (depth === 0) return i; }
  }
  return -1;
}

/**
 * Locate every `.setSpeciesPools(` call site (outside the implementation in
 * `TrainerConfig.setSpeciesPools(...)` definitions). Returns the index of the
 * `(` immediately following the call name.
 */
function findSetSpeciesPoolsOpenParens(text) {
  const marker = '.setSpeciesPools(';
  const results = [];
  let cursor = 0;
  while (true) {
    const idx = text.indexOf(marker, cursor);
    if (idx < 0) break;
    const openIdx = idx + marker.length - 1; // index of '('
    results.push(openIdx);
    cursor = openIdx + 1;
  }
  return results;
}

/**
 * Locate every TrainerTierPools const declaration in evil-admin-trainer-pools.ts.
 * Returns the index of the `{` that opens the object literal.
 */
function findTrainerTierPoolsOpens(text) {
  const regex = /:\s*TrainerTierPools\s*=\s*\{/g;
  const results = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    results.push(match.index + match[0].length - 1); // index of '{'
  }
  return results;
}

/**
 * Given the index of the `[` that opens a COMMON tier array literal, add
 * `SpeciesId.BOTAMON,` to the front (only when it's not already present).
 * Returns the next text and whether a change was made.
 */
function insertSpeciesIntoArray(text, openBracketIdx, species) {
  const closeIdx = findMatchingBracketEnd(text, openBracketIdx);
  if (closeIdx < 0) {
    throw new Error('Could not locate matching `]` for COMMON tier array.');
  }
  const arrayInner = text.slice(openBracketIdx + 1, closeIdx);
  // Match standalone `SpeciesId.BOTAMON` (whole word) to avoid false positives.
  if (new RegExp(`\\b${species.replace('.', '\\.')}\\b`).test(arrayInner)) {
    return { text, changed: false };
  }

  // Inspect content right after `[` to decide formatting (single-line vs
  // multi-line literal). Multi-line literals lead with whitespace + newline.
  const innerTrimmed = arrayInner.trim();
  let insertion;
  if (!innerTrimmed) {
    insertion = `${species}`;
  } else if (/^\s*\n/.test(arrayInner)) {
    // Multi-line: derive indent of the first existing entry.
    const firstEntryMatch = arrayInner.match(/^\s*\n([ \t]+)/);
    const indent = firstEntryMatch ? firstEntryMatch[1] : '        ';
    insertion = `\n${indent}${species},`;
  } else {
    // Single-line: place at the front separated by comma + space.
    insertion = `${species}, `;
  }

  const before = text.slice(0, openBracketIdx + 1);
  const after = text.slice(openBracketIdx + 1);
  return { text: `${before}${insertion}${after}`, changed: true };
}

/**
 * Locate the `[` of the `[TrainerPoolTier.COMMON]: [...]` entry inside an
 * object literal whose opening `{` is at `objectOpenIdx`. Returns -1 if the
 * tier is missing.
 */
function findCommonTierArrayOpen(text, objectOpenIdx) {
  const objectCloseIdx = findMatchingBracketEnd(text, objectOpenIdx);
  if (objectCloseIdx < 0) return -1;
  const body = text.slice(objectOpenIdx, objectCloseIdx + 1);
  const tierMatch = body.match(/\[\s*TrainerPoolTier\.COMMON\s*\]\s*:\s*\[/);
  if (!tierMatch) return -1;
  // arrayOpenIdx relative to body, then offset to absolute index.
  const arrayOpenInBody = tierMatch.index + tierMatch[0].length - 1;
  return objectOpenIdx + arrayOpenInBody;
}

/**
 * Handle one `.setSpeciesPools(...)` call: insert BOTAMON into the COMMON
 * tier (object literal) or directly into the array literal. Returns the
 * updated text plus the trainer-pool-call signature for logging.
 */
function injectIntoSetSpeciesPoolsCall(text, openParensIdx) {
  const closeParensIdx = findMatchingBracketEnd(text, openParensIdx);
  if (closeParensIdx < 0) return { text, changed: false, kind: 'unknown' };

  // Walk past whitespace to find the first non-space char inside `(...)`.
  let inner = openParensIdx + 1;
  while (inner < closeParensIdx && /\s/.test(text[inner])) inner++;
  const firstChar = text[inner];

  if (firstChar === '{') {
    const commonArrayOpen = findCommonTierArrayOpen(text, inner);
    if (commonArrayOpen < 0) {
      return { text, changed: false, kind: 'object-missing-common' };
    }
    const result = insertSpeciesIntoArray(text, commonArrayOpen, NEW_SPECIES);
    return { ...result, kind: 'object' };
  }

  if (firstChar === '[') {
    const result = insertSpeciesIntoArray(text, inner, NEW_SPECIES);
    return { ...result, kind: 'array' };
  }

  // E.g. method definition: `setSpeciesPools(speciesPools)` – skip.
  return { text, changed: false, kind: 'non-literal' };
}

/**
 * Process the chained config map in trainer-config.ts. We iterate from the
 * tail of the file backwards so that earlier indices remain valid as we
 * insert text.
 */
async function processTrainerConfig() {
  const original = await fs.readFile(TRAINER_CONFIG_PATH, 'utf8');
  let text = original;
  const openParens = findSetSpeciesPoolsOpenParens(text).sort((a, b) => b - a);
  const stats = { object: 0, array: 0, skipped: 0, missing: 0, methodDef: 0 };

  for (const openIdx of openParens) {
    const { text: nextText, changed, kind } = injectIntoSetSpeciesPoolsCall(text, openIdx);
    if (changed) {
      text = nextText;
      if (kind === 'object') stats.object++;
      else if (kind === 'array') stats.array++;
    } else {
      if (kind === 'object-missing-common') stats.missing++;
      else if (kind === 'non-literal') stats.methodDef++;
      else stats.skipped++;
    }
  }

  if (text === original) {
    console.log(`[trainer-config.ts] no changes (${JSON.stringify(stats)})`);
    return;
  }

  await fs.writeFile(TRAINER_CONFIG_PATH, text, 'utf8');
  console.log(`[trainer-config.ts] updated ${stats.object + stats.array} pool(s) -> ${JSON.stringify(stats)}`);
}

async function processEvilAdminPools() {
  const original = await fs.readFile(EVIL_POOLS_PATH, 'utf8');
  let text = original;
  const objectOpens = findTrainerTierPoolsOpens(text).sort((a, b) => b - a);
  let updated = 0;
  let skipped = 0;

  for (const objectOpen of objectOpens) {
    const commonArrayOpen = findCommonTierArrayOpen(text, objectOpen);
    if (commonArrayOpen < 0) {
      skipped++;
      continue;
    }
    const result = insertSpeciesIntoArray(text, commonArrayOpen, NEW_SPECIES);
    if (result.changed) {
      text = result.text;
      updated++;
    } else {
      skipped++;
    }
  }

  if (text === original) {
    console.log(`[evil-admin-trainer-pools.ts] no changes (${objectOpens.length} pools, ${skipped} skipped)`);
    return;
  }

  await fs.writeFile(EVIL_POOLS_PATH, text, 'utf8');
  console.log(`[evil-admin-trainer-pools.ts] updated ${updated} pool(s); skipped ${skipped}`);
}

async function main() {
  await processTrainerConfig();
  await processEvilAdminPools();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
