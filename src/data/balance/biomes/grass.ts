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
    [TimeOfDay.ALL]: [SpeciesId.SHROOMISH, SpeciesId.VENIPEDE, SpeciesId.COTTONEE, SpeciesId.PETILIL, SpeciesId.BOTAMON],
    [TimeOfDay.DAWN]: [SpeciesId.HOPPIP, SpeciesId.SILCOON],
    [TimeOfDay.DAY]: [SpeciesId.HOPPIP, SpeciesId.SILCOON],
    [TimeOfDay.DUSK]: [SpeciesId.CASCOON],
    [TimeOfDay.NIGHT]: [SpeciesId.CASCOON],
  },
  [BiomePoolTier.UNCOMMON]: {
    [TimeOfDay.ALL]: [SpeciesId.LICKITUNG, SpeciesId.MILTANK, SpeciesId.CHERUBI, SpeciesId.FOONGUS],
    [TimeOfDay.DAWN]: [SpeciesId.SUNKERN, SpeciesId.COMBEE],
    [TimeOfDay.DAY]: [SpeciesId.SUNKERN, SpeciesId.COMBEE],
    [TimeOfDay.DUSK]: [SpeciesId.SEEDOT],
    [TimeOfDay.NIGHT]: [SpeciesId.SEEDOT],
  },
  [BiomePoolTier.RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.BULBASAUR, SpeciesId.GROWLITHE, SpeciesId.TURTWIG, SpeciesId.BONSLY],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [SpeciesId.NOIBAT],
    [TimeOfDay.NIGHT]: [SpeciesId.NOIBAT],
  },
  [BiomePoolTier.SUPER_RARE]: {
    [TimeOfDay.ALL]: [],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.ULTRA_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.VIRIZION],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS]: {
    [TimeOfDay.ALL]: [SpeciesId.MILTANK, SpeciesId.SCOLIPEDE, SpeciesId.WHIMSICOTT, SpeciesId.LILLIGANT],
    [TimeOfDay.DAWN]: [SpeciesId.JUMPLUFF, SpeciesId.VESPIQUEN],
    [TimeOfDay.DAY]: [SpeciesId.JUMPLUFF, SpeciesId.VESPIQUEN],
    [TimeOfDay.DUSK]: [SpeciesId.NOIVERN],
    [TimeOfDay.NIGHT]: [SpeciesId.NOIVERN],
  },
  [BiomePoolTier.BOSS_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.VENUSAUR, SpeciesId.ARCANINE, SpeciesId.SUDOWOODO, SpeciesId.TORTERRA],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS_SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.VIRIZION],
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
  [BiomePoolTier.COMMON]: [TrainerType.AROMA_LADY, TrainerType.BREEDER, TrainerType.CAMPER, TrainerType.SCHOOL_KID],
  [BiomePoolTier.UNCOMMON]: [TrainerType.ACE_TRAINER, TrainerType.POKEFAN],
  [BiomePoolTier.RARE]: [TrainerType.BLACK_BELT],
  [BiomePoolTier.SUPER_RARE]: [],
  [BiomePoolTier.ULTRA_RARE]: [],
  [BiomePoolTier.BOSS]: [TrainerType.ERIKA],
  [BiomePoolTier.BOSS_RARE]: [],
  [BiomePoolTier.BOSS_SUPER_RARE]: [],
  [BiomePoolTier.BOSS_ULTRA_RARE]: [],
};

const weatherPool: WeatherPool = {
  [WeatherType.NONE]: 8,
  [WeatherType.RAIN]: 4,
  [WeatherType.SUNNY]: 8,
};

const terrainPool: TerrainPool = {
  [TerrainType.NONE]: 1,
};

const biomeLinks: BiomeLinks = [BiomeId.TALL_GRASS];

export const grassBiome: Biome = {
  biomeId: BiomeId.GRASS,
  pokemonPool,
  trainerPool,
  trainerChance: 6,
  weatherPool,
  terrainPool,
  biomeLinks,
};
