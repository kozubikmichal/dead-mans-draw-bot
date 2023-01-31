import CardPlacedToPlayArea from "./events/CardPlacedToPlayArea";
import CardPlayedEffect from "./events/CardPlayedEffect";
import CardRemovedFromBank from "./events/CardRemovedFromBank";
import MatchEnded from "./events/MatchEnded";
import TurnEnded from "./events/TurnEnded";
import GameLoop, { EventType, Event } from "./types";

const noop = () => {};

const handlers: { [key in EventType]: Function } = {
  CardPlacedToPlayArea,
  CardPlayedEffect,
  CardRemovedFromBank,
  TurnEnded,
  MatchEnded,
  MatchStarted: noop,
  TurnStarted: noop,
  Draw: noop,
  ResponseToEffect: noop,
  Comment: noop,
};

const handler = (event: Event, game: GameLoop) => {
  return handlers[event.eventType]?.(event, game);
};

export const processEvents = (
  lastMoveResult: Event[],
  game: GameLoop
): null | object => {
  let response = null;

  lastMoveResult.forEach((event) => {
    response = handler(event, game);
  });

  return response || game.nextAction();
};
