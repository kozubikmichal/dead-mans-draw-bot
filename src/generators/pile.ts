import CardStack from "../CardStack";
import { Card, Suit } from "../types";
import { SuitList } from "../utils";

const pile = (suits: Suit[], values: number[]) => {
  const cards: Card[] = [];

  suits.forEach((suit) => {
    values.forEach((value) => {
      cards.push({
        suit,
        value: suit === "Mermaid" ? value + 2 : value,
      });
    });
  });

  return new CardStack(cards);
};

export const initialDiscardPile = () => pile(SuitList, [2]);
export const initialDrawPile = () => pile(SuitList, [3, 4, 5, 6, 7]);
