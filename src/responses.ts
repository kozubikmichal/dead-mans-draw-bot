import { Card, Suit } from "./types";

type BotResponse = {
  etype: "Draw" | "ResponseToEffect" | "EndTurn";
  autopick?: boolean;
  effect?: {
    effectType: Suit;
    card: Card | null;
  };
};

const Responses = {
  Draw: (autopick?: boolean): BotResponse => ({
    etype: "Draw",
    autopick,
  }),

  EndTurn: (autopick?: boolean): BotResponse => ({
    etype: "EndTurn",
    autopick,
  }),

  ResponseToEffect: (effectType: Suit, card: Card | null): BotResponse => ({
    etype: "ResponseToEffect",
    effect: {
      effectType,
      card,
    },
  }),

  AutoPickResponseToEffect: (): BotResponse => ({
    etype: "ResponseToEffect",
    autopick: true,
  }),
};

export default Responses;
