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
    [TimeOfDay.ALL]: [SpeciesId.KRABBY, SpeciesId.CORPHISH, SpeciesId.DWEBBLE, SpeciesId.BINACLE, SpeciesId.MAREANIE, SpeciesId.WIGLETT, SpeciesId.BOTAMON],
    [TimeOfDay.DAWN]: [SpeciesId.STARYU],
    [TimeOfDay.DAY]: [SpeciesId.STARYU],
    [TimeOfDay.DUSK]: [SpeciesId.SHELLDER],
    [TimeOfDay.NIGHT]: [SpeciesId.SHELLDER],
  },
  [BiomePoolTier.UNCOMMON]: {
    [TimeOfDay.ALL]: [SpeciesId.BURMY, SpeciesId.CLAUNCHER, SpeciesId.SANDYGAST],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.QUAXLY, SpeciesId.TATSUGIRI],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.TIRTOUGA],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.ULTRA_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.CRESSELIA, SpeciesId.KELDEO, SpeciesId.TAPU_FINI],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS]: {
    [TimeOfDay.ALL]: [SpeciesId.KINGLER, SpeciesId.CRAWDAUNT, SpeciesId.WORMADAM, SpeciesId.CRUSTLE, SpeciesId.BARBARACLE, SpeciesId.CLAWITZER, SpeciesId.TOXAPEX, SpeciesId.PALOSSAND],
    [TimeOfDay.DAWN]: [SpeciesId.STARMIE],
    [TimeOfDay.DAY]: [SpeciesId.STARMIE],
    [TimeOfDay.DUSK]: [SpeciesId.CLOYSTER],
    [TimeOfDay.NIGHT]: [SpeciesId.CLOYSTER],
  },
  [BiomePoolTier.BOSS_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.CARRACOSTA, SpeciesId.QUAQUAVAL],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS_SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.CRESSELIA, SpeciesId.KELDEO, SpeciesId.TAPU_FINI],
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
  [BiomePoolTier.COMMON]: [TrainerType.FISHERMAN, TrainerType.SAILOR, TrainerType.SWIMMER],
  [BiomePoolTier.UNCOMMON]: [TrainerType.ACE_TRAINER, TrainerType.BREEDER],
  [BiomePoolTier.RARE]: [TrainerType.BLACK_BELT],
  [BiomePoolTier.SUPER_RARE]: [],
  [BiomePoolTier.ULTRA_RARE]: [],
  [BiomePoolTier.BOSS]: [TrainerType.MISTY, TrainerType.KOFU],
  [BiomePoolTier.BOSS_RARE]: [],
  [BiomePoolTier.BOSS_SUPER_RARE]: [],
  [BiomePoolTier.BOSS_ULTRA_RARE]: [],
};

const weatherPool: WeatherPool = {
  [WeatherType.NONE]: 8,
  [WeatherType.RAIN]: 3,
  [WeatherType.SUNNY]: 5,
};

const terrainPool: TerrainPool = {
  [TerrainType.NONE]: 1,
};

const biomeLinks: BiomeLinks = [BiomeId.SEA, [BiomeId.ISLAND, 2]];

export const beachBiome: Biome = {
  biomeId: BiomeId.BEACH,
  pokemonPool,
  trainerPool,
  trainerChance: 6,
  weatherPool,
  terrainPool,
  biomeLinks,
};
