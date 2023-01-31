import GameLoop from "../GameLoop";
import { CardPlayedEffectResponse, Effect } from "../types";

export default (effect: Effect, game: GameLoop): CardPlayedEffectResponse => {
  let card = effect.cards[0];
  const possibleCards = effect.cards.filter(
    (card) => !game.playArea.contains(card.suit)
  );

  if (possibleCards.length > 0) {
    card = possibleCards.sort((cardA, cardB) => {
      return cardA.value - game.myBank.findHighestValue(cardA.suit) >
        cardB.value - game.myBank.findHighestValue(cardB.suit)
        ? 1
        : -1;
    })[0];
  }

  return {
    etype: "ResponseToEffect",
    effect: {
      effectType: "Map",
      card,
    },
  };
};
