import GameLoop from "../GameLoop";
import { CardPlayedEffectResponse } from "../types";

export default (game: GameLoop): CardPlayedEffectResponse => {
  const myBank = game.banks[0];
  let card = game.effect!.cards[0];
  const possibleCards = game.effect!.cards.filter(
    (card) => !game.playArea.contains(card.suit)
  );

  if (possibleCards.length > 0) {
    card = possibleCards.sort((cardA, cardB) => {
      return (
        cardA.value -
        myBank.findHighestValue(cardA.suit) -
        (cardB.value - myBank.findHighestValue(cardB.suit))
      );
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
