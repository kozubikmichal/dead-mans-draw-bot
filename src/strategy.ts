import GameLoop from "./GameLoop";

export const shouldEndTurn = (game: GameLoop): boolean => {
  /**
   * IF last card is anchor (= everything before that is protected)
   * AND playArea has less than 8 cards (= quite a chance of not getting busted)
   * THEN do not end
   */
  if (
    game.playArea.getLastCard()?.suit === "Anchor" &&
    game.playArea.cards.length < 8
  ) {
    return false;
  }

  return Math.random() * 10 < 3;
};
