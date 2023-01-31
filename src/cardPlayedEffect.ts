import Oracle from "./cardPlayedEffects/Oracle";
import Sword from "./cardPlayedEffects/Sword";
import Cannon from "./cardPlayedEffects/Cannon";
import Map from "./cardPlayedEffects/Map";
import GameLoop, { CardPlayedEffectResponse, Suit } from "./types";

const noop = (effectType: Suit) => () =>
  ({
    etype: "ResponseToEffect",
    effect: {
      effectType,
      card: null,
      autopick: true,
    },
  } as CardPlayedEffectResponse);

const effects: { [key in Suit]: (game: GameLoop) => CardPlayedEffectResponse } =
  {
    Oracle: Oracle,
    Sword,
    Cannon,
    Map,
    Anchor: noop("Anchor"),
    Chest: noop("Chest"),
    Hook: noop("Hook"),
    Key: noop("Key"),
    Kraken: noop("Kraken"),
    Mermaid: noop("Mermaid"),
  };

export default (game: GameLoop): CardPlayedEffectResponse => {
  return effects[game.effect!.effectType](game);
};
