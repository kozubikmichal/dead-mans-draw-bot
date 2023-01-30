import CardPlacedToPlayArea from "./events/CardPlacedToPlayArea";
import CardPlayedEffect from "./events/CardPlayedEffect";
import CardRemovedFromBank from "./events/CardRemovedFromBank";
import TurnEnded from "./events/TurnEnded";

const events = {
  CardPlacedToPlayArea,
  CardPlayedEffect,
  CardRemovedFromBank,
  TurnEnded: TurnEnded,
};

export default ({ event, playArea, banks }) => {
  return events[event.eventType]?.({ event, playArea, banks });
};
