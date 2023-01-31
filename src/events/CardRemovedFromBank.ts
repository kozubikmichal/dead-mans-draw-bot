import { GameLoop } from "../types";

export default ({ event, banks }: GameLoop) => {
  banks[event!.cardRemovedFromBankIndex].remove(event!.cardRemovedFromBankCard);
};
