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
