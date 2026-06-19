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
    [TimeOfDay.ALL]: [SpeciesId.AIPOM, SpeciesId.BLITZLE, SpeciesId.PIKIPEK, SpeciesId.BOTAMON],
    [TimeOfDay.DAWN]: [SpeciesId.VESPIQUEN, SpeciesId.CHERUBI, SpeciesId.SEWADDLE],
    [TimeOfDay.DAY]: [SpeciesId.VESPIQUEN, SpeciesId.CHERUBI, SpeciesId.SEWADDLE],
    [TimeOfDay.DUSK]: [SpeciesId.SPINARAK, SpeciesId.SHROOMISH, SpeciesId.PURRLOIN, SpeciesId.FOONGUS],
    [TimeOfDay.NIGHT]: [SpeciesId.SPINARAK, SpeciesId.SHROOMISH, SpeciesId.PURRLOIN, SpeciesId.FOONGUS],
  },
  [BiomePoolTier.UNCOMMON]: {
    [TimeOfDay.ALL]: [SpeciesId.PANSAGE, SpeciesId.PANSEAR, SpeciesId.PANPOUR, SpeciesId.JOLTIK, SpeciesId.LITLEO, SpeciesId.FOMANTIS, SpeciesId.FALINKS],
    [TimeOfDay.DAWN]: [SpeciesId.EXEGGCUTE, SpeciesId.TROPIUS, SpeciesId.COMBEE, SpeciesId.KOMALA],
    [TimeOfDay.DAY]: [SpeciesId.EXEGGCUTE, SpeciesId.TROPIUS, SpeciesId.COMBEE, SpeciesId.KOMALA],
    [TimeOfDay.DUSK]: [SpeciesId.TANGELA, SpeciesId.PANCHAM],
    [TimeOfDay.NIGHT]: [SpeciesId.TANGELA, SpeciesId.PANCHAM],
  },
  [BiomePoolTier.RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.SCYTHER, SpeciesId.YANMA, SpeciesId.SLAKOTH, SpeciesId.SEVIPER, SpeciesId.CARNIVINE, SpeciesId.SNIVY, SpeciesId.GROOKEY],
    [TimeOfDay.DAWN]: [SpeciesId.FOONGUS, SpeciesId.PASSIMIAN, SpeciesId.GALAR_PONYTA],
    [TimeOfDay.DAY]: [SpeciesId.FOONGUS, SpeciesId.PASSIMIAN, SpeciesId.GALAR_PONYTA],
    [TimeOfDay.DUSK]: [SpeciesId.ORANGURU],
    [TimeOfDay.NIGHT]: [SpeciesId.ORANGURU],
  },
  [BiomePoolTier.SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.KANGASKHAN, SpeciesId.CHATOT, SpeciesId.KLEAVOR],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.ULTRA_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.TAPU_LELE, SpeciesId.BUZZWOLE, SpeciesId.ZARUDE, SpeciesId.MUNKIDORI],
    [TimeOfDay.DAWN]: [],
    [TimeOfDay.DAY]: [],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS]: {
    [TimeOfDay.ALL]: [SpeciesId.SEVIPER, SpeciesId.AMBIPOM, SpeciesId.CARNIVINE, SpeciesId.YANMEGA, SpeciesId.GALVANTULA, SpeciesId.PYROAR, SpeciesId.TOUCANNON, SpeciesId.LURANTIS, SpeciesId.FALINKS],
    [TimeOfDay.DAWN]: [SpeciesId.EXEGGUTOR, SpeciesId.TROPIUS, SpeciesId.CHERRIM, SpeciesId.LEAVANNY, SpeciesId.KOMALA],
    [TimeOfDay.DAY]: [SpeciesId.EXEGGUTOR, SpeciesId.TROPIUS, SpeciesId.CHERRIM, SpeciesId.LEAVANNY, SpeciesId.KOMALA],
    [TimeOfDay.DUSK]: [SpeciesId.BRELOOM, SpeciesId.TANGROWTH, SpeciesId.AMOONGUSS, SpeciesId.PANGORO],
    [TimeOfDay.NIGHT]: [SpeciesId.BRELOOM, SpeciesId.TANGROWTH, SpeciesId.AMOONGUSS, SpeciesId.PANGORO],
  },
  [BiomePoolTier.BOSS_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.KANGASKHAN, SpeciesId.SCIZOR, SpeciesId.SLAKING, SpeciesId.LEAFEON, SpeciesId.SERPERIOR, SpeciesId.RILLABOOM, SpeciesId.KLEAVOR],
    [TimeOfDay.DAWN]: [SpeciesId.AMOONGUSS, SpeciesId.GALAR_RAPIDASH],
    [TimeOfDay.DAY]: [SpeciesId.AMOONGUSS, SpeciesId.GALAR_RAPIDASH],
    [TimeOfDay.DUSK]: [],
    [TimeOfDay.NIGHT]: [],
  },
  [BiomePoolTier.BOSS_SUPER_RARE]: {
    [TimeOfDay.ALL]: [SpeciesId.TAPU_LELE, SpeciesId.BUZZWOLE, SpeciesId.ZARUDE, SpeciesId.MUNKIDORI],
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
  [BiomePoolTier.COMMON]: [TrainerType.BACKPACKER, TrainerType.RANGER],
  [BiomePoolTier.UNCOMMON]: [],
  [BiomePoolTier.RARE]: [],
  [BiomePoolTier.SUPER_RARE]: [],
  [BiomePoolTier.ULTRA_RARE]: [],
  [BiomePoolTier.BOSS]: [TrainerType.RAMOS],
  [BiomePoolTier.BOSS_RARE]: [],
  [BiomePoolTier.BOSS_SUPER_RARE]: [],
  [BiomePoolTier.BOSS_ULTRA_RARE]: [],
};

const weatherPool: WeatherPool = {
  [WeatherType.NONE]: 8,
  [WeatherType.RAIN]: 6,
  [WeatherType.FOG]: 1,
};

const terrainPool: TerrainPool = {
  [TerrainType.NONE]: 1,
};

const biomeLinks: BiomeLinks = [BiomeId.TEMPLE];

export const jungleBiome: Biome = {
  biomeId: BiomeId.JUNGLE,
  pokemonPool,
  trainerPool,
  trainerChance: 12,
  weatherPool,
  terrainPool,
  biomeLinks,
};
