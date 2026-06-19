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
    [TimeOfDay.ALL]: [SpeciesId.SANDSHREW, SpeciesId.SKORUPI, SpeciesId.SILICOBRA, SpeciesId.BRAMBLIN, SpeciesId.RELLOR, SpeciesId.BOTAMON],
    [TimeOfDay.DAWN]: [SpeciesId.TRAPINCH, SpeciesId.HELIOPTILE],
    [TimeOfDay.DAY]: [SpeciesId.TRAPINCH, SpeciesId.HELIOPTILE],
    [TimeOfDay.DUSK]: [SpeciesId.CACNEA],
    [TimeOfDay.NIGHT]: [SpeciesId.CACNEA],
  },
  [BiomePoolTier.UNCOMMON]: {
    [TimeOfDay.ALL]: [SpeciesId.NUMEL, SpeciesId.HIPPOPOTAS, SpeciesId.SANDILE, SpeciesId.ORTHWORM],
    [TimeOfDay.DAWN]: [SpeciesId.MARACTUS],
    [TimeOfDay.DAY]: [SpeciesId.MARACTUS],
    [TimeOfDay.DUSK]: [SpeciesId.GLIGAR, SpeciesId.YAMASK],
    [TimeOfDay.NIGHT]: [SpeciesId.GLIGAR, SpeciesId.YAMASK],
  },
  [BiomePoolTier.RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.DODUO, SpeciesId.DARUMAKA, SpeciesId.SIGILYPH, SpeciesId.STONJOURNER],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.LILEEP, SpeciesId.ANORITH, SpeciesId.GIBLE],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.ULTRA_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.REGIROCK, SpeciesId.TAPU_BULU, SpeciesId.PHEROMOSA],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS]: {
    [TimeOfDay.ALL]: [SpeciesId.SANDSLASH, SpeciesId.HIPPOWDON, SpeciesId.DRAPION, SpeciesId.KROOKODILE, SpeciesId.DARMANITAN, SpeciesId.SANDACONDA, SpeciesId.BRAMBLEGHAST],
    [TimeOfDay.DAWN]: [SpeciesId.MARACTUS, SpeciesId.HELIOLISK, SpeciesId.FLYGON],
    [TimeOfDay.DAY]: [SpeciesId.MARACTUS, SpeciesId.HELIOLISK, SpeciesId.FLYGON],
    [TimeOfDay.DUSK]: [SpeciesId.GLISCOR, SpeciesId.CACTURNE, SpeciesId.COFAGRIGUS],
    [TimeOfDay.NIGHT]: [SpeciesId.GLISCOR, SpeciesId.CACTURNE, SpeciesId.COFAGRIGUS],
  },
  [BiomePoolTier.BOSS_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.DODRIO, SpeciesId.CRADILY, SpeciesId.ARMALDO, SpeciesId.GARCHOMP, SpeciesId.SIGILYPH, SpeciesId.STONJOURNER],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS_SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.REGIROCK, SpeciesId.TAPU_BULU, SpeciesId.PHEROMOSA],
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
  [BiomePoolTier.COMMON]: [TrainerType.BACKPACKER, TrainerType.SCIENTIST],
  [BiomePoolTier.UNCOMMON]: [TrainerType.RUIN_MANIAC],
  [BiomePoolTier.RARE]: [],
  [BiomePoolTier.SUPER_RARE]: [],
  [BiomePoolTier.ULTRA_RARE]: [],
  [BiomePoolTier.BOSS]: [TrainerType.GORDIE],
  [BiomePoolTier.BOSS_RARE]: [],
  [BiomePoolTier.BOSS_SUPER_RARE]: [],
  [BiomePoolTier.BOSS_ULTRA_RARE]: [],
};

const weatherPool: WeatherPool = {
  [WeatherType.NONE]: 2,
  [WeatherType.SANDSTORM]: 8,
  [WeatherType.SUNNY]: 5,
};

const terrainPool: TerrainPool = {
  [TerrainType.NONE]: 1,
};

const biomeLinks: BiomeLinks = [BiomeId.RUINS, [BiomeId.CONSTRUCTION_SITE, 2]];

export const desertBiome: Biome = {
  biomeId: BiomeId.DESERT,
  pokemonPool,
  trainerPool,
  trainerChance: 6,
  weatherPool,
  terrainPool,
  biomeLinks,
};
