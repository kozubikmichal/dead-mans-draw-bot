/**
Choose the top card from any Suit Stack
in your Bank and place it into the Play
Area. You MUST play a card from one of
your Suit Stacks even if the only available
card will cause a Bust. If your turn ends in
a Bust, you will not recover your card that
was moved to the Play Area by the Hook.
It is discarded with the rest of the cards. If
you do not have any cards in your Bank,
this Suit Ability is nullified.
 */

import CardStack from "../CardStack";
import GameLoop from "../GameLoop";
import Responses from "../responses";
import { CardPlayedEffectResponse, Effect } from "../types";

export default (effect: Effect, game: GameLoop): CardPlayedEffectResponse => {
  const nonBustingCards = new CardStack(
    game.myBank.cards.filter((card) => !game.playArea.contains(card.suit))
  );

  if (nonBustingCards.cards.length === 0) {
    return Responses.AutoPickResponseToEffect();
  }

  const card =
    nonBustingCards.findHighest("Oracle") ||
    nonBustingCards.findHighest("Anchor") ||
    nonBustingCards.findHighestAny();

  return Responses.ResponseToEffect("Hook", card);
};
