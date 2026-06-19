// One-off utility: scrape Pokémon Infinity wiki (Miraheze) for Digimon
// movesets and write `digimon_moves.txt` at the workspace root.
//
// Usage: node scripts/fetch_digimon_moves.mjs
//
// Data source: https://pokemoninfinity.miraheze.org via MediaWiki API
// Korean move names: ./locales/ko/move.json (camelCase keys)

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");
const OUT_TXT = path.join(ROOT, "digimon_moves.txt");
const KO_MOVE_JSON = path.join(ROOT, "locales", "ko", "move.json");
const API = "https://pokemoninfinity.miraheze.org/w/api.php";
const UA = "DigimonMoveExtractor/1.0 (one-off local script)";
const REQUEST_GAP_MS = 300;

// Digimon/Pokemon Infinity original moves not present in locales/ko/move.json.
// Korean names sourced from namu.wiki:
//   https://namu.wiki/w/포켓몬스터 인피니티/고유 기술
// For four moves the namu.wiki page lists only the English name in the header;
// in those cases the Korean name used here is the one quoted in the body text
// as the original Digimon series' Korean translation.
const DIGIMON_KR_MOVES = {
  "Air Slam": "헤일로어택",
  "Ambush": "급습",
  "Anvil Smash": "앤빌스매시",
  "Beam Shield": "빔실드",
  "Blue Blaster": "쁘띠파이어",
  "Bone Sweep": "뼈다귀휩쓸기",
  "Boom Bubble": "공기팡",
  "Bug Blaster": "크레이지기글",
  "Bullet Hammer": "피노키 해머",
  "Cable Crusher": "케이블크러셔",
  "Cactus Smash": "스파이크해머",
  "Cherry Blast": "체리의 유혹",
  "Compost Bomber": "짬뽕탄",
  "Concert Crush": "공포의음악회",
  "Dark Network": "어둠의케이블",
  "Dark Shot": "그라운드제로",
  "Death Nail": "데스네일",
  "Devil's Deed": "헬컨트랙트",
  "Dino Kick": "다이노킥",
  "Draco Blitz": "드라코드라이브",
  "Dry Needles": "따끔미사일",
  "Duo Scissor Claw": "왕가위손",
  "Evil Wing": "레더윙",
  "Excalibur": "엑스칼리버",
  "Faeng Rush": "페어리팽",
  "Fin Cutter": "커터핀",
  "Flash Flood": "살여울",
  "Garuru-Kick": "가루루킥",
  "Giga Destroyer": "인공지능미사일",
  "Heaven's Knuckle": "천사의손",
  "Horn Buster": "뿔치기",
  "Hyper-Stink-Shot": "초악취분사",
  "Ice Blast": "얼음화살",
  "Ice Slash": "아이스커터",
  "Ice Wolf Claw": "아이스울프클로",
  "Infinity Arrow": "인피니티애로",
  "Lion Sword": "야수검",
  "Mugen Cannon": "파워포",
  "Nail Crusher": "심판의발톱",
  "Necro Magic": "죽음의마법",
  "Nova Blast": "메가파이어",
  "Nuclear Punch": "메가펀치",
  "Omni Blast": "오메가블래스트",
  "Omni Howl": "오메가하울링",
  "Page Fault": "페이지폴트",
  "Pepper Breath": "꼬마불꽃",
  "Poison Bubbles": "독성거품",
  "Searing Slash": "버닝블레이드",
  "Soul Chopper": "영혼가르기",
  "Supreme Cannon": "가루루캐논",
  "Terra Force": "테라광선",
  "Thunder Slash": "볼트블레이드",
  "Transcendent Sword": "그레이소드",
  "Trump Sword": "트럼프 검",
  "Virus Skater": "바이러스스케이터",
  "Vulcan's Hammer": "쇠망치공격",
  "Web Wrecker": "캐논발사",
  "Yucky Tongue": "기분나쁜혀",
};

