/**
		Place the top card of a Suit Stack from any
	other player’s Bank into the Discard Pile.
	If there are not any cards in any opponent’s Bank, this Suit Ability is nullified.
 */

/**
 * strategy: remove the highest card on opponents hand
 */

import Responses from "../responses";
import GameLoop, { CardPlayedEffectResponse, Effect } from "../types";

export default (effect: Effect, game: GameLoop): CardPlayedEffectResponse => {
	let card = game.opponentBank.findHighestAny();

	// we have to do that............... what a pity
	if (!card) card = game.myBank.findHighestAny()

	return Responses.ResponseToEffect("Cannon", card);
};
