/**
Reveals the next card on top of the Draw Pile.
Example: Eliza places an Oracle into the Play
Area and flips over the top card of the Draw
Pile. She may decide to place the revealed card
into the Play Area, or flip the card back over
and leave it on top of the Draw Pile, choos
-
ing to Collect instead. If the Oracle is the last
card in the Draw Pile, the ability is nullified.
 */

/**
 * strategy: pick the card, only if it will not bust
 */

import GameLoop, { CardPlayedEffectResponse, Effect } from "../types";

export default (effect: Effect, game: GameLoop): CardPlayedEffectResponse => {
  const topCard = effect.cards[0];
  const wouldBust = game.playArea.contains(topCard.suit);
  const card = wouldBust ? null : topCard;
  game.mustEndTurn = true;

  return {
    etype: "ResponseToEffect",
    effect: {
      effectType: "Oracle",
      card,
    },
  };
};
