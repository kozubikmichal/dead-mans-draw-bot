import cardPlayedEffect from "../cardPlayedEffect";
import GameLoop, { Event } from "../types";

export default (event: Event, game: GameLoop) =>
  cardPlayedEffect(event.cardPlayedEffect, game);
