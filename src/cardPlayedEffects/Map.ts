/**
Shuffle the Discard Pile and reveal three
cards from the Discard Pile. You must place
one card in the Play Area, even if this causes
a Bust. If there are cards in the Discard Pile
when the Map is drawn, the ability is nullified.
If there are less than three cards, draw the re
-
maining cards.
 */

import GameLoop from "../GameLoop";
import Responses from "../responses";
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
        ? -1
        : 1;
    })[0];
  }

  return Responses.ResponseToEffect("Map", card);
};
