import GameLoop, { Event } from "../types";

export default (event: Event, game: GameLoop) => {
  game.playArea.add(event.cardPlacedToPlayAreaCard);
  game.mustDraw--;
};