async function callApi(params) {
  const url = new URL(API);
  for (const [k, v] of Object.entries({ ...params, format: "json" })) {
    url.searchParams.set(k, String(v));
  }
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText} for ${url.toString()}`);
  }
  const json = await res.json();
  if (json.error) {
    throw new Error(`API error: ${json.error.code} ${json.error.info}`);
  }
  return json;
}

// "Pepper Breath" -> "pepperBreath", "X-Scissor" -> "xScissor",
// "Will-O-Wisp" -> "willOWisp", "King's Shield" -> "kingsShield",
// "Forest's Curse" -> "forestsCurse" (apostrophes do NOT cause a word break).
function toCamelKey(name) {
  // Apostrophes (straight + curly) are stripped without inserting a word
  // boundary, matching the locale key convention (e.g. kingsShield).
  const cleaned = name.replace(/['\u2019]/g, "");
  const parts = cleaned.split(/[^a-zA-Z0-9]+/).filter(Boolean);
  if (parts.length === 0) return cleaned.toLowerCase();
  return parts
    .map((p, i) => {
      const lower = p.toLowerCase();
      return i === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
}

function parseInfoboxField(wikitext, field) {
  const re = new RegExp(`\\|\\s*${field}\\s*=\\s*([^\\n|]*)`);
  const m = wikitext.match(re);
  return m ? m[1].trim() : "";
}

function parseMoves(wikitext) {
  const levelMoves = [];
  const tutorMoves = [];

  const lines = wikitext.split(/\r?\n/);
  let section = null;
  for (const raw of lines) {
    const line = raw.trim();
    const heading = line.match(/^={2,}\s*(.+?)\s*={2,}$/);
    if (heading) {
      const title = heading[1].toLowerCase();
      if (title === "by leveling up") section = "level";
      else if (title === "by tutoring") section = "tutor";
      else section = "other";
      continue;
    }
    if (section === "level") {
      // {{MoveLevel+|<level>|<name>|<optional stab markers>}}
      const m = line.match(/\{\{MoveLevel\+\|([^|}]+)\|([^|}]+)(?:\|[^}]*)?\}\}/);
      if (m) {
        levelMoves.push({ level: m[1].trim(), name: m[2].trim() });
      }
    } else if (section === "tutor") {
      // {{MoveTutor+|<name>|<optional stab markers>}}
      const m = line.match(/\{\{MoveTutor\+\|([^|}]+)(?:\|[^}]*)?\}\}/);
      if (m) {
        tutorMoves.push(m[1].trim());
      }
    }
  }
  return { levelMoves, tutorMoves };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getDigimonList() {
  // Single category page < 500 members, no continuation needed.
  const resp = await callApi({
    action: "query",
    list: "categorymembers",
    cmtitle: "Category:Digimon",
    cmlimit: 500,
    cmtype: "page",
  });
  return resp.query.categorymembers.map((m) => m.title).sort();
}

async function getWikitext(title) {
  const resp = await callApi({ action: "parse", page: title, prop: "wikitext" });
  return resp.parse?.wikitext?.["*"] ?? "";
}

function renderReport(results, koMoves) {
  const lines = [];
  lines.push("Pokemon Infinity - Digimon Movesets");
  lines.push("Source: https://pokemoninfinity.miraheze.org (Category:Digimon)");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Total Digimon: ${results.length}`);
  lines.push("");
  lines.push("- Level 0 = move learned upon evolution.");
  lines.push("- Korean name (in parentheses) is taken from locales/ko/move.json when a matching key exists,");
  lines.push("  with Digimon-original moves filled in from namu.wiki (포켓몬스터 인피니티/고유 기술).");
  lines.push("- Any remaining un-translated English-only entry has no Korean name in either source.");
  lines.push("=".repeat(78));
  lines.push("");

  const fmtMove = (english) => {
    const key = toCamelKey(english);
    const entry = koMoves[key];
    const koFromLocale = entry && typeof entry === "object" ? entry.name : undefined;
    const ko = koFromLocale ?? DIGIMON_KR_MOVES[english];
    return ko ? `${english} (${ko})` : english;
  };

  for (const r of results) {
    const typePart = r.type2 ? `${r.type1}/${r.type2}` : r.type1 || "?";
    const speciesPart = r.species ? `, ${r.species}` : "";
    lines.push(`===== ${r.title} (${typePart}${speciesPart}) =====`);

    if (r.error) {
      lines.push(`  [ERROR] ${r.error}`);
      lines.push("");
      continue;
    }

    lines.push("[Level-up Moves]");
    if (r.levelMoves.length === 0) {
      lines.push("  (none)");
    } else {
      const byLevel = new Map();
      for (const m of r.levelMoves) {
        if (!byLevel.has(m.level)) byLevel.set(m.level, []);
        byLevel.get(m.level).push(m.name);
      }
      const keys = [...byLevel.keys()].sort((a, b) => {
        const na = Number(a);
        const nb = Number(b);
        if (Number.isNaN(na) && Number.isNaN(nb)) return a.localeCompare(b);
        if (Number.isNaN(na)) return -1;
        if (Number.isNaN(nb)) return 1;
        return na - nb;
      });
      for (const k of keys) {
        const label = k === "0" ? "Lv. 0 (on evolution)" : `Lv. ${k}`;
        const formatted = byLevel.get(k).map(fmtMove).join(", ");
        lines.push(`  ${label}: ${formatted}`);
      }
    }

    lines.push("");
    lines.push("[TEACH (Tutor) Moves]");
    if (r.tutorMoves.length === 0) {
      lines.push("  (none)");
    } else {
      const seen = new Set();
      const list = [];
      for (const m of r.tutorMoves) {
        if (!seen.has(m)) {
          seen.add(m);
          list.push(m);
        }
      }
      for (const m of list) lines.push(`  - ${fmtMove(m)}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

async function main() {
  const koMoves = JSON.parse(await fs.readFile(KO_MOVE_JSON, "utf8"));

  console.log("Fetching Digimon list from Category:Digimon ...");
  const titles = await getDigimonList();
  console.log(`Found ${titles.length} Digimon.`);

  const results = [];
  for (let i = 0; i < titles.length; i++) {
    const title = titles[i];
    process.stdout.write(`  [${i + 1}/${titles.length}] ${title} ... `);
    try {
      const wikitext = await getWikitext(title);
      const { levelMoves, tutorMoves } = parseMoves(wikitext);
      const type1 = parseInfoboxField(wikitext, "type1");
      const type2 = parseInfoboxField(wikitext, "type2");
      const species = parseInfoboxField(wikitext, "species");
      results.push({ title, type1, type2, species, levelMoves, tutorMoves });
      console.log(`ok (level=${levelMoves.length}, tutor=${tutorMoves.length})`);
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      results.push({ title, error: String(err.message || err) });
    }
    await sleep(REQUEST_GAP_MS);
  }

  const report = renderReport(results, koMoves);
  await fs.writeFile(OUT_TXT, report, "utf8");
  console.log(`\nWrote ${OUT_TXT}`);

  const missing = new Set();
  for (const r of results) {
    if (r.error) continue;
    const collect = (name) => {
      const key = toCamelKey(name);
      const entry = koMoves[key];
      const hasLocale = entry && typeof entry === "object" && entry.name;
      const hasDigimon = Boolean(DIGIMON_KR_MOVES[name]);
      if (!hasLocale && !hasDigimon) missing.add(name);
    };
    for (const m of r.levelMoves) collect(m.name);
    for (const m of r.tutorMoves) collect(m);
  }
  if (missing.size > 0) {
    console.log(`\n${missing.size} move name(s) had no Korean translation in locales/ko/move.json:`);
    console.log("  " + [...missing].sort().join(", "));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
