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
  let card: Card | null = null;
  const { playArea, myBank, opponentBank } = game;
  const possibleCards = new CardStack(
    opponentBank.cards.filter((card) => !myBank.contains(card.suit))
  );

  if (!playArea.contains("Oracle") && possibleCards.contains("Oracle")) {
    card = possibleCards.findHighest("Oracle");
  } else if (
    !playArea.contains("Mermaid") &&
    possibleCards.contains("Mermaid")
  ) {
    card = possibleCards.findHighest("Mermaid");
  } else {
    card =
      possibleCards.cards.find(
        (bankCard) => !playArea.contains(bankCard.suit)
      ) || possibleCards.cards[0];

    card = possibleCards.findHighest(card.suit);
  }

  return {
    etype: "ResponseToEffect",
    effect: {
      effectType: "Sword",
      card,
    },
  };
};
