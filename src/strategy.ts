import GameLoop from "./GameLoop";
import { numberOf, percent, SuitList } from "./utils";

// the higher the safer, 0 - 100
const NON_BUSTING_CHANCE_THRESHOLD = 60;

// the higher the safer, 1 - 10
const PLAY_SAFE_FACTOR = 5;

const isCoveredByAnchor = (game: GameLoop) =>
  game.playArea.getLastCard()?.suit === "Anchor" &&
  game.playArea.cards.length < 8;

const hasHighNonBustingChance = (game: GameLoop) => {
  // Check what cards are not in playArea yet
  const nonBustingSuits = SuitList.filter(
    (suit) => !game.playArea.contains(suit)
  );

  const nonBustingSuitsWithCount = nonBustingSuits
    // Calculate count of every suit in drawPile
    .map((suit) => ({
      suit,
      count: numberOf(suit, game.drawPile),
    }));

  const totalNonBustingCards = nonBustingSuitsWithCount.reduce(
    (sum, item) => sum + item.count,
    0
  );

  // get total chance of getting non-busting card
  const nonBustingChance = percent(
    game.drawPile.cards.length,
    totalNonBustingCards
  );

  return nonBustingChance > NON_BUSTING_CHANCE_THRESHOLD;
};

export const shouldEndTurn = (game: GameLoop): boolean => {
  /**
   * IF last card is anchor (= everything before that is protected)
   * AND playArea has less than 8 cards (= quite a chance of not getting busted)
   * THEN do not end
   */
  if (isCoveredByAnchor(game) || hasHighNonBustingChance(game)) {
    return false;
  }

  return Math.random() * 10 < PLAY_SAFE_FACTOR;
};
