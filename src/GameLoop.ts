import CardStack from "./CardStack";
import { Effect, Event } from "./types";

export default class GameLoop {
  playArea = new CardStack();
  banks = [new CardStack(), new CardStack()];
  discardPile = new CardStack();
  drawPile = new CardStack();
  event?: Event;
  effect?: Effect;

  reset() {
    this.playArea.clear();
    this.banks.forEach((bank) => bank.clear());
    this.discardPile.clear();
    this.drawPile.clear();
    this.event = undefined;
    this.effect = undefined;
  }
}
