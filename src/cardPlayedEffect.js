import Oracle from "./cardPlayedEffects/Oracle";
import Sword from "./cardPlayedEffects/Sword";
import Cannon from "./cardPlayedEffects/Cannon";

const effects = {
  Oracle,
  Sword,
  Cannon,
};

export default ({ effect, playArea, banks }) => {
  return effects[effect.effectType]({ effect, playArea, banks });
};
