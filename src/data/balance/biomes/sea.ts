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
    [TimeOfDay.ALL]: [SpeciesId.TENTACOOL, SpeciesId.WAILMER, SpeciesId.BOTAMON],
    [TimeOfDay.DAWN]: [SpeciesId.SLOWPOKE, SpeciesId.WINGULL, SpeciesId.CRAMORANT, SpeciesId.FINIZEN],
    [TimeOfDay.DAY]: [SpeciesId.SLOWPOKE, SpeciesId.WINGULL, SpeciesId.CRAMORANT, SpeciesId.FINIZEN],
    [TimeOfDay.DUSK]: [SpeciesId.FINNEON, SpeciesId.INKAY],
    [TimeOfDay.NIGHT]: [SpeciesId.FINNEON, SpeciesId.INKAY],
  },
  [BiomePoolTier.UNCOMMON]: {
    [TimeOfDay.ALL]: [SpeciesId.POLIWAG, SpeciesId.HORSEA, SpeciesId.GOLDEEN, SpeciesId.MAGIKARP, SpeciesId.BUIZEL, SpeciesId.PANPOUR, SpeciesId.WATTREL],
    [TimeOfDay.DAWN]: [SpeciesId.STARYU],
    [TimeOfDay.DAY]: [SpeciesId.STARYU],
    [TimeOfDay.DUSK]: [SpeciesId.SLOWPOKE, SpeciesId.SHELLDER, SpeciesId.CARVANHA],
    [TimeOfDay.NIGHT]: [SpeciesId.SLOWPOKE, SpeciesId.SHELLDER, SpeciesId.CHINCHOU, SpeciesId.CARVANHA],
  },
  [BiomePoolTier.RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.LAPRAS, SpeciesId.PIPLUP, SpeciesId.POPPLIO],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.KINGDRA, SpeciesId.TIRTOUGA],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.ULTRA_RARE]: {
    [TimeOfDay.ALL]: [],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS]: {
    [TimeOfDay.ALL]: [SpeciesId.TENTACRUEL, SpeciesId.FLOATZEL, SpeciesId.SIMIPOUR, SpeciesId.KILOWATTREL],
    [TimeOfDay.DAWN]: [SpeciesId.PELIPPER, SpeciesId.CRAMORANT, SpeciesId.PALAFIN],
    [TimeOfDay.DAY]: [SpeciesId.PELIPPER, SpeciesId.CRAMORANT, SpeciesId.PALAFIN],
    [TimeOfDay.DUSK]: [SpeciesId.SHARPEDO, SpeciesId.MALAMAR],
    [TimeOfDay.NIGHT]: [SpeciesId.SHARPEDO, SpeciesId.LUMINEON, SpeciesId.MALAMAR],
  },
  [BiomePoolTier.BOSS_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.GYARADOS, SpeciesId.KINGDRA, SpeciesId.EMPOLEON, SpeciesId.PRIMARINA],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS_SUPER_RARE]: {
    [TimeOfDay.ALL]: [],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS_ULTRA_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.LUGIA],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
};

const trainerPool: TrainerPools = {
  [BiomePoolTier.COMMON]: [TrainerType.SAILOR, TrainerType.SWIMMER],
  [BiomePoolTier.UNCOMMON]: [TrainerType.SCUBA_DIVER],
  [BiomePoolTier.RARE]: [],
  [BiomePoolTier.SUPER_RARE]: [],
  [BiomePoolTier.ULTRA_RARE]: [],
  [BiomePoolTier.BOSS]: [TrainerType.MARLON],
  [BiomePoolTier.BOSS_RARE]: [],
  [BiomePoolTier.BOSS_SUPER_RARE]: [],
  [BiomePoolTier.BOSS_ULTRA_RARE]: [],
};

const weatherPool: WeatherPool = {
  [WeatherType.NONE]: 3,
  [WeatherType.RAIN]: 12,
};

const terrainPool: TerrainPool = {
  [TerrainType.NONE]: 1,
};

const biomeLinks: BiomeLinks = [BiomeId.SEABED, BiomeId.ICE_CAVE];

export const seaBiome: Biome = {
  biomeId: BiomeId.SEA,
  pokemonPool,
  trainerPool,
  trainerChance: 12,
  weatherPool,
  terrainPool,
  biomeLinks,
};
