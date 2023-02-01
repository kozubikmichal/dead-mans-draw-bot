import CardStack from "./CardStack";
import { initialDiscardPile, initialDrawPile } from "./generators/pile";
import Responses from "./responses";
import { shouldEndTurn } from "./strategy";
import { BankState, Card, Match, Suit } from "./types";

const bankFromState = (state: BankState) => {
  const cards: Card[] = [];

  const x = Object.keys(state).forEach((suit) => {
    state[suit].forEach((value) =>
      cards.push({
        suit: suit as Suit,
        value,
      })
    );
  });

  return new CardStack(cards);
};

export default class GameLoop {
  playArea: CardStack;
  banks: CardStack[];
  discardPile = new CardStack();
  drawPile = new CardStack();
  myBank!: CardStack;
  opponentBank!: CardStack;

  mustDraw = 0;
  mustEndTurn = false;

  drawPileSize = 50;
  discardPileSize = 0;

  constructor(myIndex: number, match: Match) {
    this.playArea = new CardStack(match.state.playArea);
    this.banks = [
      bankFromState(match.state.banks[0]),
      bankFromState(match.state.banks[1]),
    ];

    this.myBank = this.banks[myIndex];
    this.opponentBank = this.banks[1 - myIndex];
    this.drawPileSize = match.drawPileSize;
    this.discardPileSize = match.discardPileSize;

    this.drawPile = initialDrawPile();
    this.discardPile = initialDiscardPile();
  }

  reset() {
    this.playArea.clear();
    this.banks.forEach((bank) => bank.clear());
    this.discardPile.clear();
    this.drawPile.clear();
  }

  nextAction() {
    if (this.mustDraw > 0) {
      return Responses.Draw();
    }
    if (this.mustEndTurn) {
      this.mustEndTurn = false;
      return Responses.EndTurn();
    }

    return shouldEndTurn(this) ? Responses.EndTurn() : Responses.Draw();
  }
}
