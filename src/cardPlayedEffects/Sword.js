/**
Steal the top card from any other player’s
Suit Stack, and place the stolen card in the
Play Area. You must choose a Suit Stack of an
opponent that you do not have in your own
Bank, even if the chosen card will cause you
to Bust.
 */

// strategy: check Oracle, check Marmaid, then pick random

export default ({ playArea, banks }) => {
  const bank = banks[0];
  const myBank = banks[1];
  let card = null;

  if (
    !playArea.contains("Oracle") &&
    !myBank.contains("Oracle") &&
    bank.contains("Oracle")
  ) {
    card = bank.findHighest("Oracle");
  } else if (
    !playArea.contains("Marmaid") &&
    myBank.contains("Marmaid") &&
    bank.contains("Marmaid")
  ) {
    card = bank.findHighest("Marmaid");
  } else {
    card =
      bank.cards.find(
        (bankCard) =>
          !playArea.contains(bankCard.suit) && !myBank.contains(bankCard.suit)
      ) || enemyBoard.cards[0];
  }

  return {
    etype: "ResponseToEffect",
    effect: {
      effectType: "Sword",
      card,
    },
  };
};
