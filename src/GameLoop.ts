import CardStack from "./CardStack";
import { BankState, Card, Match, Suit } from "./types";

const Draw = {
  etype: "Draw",
};

const EndTurn = {
  etype: "EndTurn",
  autopick: true,
};

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
  myIndex: number;

  mustDraw = 0;

  constructor(myId: string, match: Match) {
    this.myIndex = match.playerids.indexOf(myId);

    this.playArea = new CardStack(match.state.playArea);
    this.banks = [
      bankFromState(match.state.banks[0]),
      bankFromState(match.state.banks[1]),
    ];

    this.myBank = this.banks[this.myIndex];
    this.opponentBank = this.banks[1 - this.myIndex];
  }

  reset() {
    this.playArea.clear();
    this.banks.forEach((bank) => bank.clear());
    this.discardPile.clear();
    this.drawPile.clear();
  }

  nextAction() {
    if (this.mustDraw > 0) {
      return Draw;
    }
    if (
      this.playArea.getLastCard()?.suit === "Anchor" &&
      this.playArea.cards.length < 8
    ) {
      return Draw;
    }

    if (Math.random() * 10 < 3) {
      return EndTurn;
    }

    return Draw;
  }
}
