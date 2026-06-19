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
    [TimeOfDay.ALL]: [SpeciesId.PARAS, SpeciesId.FOMANTIS, SpeciesId.NYMBLE, SpeciesId.SCATTERBUG, SpeciesId.BOTAMON],
    [TimeOfDay.DAWN]: [SpeciesId.NIDORAN_F, SpeciesId.NIDORAN_M, SpeciesId.BOUNSWEET],
    [TimeOfDay.DAY]: [SpeciesId.NIDORAN_F, SpeciesId.NIDORAN_M, SpeciesId.BOUNSWEET],
    [TimeOfDay.DUSK]: [SpeciesId.ODDISH, SpeciesId.SPINARAK, SpeciesId.KRICKETOT],
    [TimeOfDay.NIGHT]: [SpeciesId.ODDISH, SpeciesId.SPINARAK, SpeciesId.KRICKETOT],
  },
  [BiomePoolTier.UNCOMMON]: {
    [TimeOfDay.ALL]: [SpeciesId.VULPIX, SpeciesId.VENONAT, SpeciesId.NINCADA, SpeciesId.ZANGOOSE, SpeciesId.SEVIPER],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.PINSIR, SpeciesId.CHIKORITA, SpeciesId.GIRAFARIG, SpeciesId.KECLEON, SpeciesId.TROPIUS, SpeciesId.AUDINO, SpeciesId.PAWNIARD],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.SCYTHER, SpeciesId.SHEDINJA],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.ULTRA_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.RAIKOU, SpeciesId.ENTEI],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS]: {
    [TimeOfDay.ALL]: [SpeciesId.NINJASK, SpeciesId.ZANGOOSE, SpeciesId.SEVIPER, SpeciesId.KECLEON, SpeciesId.LURANTIS, SpeciesId.LOKIX],
    [TimeOfDay.DAWN]: [SpeciesId.NIDOQUEEN, SpeciesId.NIDOKING, SpeciesId.TSAREENA],
    [TimeOfDay.DAY]: [SpeciesId.NIDOQUEEN, SpeciesId.NIDOKING, SpeciesId.TSAREENA],
    [TimeOfDay.DUSK]: [SpeciesId.VILEPLUME, SpeciesId.ARIADOS, SpeciesId.KRICKETUNE],
    [TimeOfDay.NIGHT]: [SpeciesId.VILEPLUME, SpeciesId.ARIADOS, SpeciesId.KRICKETUNE],
  },
  [BiomePoolTier.BOSS_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.SCYTHER, SpeciesId.PINSIR, SpeciesId.MEGANIUM, SpeciesId.FARIGIRAF, SpeciesId.KINGAMBIT],
    [TimeOfDay.DAWN]: [SpeciesId.BELLOSSOM],
    [TimeOfDay.DAY]: [SpeciesId.BELLOSSOM],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS_SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.RAIKOU, SpeciesId.ENTEI],
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
  [BiomePoolTier.COMMON]: [TrainerType.BIRD_KEEPER, TrainerType.BUG_CATCHER],
  [BiomePoolTier.UNCOMMON]: [TrainerType.ACE_TRAINER, TrainerType.BREEDER, TrainerType.RANGER],
  [BiomePoolTier.RARE]: [],
  [BiomePoolTier.SUPER_RARE]: [],
  [BiomePoolTier.ULTRA_RARE]: [],
  [BiomePoolTier.BOSS]: [TrainerType.GARDENIA, TrainerType.VIOLA, TrainerType.BRASSIUS],
  [BiomePoolTier.BOSS_RARE]: [],
  [BiomePoolTier.BOSS_SUPER_RARE]: [],
  [BiomePoolTier.BOSS_ULTRA_RARE]: [],
};

const weatherPool: WeatherPool = {
  [WeatherType.NONE]: 8,
  [WeatherType.RAIN]: 4,
  [WeatherType.SUNNY]: 4,
};

const terrainPool: TerrainPool = {
  [TerrainType.NONE]: 1,
};

const biomeLinks: BiomeLinks = [BiomeId.FOREST, BiomeId.CAVE];

export const tallGrassBiome: Biome = {
  biomeId: BiomeId.TALL_GRASS,
  pokemonPool,
  trainerPool,
  trainerChance: 8,
  weatherPool,
  terrainPool,
  biomeLinks,
};
