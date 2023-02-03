import CardStack from "./CardStack";
import GameLoop from "./GameLoop";
import { limits } from "./limits";
import { Card } from "./types";
import { numberOf, percent, SuitList } from "./utils";

// the higher the safer, 0 - 1
const NON_BUSTING_CHANCE_THRESHOLD = 0.1;

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

const evaluateBustRiskCard = (card: Card, drawPile: CardStack) => {
  const { suit } = card
  return drawPile.getCountWithSuit(suit) / drawPile.cards.length;
}

export const evaluateBustRisk = (cards: Card[], drawPile: CardStack) => {
  return cards.reduce((prev, curr) => prev + evaluateBustRiskCard(curr, drawPile), 0);
}

export const evaluateProfit = (playArea: CardStack, myHand: CardStack, drawPile: CardStack) => {
  return playArea.cards.reduce((profit, card) => profit + card.value - (myHand.findHighest(card.suit)?.value ?? 0), 0)
}

export const evaluateCard = ({ suit, value }, myBank, opponentHand) => {
  const differenceNow = myBank[suit][0] ?? 0 - opponentHand[suit][0];
  const differencePossible = value - opponentHand[suit];
  const profit = differencePossible - differenceNow
  return Math.max(0, profit);
}



export const shouldEndTurn = (game: GameLoop): boolean => {
  const profit = evaluateProfit(game.playArea, game.myBank, game.drawPile);
  const risk = evaluateBustRisk(game.playArea.cards, game.drawPile)

  // Magic
  if (risk <= 0) {
    return true
  }
  const profitToRisk = profit / risk;
  game.logs[game.turn].push({ risk, profitToRisk, profit })

  const minimalProfitToRiskLimit = limits[game.turn].profitToRisk - limits[game.turn].profitToRisk * NON_BUSTING_CHANCE_THRESHOLD;

  if (isCoveredByAnchor(game))
    return false;

  if (profitToRisk > minimalProfitToRiskLimit) {
    game.logs[game.turn].push({ endTurn: true } as any)
    return true;
  }

  return false
};
