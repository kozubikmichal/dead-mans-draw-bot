import Oracle from "./cardPlayedEffects/Oracle";
import Sword from "./cardPlayedEffects/Sword";
import Cannon from "./cardPlayedEffects/Cannon";
import Map from "./cardPlayedEffects/Map";
import GameLoop, { CardPlayedEffectResponse, Effect, Suit } from "./types";
import Kraken from "./cardPlayedEffects/Kraken";
import Responses from "./responses";

const noop = (effectType: Suit) => () => Responses.AutoPickResponseToEffect();

const handlers: {
  [key in Suit]: (
    effect: Effect,
    game: GameLoop
  ) => CardPlayedEffectResponse | any;
} = {
  Oracle: Oracle,
  Sword,
  Cannon,
  Map,
  Kraken,
  Anchor: noop("Anchor"),
  Chest: noop("Chest"),
  Hook: noop("Hook"),
  Key: noop("Key"),
  Mermaid: noop("Mermaid"),
};

export default (
  effect: Effect,
  game: GameLoop
): CardPlayedEffectResponse | any => {
  return handlers[effect.effectType](effect, game);
};
