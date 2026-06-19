import { TerrainType } from "#data/terrain";
import { BiomeId } from "#enums/biome-id";
import { BiomePoolTier } from "#enums/biome-pool-tier";
import { SpeciesId } from "#enums/species-id";
import { TimeOfDay } from "#enums/time-of-day";
import { TrainerType } from "#enums/trainer-type";
import { WeatherType } from "#enums/weather-type";
import type { Biome, BiomeLinks, BiomePokemonPools, TerrainPool, TrainerPools, WeatherPool } from "#types/biomes";

const pokemonPool: BiomePokemonPools = {
  [BiomePoolTier.COMMON]: {
    [TimeOfDay.ALL]: [SpeciesId.DIGLETT, SpeciesId.MACHOP, SpeciesId.GRIMER, SpeciesId.PHANPY, SpeciesId.MAKUHITA, SpeciesId.NOSEPASS, SpeciesId.TIMBURR, SpeciesId.BOTAMON],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.UNCOMMON]: {
    [TimeOfDay.ALL]: [SpeciesId.MAGNEMITE, SpeciesId.KOFFING, SpeciesId.RHYHORN, SpeciesId.DRILBUR, SpeciesId.SCRAGGY, SpeciesId.ALOLA_GEODUDE],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.ONIX, SpeciesId.TYROGUE, SpeciesId.GALAR_MEOWTH],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.DITTO, SpeciesId.DURALUDON],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.ULTRA_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.COBALION, SpeciesId.STAKATAKA],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS]: {
    [TimeOfDay.ALL]: [SpeciesId.MACHAMP, SpeciesId.MAGNEZONE, SpeciesId.PROBOPASS, SpeciesId.CONKELDURR, SpeciesId.ALOLA_GOLEM],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.PERRSERKER, SpeciesId.ARCHALUDON],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS_SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.COBALION, SpeciesId.STAKATAKA],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS_ULTRA_RARE]: {
    [TimeOfDay.ALL]: [],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
};

const trainerPool: TrainerPools = {
  [BiomePoolTier.COMMON]: [TrainerType.OFFICER, TrainerType.WORKER],
  [BiomePoolTier.UNCOMMON]: [],
  [BiomePoolTier.RARE]: [],
  [BiomePoolTier.SUPER_RARE]: [],
  [BiomePoolTier.ULTRA_RARE]: [],
  [BiomePoolTier.BOSS]: [TrainerType.LT_SURGE, TrainerType.CHUCK, TrainerType.WATTSON],
  [BiomePoolTier.BOSS_RARE]: [],
  [BiomePoolTier.BOSS_SUPER_RARE]: [],
  [BiomePoolTier.BOSS_ULTRA_RARE]: [],
};

const weatherPool: WeatherPool = {
  [WeatherType.NONE]: 1,
};

const terrainPool: TerrainPool = {
  [TerrainType.NONE]: 1,
};

const biomeLinks: BiomeLinks = [BiomeId.POWER_PLANT, [BiomeId.DOJO, 2]];

export const constructionSiteBiome: Biome = {
  biomeId: BiomeId.CONSTRUCTION_SITE,
  pokemonPool,
  trainerPool,
  trainerChance: 6,
  weatherPool,
  terrainPool,
  biomeLinks,
};
