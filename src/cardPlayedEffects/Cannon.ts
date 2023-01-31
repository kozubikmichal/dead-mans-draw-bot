/**
  	Place the top card of a Suit Stack from any
	other player’s Bank into the Discard Pile.
	If there are not any cards in any opponent’s Bank, this Suit Ability is nullified.
 */

/**
 * strategy: remove the highest card on opponents hand
 */

import GameLoop, { CardPlayedEffectResponse, Effect } from "../types";

export default (
  effect: Effect,
  { opponentBank }: GameLoop
): CardPlayedEffectResponse => {
  const card = opponentBank.findHighestAny();

  return {
    etype: "ResponseToEffect",
    effect: {
      effectType: "Cannon",
      card,
    },
  };
};
