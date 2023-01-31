import GameLoop, { Event } from "../types";

export default (event: Event, { playArea }: GameLoop) => {
  playArea.add(event.cardPlacedToPlayAreaCard);
};
