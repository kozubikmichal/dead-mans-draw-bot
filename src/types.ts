export { default } from "./GameLoop";

export type Suit =
  | "Anchor"
  | "Cannon"
  | "Chest"
  | "Hook"
  | "Key"
  | "Kraken"
  | "Map"
  | "Mermaid"
  | "Oracle"
  | "Sword";

export type EventType =
  | "MatchStarted"
  | "TurnStarted"
  | "Draw"
  | "CardPlayedEffect"
  | "ResponseToEffect"
  | "CardPlacedToPlayArea"
  | "CardRemovedFromBank"
  | "TurnEnded"
  | "MatchEnded"
  | "Comment";

export type Card = {
  suit: Suit;
  value: number;
};

export type Effect = {
  effectType: Suit;
  cards: Card[];
  [key: string]: any;
};

export type Delta = {
  added?: Card[];
  removed?: Card[];
};

export type Event = {
  eventType: EventType;
  cardPlacedToPlayAreaCard: Card;
  cardPlayedEffect: Effect;
  cardRemovedFromBankIndex: number;
  cardRemovedFromBankCard: Card;
  turnEndedDelta: {
    banks: Delta[];
    discardPile: Delta;
    drawPile: Delta;
  };
};

export type CardPlayedEffectResponse = {
  etype: "ResponseToEffect";
  effect: {
    effectType: Suit;
    card: Card | null;
  };
};
