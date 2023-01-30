/**
  	Place the top card of a Suit Stack from any
	other player’s Bank into the Discard Pile.
	If there are not any cards in any opponent’s Bank, this Suit Ability is nullified.
 */

// Strategy: remove the highest card on opponents hand

export default ({ banks }) => {
  const bank = banks[0];
  const card = bank.findHighestAny();

  return {
    etype: "ResponseToEffect",
    effect: {
      effectType: "Cannon",
      card,
    },
  };
};
