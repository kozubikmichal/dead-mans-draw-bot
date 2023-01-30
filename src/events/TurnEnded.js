export default ({ event, playArea, banks, discardPile, drawPile }) => {
  playArea.clear();
  banks[0].processDelta(event.turnEndedDelta.banks[0]);
  banks[1].processDelta(event.turnEndedDelta.banks[1]);
  discardPile.processDelta(event.turnEndedDelta.discardPile);
  drawPile.processDelta(event.turnEndedDelta.drawPile);
};
