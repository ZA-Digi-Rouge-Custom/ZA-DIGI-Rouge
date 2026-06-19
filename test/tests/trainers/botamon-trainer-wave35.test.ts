import { initSpecies } from "#balance/pokemon-species";
import { BattleType } from "#enums/battle-type";
import { ClassicFixedBossWaves } from "#enums/fixed-boss-waves";
import { SpeciesId } from "#enums/species-id";
import { TrainerType } from "#enums/trainer-type";
import { GameManager } from "#test/framework/game-manager";
import { getPokemonSpecies } from "#utils/pokemon-utils";
import Phaser from "phaser";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";

describe("Trainers - Botamon (custom species) at wave 35 evil grunt", () => {
  let phaserGame: Phaser.Game;
  let game: GameManager;

  beforeAll(() => {
    phaserGame = new Phaser.Game({
      type: Phaser.HEADLESS,
    });
    initSpecies();
  });

  beforeEach(() => {
    game = new GameManager(phaserGame);
    game.override
      .battleStyle("single")
      .startingWave(ClassicFixedBossWaves.EVIL_GRUNT_1)
      .enemySpecies(SpeciesId.BOTAMON)
      .randomTrainer({ trainerType: TrainerType.ROCKET_GRUNT });
  });

  it("resolves SpeciesId.BOTAMON by speciesId at the evil-grunt wave", () => {
    expect(ClassicFixedBossWaves.EVIL_GRUNT_1).toBe(35);
    const botamon = getPokemonSpecies(SpeciesId.BOTAMON);
    expect(botamon.speciesId).toBe(SpeciesId.BOTAMON);
    expect(botamon.getCryKey()).toBe(`cry/${SpeciesId.BOTAMON}`);
  });

  it("starts the wave-35 evil grunt battle with Botamon without hanging", async () => {
    await game.classicMode.startBattle(SpeciesId.PIKACHU);
    expect(game.scene.currentBattle.waveIndex).toBe(35);
    expect(game.scene.currentBattle.battleType).toBe(BattleType.TRAINER);
    expect(game.field.getEnemyPokemon().species.speciesId).toBe(SpeciesId.BOTAMON);
  }, 60000);
});
