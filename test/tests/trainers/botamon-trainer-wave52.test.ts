import { initSpecies } from "#balance/pokemon-species";
import { BattleType } from "#enums/battle-type";
import { SpeciesId } from "#enums/species-id";
import { GameManager } from "#test/framework/game-manager";
import { getPokemonSpecies } from "#utils/pokemon-utils";
import Phaser from "phaser";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";

describe("Trainers - Botamon (custom species) at wave 52", () => {
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
    game.override.battleStyle("single").battleType(BattleType.TRAINER).startingWave(52).enemySpecies(SpeciesId.BOTAMON);
  });

  it("resolves SpeciesId.BOTAMON by speciesId, not allSpecies array index", () => {
    const botamon = getPokemonSpecies(SpeciesId.BOTAMON);
    expect(botamon.speciesId).toBe(SpeciesId.BOTAMON);
    expect(botamon.getCryKey()).toBe(`cry/${SpeciesId.BOTAMON}`);
  });

  it("starts a trainer battle with enemy Botamon without hanging", async () => {
    await game.classicMode.startBattle(SpeciesId.PIKACHU);
    expect(game.field.getEnemyPokemon().species.speciesId).toBe(SpeciesId.BOTAMON);
  }, 60000);
});
