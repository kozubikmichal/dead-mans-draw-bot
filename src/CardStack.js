export default class CardStack {
  constructor() {
    this.cards = [];
  }

  add(item) {
    this.cards = this.cards.concat(item);
  }

  remove(item) {
    this.cards = this.cards.filter(
      (cardItem) =>
        !(cardItem.suit === item.suit && cardItem.value === item.value)
    );
  }

  findHighest(suit) {
    let result = null;

    this.cards.forEach((item) => {
      if (item.suit === suit && item.value > result?.value) {
        result = item;
      }
    });

    return result;
  }

  findHighestAny() {
    let result = this.cards[0];

    this.cards.forEach((item) => {
      if (item.value > result.value) {
        result = item;
      }
    });

    return result;
  }

  removeHighest(suit) {
    const item = this.findHighest(suit);

    if (item) {
      this.remove(item);
    }
  }

  contains(suit) {
    return this.cards.find((item) => item.suit === suit);
  }

  processDelta({ added, removed }) {
    (removed || []).forEach((card) => this.remove(card));
    (added || []).forEach((card) => this.add(card));
  }

  clear() {
    this.cards = [];
  }
}
