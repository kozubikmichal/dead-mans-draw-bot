import GameLoop, { Event } from "../types";

export default (event: Event, game: GameLoop) => {
  const delta = event.turnStartedDelta;

  game.mustDraw = 0;
  game.playArea.clear();
  game.banks[0].processDelta(delta.banks[0]);
  game.banks[1].processDelta(delta.banks[1]);
  game.discardPile.processDelta(delta.discardPile);
  game.drawPile.processDelta(delta.drawPile);
};
