import CardStack from "./CardStack";
import Responses from "./responses";
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

  constructor(myIndex: number, match: Match) {
    this.playArea = new CardStack(match.state.playArea);
    this.banks = [
      bankFromState(match.state.banks[0]),
      bankFromState(match.state.banks[1]),
    ];

    this.myBank = this.banks[myIndex];
    this.opponentBank = this.banks[1 - myIndex];
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
    if (
      this.playArea.getLastCard()?.suit === "Anchor" &&
      this.playArea.cards.length < 8
    ) {
      return Responses.Draw();
    }

    if (Math.random() * 10 < 3) {
      return Responses.EndTurn();
    }

    return Responses.Draw();
  }
}
