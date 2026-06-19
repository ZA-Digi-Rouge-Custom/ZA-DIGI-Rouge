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
    [TimeOfDay.ALL]: [SpeciesId.DROWZEE, SpeciesId.NATU, SpeciesId.UNOWN, SpeciesId.SPOINK, SpeciesId.BALTOY, SpeciesId.ELGYEM, SpeciesId.BOTAMON],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.UNCOMMON]: {
    [TimeOfDay.ALL]: [SpeciesId.ABRA, SpeciesId.SIGILYPH, SpeciesId.TINKATINK],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.MR_MIME, SpeciesId.WOBBUFFET, SpeciesId.GOTHITA, SpeciesId.STONJOURNER, SpeciesId.BOTAMON],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.ARCHEN],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [SpeciesId.ESPEON],
    [TimeOfDay.DUSK]: [SpeciesId.GALAR_YAMASK],
    [TimeOfDay.NIGHT]: [SpeciesId.GALAR_YAMASK],
  },
  [BiomePoolTier.ULTRA_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.REGISTEEL, SpeciesId.FEZANDIPITI],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS]: {
    [TimeOfDay.ALL]: [SpeciesId.ALAKAZAM, SpeciesId.HYPNO, SpeciesId.XATU, SpeciesId.GRUMPIG, SpeciesId.CLAYDOL, SpeciesId.SIGILYPH, SpeciesId.GOTHITELLE, SpeciesId.BEHEEYEM, SpeciesId.TINKATON],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.MR_MIME, SpeciesId.WOBBUFFET, SpeciesId.ARCHEOPS],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [SpeciesId.ESPEON],
    [TimeOfDay.DUSK]: [SpeciesId.RUNERIGUS],
    [TimeOfDay.NIGHT]: [SpeciesId.RUNERIGUS],
  },
  [BiomePoolTier.BOSS_SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.REGISTEEL, SpeciesId.FEZANDIPITI],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS_ULTRA_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.KORAIDON],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
};

const trainerPool: TrainerPools = {
  [BiomePoolTier.COMMON]: [TrainerType.PSYCHIC, TrainerType.RUIN_MANIAC, TrainerType.SCIENTIST],
  [BiomePoolTier.UNCOMMON]: [
    TrainerType.ACE_TRAINER,
    TrainerType.BLACK_BELT,
    TrainerType.COLLECTOR,
    TrainerType.HEX_MANIAC,
  ],
  [BiomePoolTier.RARE]: [],
  [BiomePoolTier.SUPER_RARE]: [],
  [BiomePoolTier.ULTRA_RARE]: [],
  [BiomePoolTier.BOSS]: [TrainerType.SABRINA, TrainerType.TATE, TrainerType.LIZA, TrainerType.TULIP],
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

const biomeLinks: BiomeLinks = [BiomeId.MOUNTAIN, [BiomeId.FOREST, 2]];

export const ruinsBiome: Biome = {
  biomeId: BiomeId.RUINS,
  pokemonPool,
  trainerPool,
  trainerChance: 12,
  weatherPool,
  terrainPool,
  biomeLinks,
};
