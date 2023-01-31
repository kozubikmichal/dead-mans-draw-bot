import CardPlacedToPlayArea from "./events/CardPlacedToPlayArea";
import CardPlayedEffect from "./events/CardPlayedEffect";
import CardRemovedFromBank from "./events/CardRemovedFromBank";
import TurnEnded from "./events/TurnEnded";
import { EventType, GameLoop } from "./types";

const noop = () => {};

const events: { [key in EventType]: Function } = {
  CardPlacedToPlayArea,
  CardPlayedEffect,
  CardRemovedFromBank,
  TurnEnded,
  MatchStarted: noop,
  TurnStarted: noop,
  Draw: noop,
  ResponseToEffect: noop,
  MatchEnded: noop,
  Comment: noop,
};

export default (game: GameLoop) => {
  return events[game.event!.eventType]?.(game);
};
