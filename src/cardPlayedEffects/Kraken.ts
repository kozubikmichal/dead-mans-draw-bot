import GameLoop from "../GameLoop";
import { Effect } from "../types";

export default (effect: Effect, game: GameLoop) => {
  game.mustDraw = effect.krakenCount;
  return {
    etype: "Draw",
  };
};
