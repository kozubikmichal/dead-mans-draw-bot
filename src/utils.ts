import CardStack from "./CardStack";
import { Suit } from "./types";

export const SuitList = [
  "Anchor",
  "Cannon",
  "Chest",
  "Hook",
  "Key",
  "Kraken",
  "Map",
  "Mermaid",
  "Oracle",
  "Sword",
] as Suit[];

export const percent = (total: number, count: number) =>
  total > 0 ? (count / total) * 100 : 0;

export const numberOf = (suit: Suit, deck: CardStack) =>
  deck.cards.filter((card) => card.suit === suit).length;

export const chanceOf = (suit: Suit, deck: CardStack) =>
  percent(deck.cards.length, numberOf(suit, deck));
