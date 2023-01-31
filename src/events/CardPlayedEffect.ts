import cardPlayedEffect from "../cardPlayedEffect";
import GameLoop from "../types";

export default (game: GameLoop) => {
  game.effect = game.event!.cardPlayedEffect;
  cardPlayedEffect(game);
};
