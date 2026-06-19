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
    [TimeOfDay.ALL]: [SpeciesId.PSYDUCK, SpeciesId.GOLDEEN, SpeciesId.WOOPER, SpeciesId.SURSKIT, SpeciesId.CHEWTLE, SpeciesId.BOTAMON],
    [TimeOfDay.DAWN]: [SpeciesId.LOTAD, SpeciesId.DUCKLETT],
    [TimeOfDay.DAY]: [SpeciesId.LOTAD, SpeciesId.DUCKLETT],
    [TimeOfDay.DUSK]: [SpeciesId.MARILL],
    [TimeOfDay.NIGHT]: [SpeciesId.MARILL],
  },
  [BiomePoolTier.UNCOMMON]: {
    [TimeOfDay.ALL]: [SpeciesId.SLOWPOKE, SpeciesId.MAGIKARP, SpeciesId.WISHIWASHI],
    [TimeOfDay.DAWN]: [SpeciesId.DEWPIDER],
    [TimeOfDay.DAY]: [SpeciesId.DEWPIDER],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.SQUIRTLE, SpeciesId.OSHAWOTT, SpeciesId.FROAKIE, SpeciesId.SOBBLE, SpeciesId.FLAMIGO],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.VAPOREON, SpeciesId.SLOWKING],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.ULTRA_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.SUICUNE, SpeciesId.MESPRIT],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS]: {
    [TimeOfDay.ALL]: [SpeciesId.GOLDUCK, SpeciesId.SLOWBRO, SpeciesId.SEAKING, SpeciesId.MASQUERAIN, SpeciesId.WISHIWASHI, SpeciesId.DREDNAW],
    [TimeOfDay.DAWN]: [SpeciesId.SWANNA, SpeciesId.ARAQUANID],
    [TimeOfDay.DAY]: [SpeciesId.SWANNA, SpeciesId.ARAQUANID],
    [TimeOfDay.DUSK]: [SpeciesId.AZUMARILL],
    [TimeOfDay.NIGHT]: [SpeciesId.AZUMARILL],
  },
  [BiomePoolTier.BOSS_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.BLASTOISE, SpeciesId.GYARADOS, SpeciesId.VAPOREON, SpeciesId.SLOWKING, SpeciesId.SAMUROTT, SpeciesId.GRENINJA, SpeciesId.INTELEON],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS_SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.SUICUNE, SpeciesId.MESPRIT],
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
  [BiomePoolTier.COMMON]: [TrainerType.BREEDER, TrainerType.FISHERMAN, TrainerType.PARASOL_LADY],
  [BiomePoolTier.UNCOMMON]: [TrainerType.ACE_TRAINER, TrainerType.YOUNG_COUPLE],
  [BiomePoolTier.RARE]: [TrainerType.BLACK_BELT],
  [BiomePoolTier.SUPER_RARE]: [],
  [BiomePoolTier.ULTRA_RARE]: [],
  [BiomePoolTier.BOSS]: [TrainerType.CRASHER_WAKE],
  [BiomePoolTier.BOSS_RARE]: [],
  [BiomePoolTier.BOSS_SUPER_RARE]: [],
  [BiomePoolTier.BOSS_ULTRA_RARE]: [],
};

const weatherPool: WeatherPool = {
  [WeatherType.NONE]: 10,
  [WeatherType.RAIN]: 4,
  [WeatherType.FOG]: 1,
};

const terrainPool: TerrainPool = {
  [TerrainType.NONE]: 1,
};

const biomeLinks: BiomeLinks = [BiomeId.BEACH, BiomeId.SWAMP, BiomeId.CONSTRUCTION_SITE];

export const lakeBiome: Biome = {
  biomeId: BiomeId.LAKE,
  pokemonPool,
  trainerPool,
  trainerChance: 6,
  weatherPool,
  terrainPool,
  biomeLinks,
};
