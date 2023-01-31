/**
Steal the top card from any other player’s
Suit Stack, and place the stolen card in the
Play Area. You must choose a Suit Stack of an
opponent that you do not have in your own
Bank, even if the chosen card will cause you
to Bust.
 */

/**
 * strategy: check Oracle, check Mermaid, then pick random
 */

import CardStack from "../CardStack";
import GameLoop, { Card, CardPlayedEffectResponse, Effect } from "../types";

export default (effect: Effect, game: GameLoop): CardPlayedEffectResponse => {
  const { playArea, myBank, opponentBank } = game;

  const possibleCards = new CardStack(
    opponentBank.cards.filter((card) => !myBank.contains(card.suit))
  );

  const nonBustingCards = new CardStack(
    possibleCards.cards.filter((card) => !playArea.contains(card.suit))
  );

  let card: Card | null = null;

  if (nonBustingCards.cards.length === 0) {
    card = new CardStack(possibleCards.cards).findHighestAny()
  } else {
    // search non-busting cards -> Oracle / Mermaid / highest
    // otherwise pick the highest card in opponent's hand (if any)
    // Evgenii's note: you can not pick any from opponents hand, only from possibles
    card =
      nonBustingCards.findHighest("Oracle") ||
      nonBustingCards.findHighest("Mermaid") ||
      nonBustingCards.findHighestAny() ||
      null;

  }

  return {
    etype: "ResponseToEffect",
    effect: {
      effectType: "Sword",
      card,
    },
  };
};
