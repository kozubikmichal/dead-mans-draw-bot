import GameLoop from "../types";

export default ({
  event,
  playArea,
  banks,
  discardPile,
  drawPile,
}: GameLoop) => {
  const delta = event!.turnEndedDelta;

  playArea.clear();
  banks[0].processDelta(delta.banks[0]);
  banks[1].processDelta(delta.banks[1]);
  discardPile.processDelta(delta.discardPile);
  drawPile.processDelta(delta.drawPile);
};
