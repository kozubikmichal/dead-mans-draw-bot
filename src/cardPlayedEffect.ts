import Oracle from "./cardPlayedEffects/Oracle";
import Sword from "./cardPlayedEffects/Sword";
import Cannon from "./cardPlayedEffects/Cannon";
import GameLoop, { CardPlayedEffectResponse, Suit } from "./types";

const noop = () => {};

const effects: { [key in Suit]: Function } = {
  Oracle,
  Sword,
  Cannon,
  Anchor: noop,
  Chest: noop,
  Hook: noop,
  Key: noop,
  Kraken: noop,
  Map: noop,
  Mermaid: noop,
};

export default (game: GameLoop): CardPlayedEffectResponse => {
  return effects[game.effect!.effectType](game);
};
