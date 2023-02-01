/**
Forces you to place two additional cards in
the Play Area before you can Collect. You
will draw two cards from the Draw Pile, un
-
less the first card drawn is a Hook, Sword or
Map. Any of those three Suit Abilities adds
an additional card to the Play Area. Both sce
-
narios fulfill the Kraken, since at least two
additional cards were added to the Play Area.
 */

import GameLoop from "../GameLoop";
import Responses from "../responses";
import { Effect } from "../types";

export default (effect: Effect, game: GameLoop) => {
  game.mustDraw = effect.krakenCount;

  return Responses.Draw();
};
