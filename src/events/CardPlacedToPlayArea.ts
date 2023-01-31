import GameLoop from "../types";

export default ({ event, playArea }: GameLoop) => {
  playArea.add(event!.cardPlacedToPlayAreaCard);
};
