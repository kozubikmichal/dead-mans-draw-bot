import cardPlayedEffect from "../cardPlayedEffect";
import { GameLoop } from "../types";

export default (game: GameLoop) =>
  cardPlayedEffect({ ...game, effect: game.event!.cardPlayedEffect });
