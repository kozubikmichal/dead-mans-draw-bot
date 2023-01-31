import { Card, Suit } from "./types";

export default class CardStack {
  cards: Card[] = [];

  constructor(cards: Card[] = []) {
    this.cards = cards;
  }

  add(card: Card): void {
    this.cards = this.cards.concat(card);
  }

  remove(card: Card): void {
    this.cards = this.cards.filter(
      (item) => !(item.suit === card.suit && item.value === card.value)
    );
  }

  findHighest(suit: Suit): Card | null {
    let result: Card | null = null;

    this.cards.forEach((item) => {
      if (item.suit === suit && item.value > (result?.value || 0)) {
        result = item;
      }
    });

    return result;
  }

  findHighestValue(suit: Suit): number {
    return this.findHighest(suit)?.value || 0;
  }

  findHighestAny(): Card | null {
    let result = this.cards[0];

    this.cards.forEach((item) => {
      if (item.value > result.value) {
        result = item;
      }
    });

    return result;
  }

  removeHighest(suit: Suit): void {
    const item = this.findHighest(suit);

    if (item) {
      this.remove(item);
    }
  }

  contains(suit: Suit): boolean {
    return Boolean(this.cards.find((item) => item.suit === suit));
  }

  containsCard(card: Card): boolean {
    return Boolean(
      this.cards.find(
        (item) => item.suit === card.suit && item.value === card.value
      )
    );
  }

  processDelta({ added, removed }: { added?: Card[]; removed?: Card[] }) {
    (removed || []).forEach((card) => this.remove(card));
    (added || [])
      .filter((card) => !this.containsCard(card))
      .forEach((card) => this.add(card));
  }

  clear() {
    this.cards = [];
  }

  getLastCard(): Card | undefined {
    return this.cards[this.cards.length - 1];
  }
}
