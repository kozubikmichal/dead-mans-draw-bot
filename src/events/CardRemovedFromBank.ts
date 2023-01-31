import GameLoop, { Event } from "../types";

export default (event: Event, game: GameLoop) => {
  game.banks[event.cardRemovedFromBankIndex].remove(
    event.cardRemovedFromBankCard
  );
  if (event.cardRemovedFromBankIndex === game.myIndex) {
    game.mustDraw--;
  }
};
