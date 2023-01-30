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
