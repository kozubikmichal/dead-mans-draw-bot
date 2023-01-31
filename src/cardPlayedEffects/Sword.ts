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

  // search non-busting cards -> Oracle / Mermaid / highest
  // otherwise pick the highest card in opponent's hand (if any)
  const card =
    nonBustingCards.findHighest("Oracle") ||
    nonBustingCards.findHighest("Mermaid") ||
    nonBustingCards.findHighestAny() ||
    opponentBank.findHighestAny() ||
    null;

  return {
    etype: "ResponseToEffect",
    effect: {
      effectType: "Sword",
      card,
    },
  };
};
