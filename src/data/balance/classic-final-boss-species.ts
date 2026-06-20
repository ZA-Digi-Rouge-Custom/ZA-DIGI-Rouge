import { allBiomes } from "#data/data-lists";
import { SpeciesFormChangeManualTrigger } from "#data/form-change-triggers";
import type { PokemonSpecies } from "#data/pokemon-species";
import { SpeciesFormChange } from "#data/pokemon-forms";
import { BiomeId } from "#enums/biome-id";
import { BiomePoolTier } from "#enums/biome-pool-tier";
import { SpeciesId } from "#enums/species-id";
import { TimeOfDay } from "#enums/time-of-day";
import type { Mutable } from "#types/type-helpers";
import { randSeedItem } from "#utils/common";
import { getPokemonSpecies } from "#utils/pokemon-utils";

/** Classic / Challenge wave-200 final boss and END biome boss pool. */
const CLASSIC_FINAL_BOSS_SPECIES_IDS: readonly SpeciesId[] = [
  SpeciesId.ETERNATUS,
  SpeciesId.MEWTWO,
  SpeciesId.RAYQUAZA,
  SpeciesId.GROUDON,
  SpeciesId.KYOGRE,
  SpeciesId.NECROZMA,
  SpeciesId.KYUREM,
  SpeciesId.ZACIAN,
  SpeciesId.ZAMAZENTA,
  SpeciesId.DARKRAI,
  SpeciesId.DIANCIE,
  SpeciesId.DRAGONITE,
  SpeciesId.GARCHOMP,
  SpeciesId.HEATRAN,
  SpeciesId.MAGEARNA,
  SpeciesId.MELMETAL,
  SpeciesId.METAGROSS,
  SpeciesId.SALAMENCE,
  SpeciesId.TYRANITAR,
  SpeciesId.ZERAORA,
];

export function isClassicFinalBossCandidate(species: PokemonSpecies): boolean {
  return CLASSIC_FINAL_BOSS_SPECIES_IDS.includes(species.speciesId);
}

let cachedCandidates: readonly PokemonSpecies[] | null = null;

export function getClassicFinalBossCandidates(): readonly PokemonSpecies[] {
  if (cachedCandidates === null) {
    cachedCandidates = CLASSIC_FINAL_BOSS_SPECIES_IDS.map(getPokemonSpecies);
  }
  return cachedCandidates;
}

export function getClassicFinalBossSpeciesIds(): SpeciesId[] {
  return [...CLASSIC_FINAL_BOSS_SPECIES_IDS];
}

/** Pick phase-2 form index after wave-200 segment break (phase 1 uses form 0). */
export function pickClassicFinalBossPhase2FormIndex(species: PokemonSpecies): number {
  const nonNormalIndices = species.forms.map((f, i) => i).filter(i => species.forms[i].formKey !== "");

  if (nonNormalIndices.length === 0) {
    return Math.min(1, species.forms.length - 1);
  }

  if (species.forms.length >= 3) {
    return randSeedItem(nonNormalIndices);
  }

  const phase2Candidates = nonNormalIndices.filter(i => i !== 0);
  if (phase2Candidates.length > 0) {
    return randSeedItem(phase2Candidates);
  }

  return nonNormalIndices[0]!;
}

export function createClassicFinalBossPhase2FormChange(
  species: PokemonSpecies,
  currentFormIndex: number,
  targetFormIndex: number,
): SpeciesFormChange {
  const preFormKey = species.forms[currentFormIndex]?.formKey ?? "";
  const targetFormKey = species.forms[targetFormIndex]!.formKey;
  return new SpeciesFormChange(
    species.speciesId,
    preFormKey,
    targetFormKey,
    new SpeciesFormChangeManualTrigger(),
    true,
  );
}

/** Rebuild END biome BOSS tier from eligible species (called after {@linkcode initSpecies}). */
export function patchEndBiomeBossPool(): void {
  const endBiome = allBiomes.get(BiomeId.END);
  if (!endBiome) {
    return;
  }

  const bossIds = getClassicFinalBossSpeciesIds();
  const bossPool = endBiome.pokemonPool[BiomePoolTier.BOSS] as Mutable<Record<TimeOfDay, SpeciesId[]>>;
  bossPool[TimeOfDay.ALL] = bossIds;
  bossPool[TimeOfDay.DAWN] = [];
  bossPool[TimeOfDay.DAY] = [];
  bossPool[TimeOfDay.DUSK] = [];
  bossPool[TimeOfDay.NIGHT] = [];
}
