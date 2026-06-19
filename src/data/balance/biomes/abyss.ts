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
    [TimeOfDay.ALL]: [SpeciesId.ZUBAT, SpeciesId.PARAS, SpeciesId.MISDREAVUS, SpeciesId.SABLEYE, SpeciesId.WOOBAT, SpeciesId.IMPIDIMP, SpeciesId.BOTAMON],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.UNCOMMON]: {
    [TimeOfDay.ALL]: [SpeciesId.GASTLY, SpeciesId.DUNSPARCE, SpeciesId.HOUNDOUR, SpeciesId.MAWILE, SpeciesId.WHISMUR],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.ABSOL, SpeciesId.SPIRITOMB, SpeciesId.FROSLASS, SpeciesId.ZORUA],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.UMBREON, SpeciesId.DEINO, SpeciesId.DREEPY],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.ULTRA_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.DARKRAI, SpeciesId.GALAR_MOLTRES],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS]: {
    [TimeOfDay.ALL]: [SpeciesId.GENGAR, SpeciesId.CROBAT, SpeciesId.HOUNDOOM, SpeciesId.SABLEYE, SpeciesId.FROSLASS, SpeciesId.ZOROARK, SpeciesId.GRIMMSNARL],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.UMBREON, SpeciesId.SPIRITOMB, SpeciesId.HYDREIGON, SpeciesId.DRAGAPULT],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS_SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.DARKRAI, SpeciesId.GALAR_MOLTRES],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS_ULTRA_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.PALKIA, SpeciesId.YVELTAL],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
};

const trainerPool: TrainerPools = {
  [BiomePoolTier.COMMON]: [TrainerType.VETERAN],
  [BiomePoolTier.UNCOMMON]: [TrainerType.ACE_TRAINER],
  [BiomePoolTier.RARE]: [],
  [BiomePoolTier.SUPER_RARE]: [],
  [BiomePoolTier.ULTRA_RARE]: [],
  [BiomePoolTier.BOSS]: [TrainerType.MARNIE],
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

const biomeLinks: BiomeLinks = [BiomeId.CAVE, [BiomeId.SPACE, 2], [BiomeId.WASTELAND, 2]];

export const abyssBiome: Biome = {
  biomeId: BiomeId.ABYSS,
  pokemonPool,
  trainerPool,
  trainerChance: 16,
  weatherPool,
  terrainPool,
  biomeLinks,
};
