export default ({ event, banks }) => {
  banks[event.cardRemovedFromBankIndex].remove(event.cardRemovedFromBankCard);
};
