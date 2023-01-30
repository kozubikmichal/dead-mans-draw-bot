export default ({ effect, playArea }) => {
  const topCard = effect.cards[0];
  const wouldBust = playArea.contains(topCard.suite);
  const card = wouldBust ? null : topCard;

  return {
    etype: "ResponseToEffect",
    effect: {
      effectType: "Oracle",
      card,
    },
  };
};
