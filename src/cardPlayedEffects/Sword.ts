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

import { Card, CardPlayedEffectResponse, GameLoop } from "../types";

export default ({ playArea, banks }: GameLoop): CardPlayedEffectResponse => {
  const opponentBank = banks[0];
  const myBank = banks[1];
  let card: Card | null = null;

  if (
    !playArea.contains("Oracle") &&
    !myBank.contains("Oracle") &&
    opponentBank.contains("Oracle")
  ) {
    card = opponentBank.findHighest("Oracle");
  } else if (
    !playArea.contains("Mermaid") &&
    myBank.contains("Mermaid") &&
    opponentBank.contains("Mermaid")
  ) {
    card = opponentBank.findHighest("Mermaid");
  } else {
    card =
      opponentBank.cards.find(
        (bankCard) =>
          !playArea.contains(bankCard.suit) && !myBank.contains(bankCard.suit)
      ) || opponentBank.cards[0];
  }

  return {
    etype: "ResponseToEffect",
    effect: {
      effectType: "Sword",
      card,
    },
  };
};
