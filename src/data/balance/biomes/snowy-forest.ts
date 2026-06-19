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
    [TimeOfDay.ALL]: [SpeciesId.SENTRET, SpeciesId.SWINUB, SpeciesId.SNOVER, SpeciesId.SNOM, SpeciesId.BOTAMON],
    [TimeOfDay.DAWN]: [SpeciesId.GLALIE, SpeciesId.CUBCHOO],
    [TimeOfDay.DAY]: [SpeciesId.GLALIE, SpeciesId.CUBCHOO],
    [TimeOfDay.DUSK]: [SpeciesId.SNEASEL, SpeciesId.FROSLASS],
    [TimeOfDay.NIGHT]: [SpeciesId.SNEASEL, SpeciesId.FROSLASS],
  },
  [BiomePoolTier.UNCOMMON]: {
    [TimeOfDay.ALL]: [SpeciesId.TEDDIURSA, SpeciesId.STANTLER, SpeciesId.SKIDDO, SpeciesId.EISCUE],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.DELIBIRD, SpeciesId.CRYOGONAL, SpeciesId.AVALUGG, SpeciesId.ALOLA_SANDSHREW, SpeciesId.ALOLA_VULPIX],
    [TimeOfDay.DAWN]: [SpeciesId.GALAR_DARUMAKA],
    [TimeOfDay.DAY]: [SpeciesId.GALAR_DARUMAKA],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.GALAR_MR_MIME, SpeciesId.ARCTOZOLT, SpeciesId.HISUI_AVALUGG],
    [TimeOfDay.DAWN]: [SpeciesId.HISUI_SNEASEL],
    [TimeOfDay.DAY]: [SpeciesId.HISUI_SNEASEL],
    [TimeOfDay.DUSK]: [SpeciesId.HISUI_ZORUA],
    [TimeOfDay.NIGHT]: [SpeciesId.HISUI_ZORUA],
  },
  [BiomePoolTier.ULTRA_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.GLASTRIER, SpeciesId.CHIEN_PAO, SpeciesId.GALAR_ARTICUNO],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS]: {
    [TimeOfDay.ALL]: [SpeciesId.ABOMASNOW, SpeciesId.MAMOSWINE, SpeciesId.WYRDEER, SpeciesId.URSALUNA],
    [TimeOfDay.DAWN]: [SpeciesId.GLALIE, SpeciesId.BEARTIC],
    [TimeOfDay.DAY]: [SpeciesId.GLALIE, SpeciesId.BEARTIC],
    [TimeOfDay.DUSK]: [SpeciesId.WEAVILE, SpeciesId.FROSLASS],
    [TimeOfDay.NIGHT]: [SpeciesId.WEAVILE, SpeciesId.FROSLASS],
  },
  [BiomePoolTier.BOSS_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.MR_RIME, SpeciesId.ARCTOZOLT, SpeciesId.ALOLA_SANDSLASH, SpeciesId.ALOLA_NINETALES],
    [TimeOfDay.DAWN]: [SpeciesId.SNEASLER, SpeciesId.GALAR_DARMANITAN],
    [TimeOfDay.DAY]: [SpeciesId.SNEASLER, SpeciesId.GALAR_DARMANITAN],
    [TimeOfDay.DUSK]: [SpeciesId.HISUI_ZOROARK],
    [TimeOfDay.NIGHT]: [SpeciesId.HISUI_ZOROARK],
  },
  [BiomePoolTier.BOSS_SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.GLASTRIER, SpeciesId.CHIEN_PAO, SpeciesId.GALAR_ARTICUNO],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS_ULTRA_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.ZACIAN],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
};

const trainerPool: TrainerPools = {
  [BiomePoolTier.COMMON]: [TrainerType.SNOW_WORKER],
  [BiomePoolTier.UNCOMMON]: [TrainerType.SNOW_ACE_TRAINER],
  [BiomePoolTier.RARE]: [TrainerType.YOUNG_COUPLE],
  [BiomePoolTier.SUPER_RARE]: [],
  [BiomePoolTier.ULTRA_RARE]: [],
  [BiomePoolTier.BOSS]: [TrainerType.CANDICE, TrainerType.MELONY],
  [BiomePoolTier.BOSS_RARE]: [],
  [BiomePoolTier.BOSS_SUPER_RARE]: [],
  [BiomePoolTier.BOSS_ULTRA_RARE]: [],
};

const weatherPool: WeatherPool = {
  [WeatherType.SNOW]: 7,
  [WeatherType.HAIL]: 1,
};

const terrainPool: TerrainPool = {
  [TerrainType.NONE]: 1,
};

const biomeLinks: BiomeLinks = [BiomeId.FOREST, [BiomeId.MOUNTAIN, 2], [BiomeId.LAKE, 2]];

export const snowyForestBiome: Biome = {
  biomeId: BiomeId.SNOWY_FOREST,
  pokemonPool,
  trainerPool,
  trainerChance: 8,
  weatherPool,
  terrainPool,
  biomeLinks,
};
