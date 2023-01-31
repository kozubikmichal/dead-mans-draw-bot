import cardPlayedEffect from "./src/cardPlayedEffect";
import { processEvents } from "./src/events";
import GameLoop from "./src/GameLoop";
require('dotenv').config()

console.log = () => process.stdout.write(".");

var Spc22Arena = require("spc22_arena");
const pressAnyKey = require("press-any-key");
const params = require("yargs")
  .option("u", {
    alias: "username",
    demandOption: false,
    default: process.env.USERNAME,
    type: "string",
  })
  .option("p", {
    alias: "password",
    demandOption: false,
    default: process.env.PASSWORD,
    type: "string",
  })
  .option("m", {
    alias: "matchid",
    demandOption: false,
    type: "string",
  })
  .option("wait", {
    alias: "w",
    demandOption: false,
    type: "boolean",
  })
  .help().argv;

console.log("input params: ", params);

const defaultClient = Spc22Arena.ApiClient.instance;
//defaultClient.basePath = "http://localhost:8080";
defaultClient.basePath = "https://slhpc2023.appspot.com/";
console.log(`Using server: ${defaultClient.basePath}`);

// Configure HTTP basic authorization: basic
const basic = defaultClient.authentications["basic"];
basic.username = params.username;
basic.password = params.password;

console.log(`Playing as user: ${basic.username}.\n`);

require("util").inspect.defaultOptions.depth = null;
const _matcheventyypes = new Spc22Arena.MatchEventType();

async function main(matchid) {
  console.log(await getHello());

  if (matchid) {
    //-- using matchid from the param to play with
    const match = await get_match_by_id(matchid);
    await play_a_match(match);
  } else {
    //-- continue in a loop: wait for a match and play that match
    while (true) {
      //-- receive match to play with
      const match = await wait_for_active_match();
      //-- play with the match
      await play_a_match(match);
    }
  }
}
new Promise(async () => main(params.matchid)).then();

async function getHello() {
  var api = new Spc22Arena.DiagnosticApi();
  //api.getAuthenticatedUser().then(console.log);
  const response = await api.getMessage();
  return response?.message;
}

async function get_match_by_id(matchid) {
  var gameapi = new Spc22Arena.GameApi();

  const retval = await gameapi.getMatch(matchid);
  return retval;
}

export async function wait_for_active_match() {
  var gameapi = new Spc22Arena.GameApi();
  var opts = { at: "today", wait: "1", active: "1" };

  let matches: null | any[] = null;
  console.log(
    `\n${"=".repeat(80)}\nWaiting for matches where player ${basic.username
    } is active...`
  );
  while (!(Array.isArray(matches) && matches?.length > 0)) {
    matches = await gameapi.getMatches(opts);
  } //-- end:WAITMATCH

  if (Array.isArray(matches)) {
    //NOTE: what to do when there are multiple matches available - now: just pick first and play with it
    const picked_match = matches[0];
    return picked_match;
  }
}

function move_has_event(move, targetEventType) {
  try {
    return move?.find((item) => item?.eventType == targetEventType);
  } catch {
    console.log(move);
  }
}

async function play_a_match(match) {
  const matchid = match._id?.toString();
  console.log(`Using ${matchid} for the game`);

  var gameapi = new Spc22Arena.GameApi();
  //-- MATCH: Repeat turns as slong as possible
  let turncount = 0;
  let isMatchRunning = true;
  let lastmove = undefined;
  let myIndex = match.playerids.indexOf(basic.username);
  let gameLoop = new GameLoop(myIndex, match);

  let pendingEffect =
    match.state.currentPlayerIndex === myIndex && match.state.pendingEffect;


  console.log(match);
  console.log(gameLoop.myBank, gameLoop.opponentBank, gameLoop.playArea);
  // await pressAnyKey().then();

  // console.log("match", match);

  while (isMatchRunning) {
    //-- guard match ended
    if (move_has_event(lastmove, _matcheventyypes.MatchEnded)) {
      console.log("Match has ended");
      isMatchRunning = false;
      break;
    }

    console.info(
      `\n=== TURN #${++turncount} ==================================`
    );
    //-- TURN: Draw a few cards

    const Draw = { etype: "Draw", autopick: true };
    let useraction: any = Draw;

    while (isMatchRunning) {
      let opts = { wait: "1" };
      //opts = { autopick: "all" };


      if (pendingEffect) {
        console.log('pendingEffect: ', pendingEffect);
        useraction =
          cardPlayedEffect(match.state.pendingEffect, gameLoop) || Draw;
        pendingEffect = null;
      }

      try {
        console.log("myBank", gameLoop.myBank);
        console.log("opponentBank", gameLoop.opponentBank);
        console.log("mustDraw", gameLoop.mustDraw);
        console.log("sending", useraction);
        if (params.wait) await pressAnyKey().then(); //'Press any key to continue...'
        console.info("BOT Action: ", useraction.etype);

        // NOTE: Here I choose to perform a "draw of card" whatever happens in the meantime,
        // for this I call the executeActionForMatch API call (POST /api/matches) and implement the long-polling wait there with 200/409 status.
        // NOTE: Another feasible choice is to call the getMatch with waitactive=true parameter (GET /api/matches/<matchid>?waitactive=true) and implement the long-polling wait there with 200/409 status
        // whis would enable you to first check what the other player has done, the execute the drawing of card
        let doRetryDrawMove = true;
        //-- DRAW: successful carddraw
        while (doRetryDrawMove) {
          lastmove = await gameapi
            .executeActionForMatch(matchid, useraction, opts)
            .then((result) => {
              console.log(JSON.stringify(result, null, 2));
              doRetryDrawMove = false; //-- successfully drawn card
              return result;
            })
            .catch((err) => {
              //if (err?.status === 409) continue; // 409 - wait and continue
              if (err?.status === 409) {
                console.log(
                  "... I am still not the current player - retrying the move"
                );
                return err;
              } else {
                throw err;
              }
            });
        } //-- end:DRAW

        useraction = processEvents(lastmove as any, gameLoop);

        //-- check whether turn has ended by itself (bust or matchend)
        if (move_has_event(lastmove, _matcheventyypes.TurnEnded)) break;
        if (move_has_event(lastmove, _matcheventyypes.MatchEnded)) {
          isMatchRunning = false;
          break;
        }

        //-- based on a random factor we might initiate ending the turn - this is where you need to make it much smarter :)
        // if (Math.random() * 10 < 3) {
        //   console.info("Ending turn...");
        //   let enduseraction = { etype: "EndTurn", autopick: true };
        //   lastmove = await gameapi
        //     .executeActionForMatch(matchid, enduseraction, opts)
        //     .then((result) => {
        //       console.log(JSON.stringify(result, null, 2));
        //       return result;
        //     });
        //   break;
        // }
      } catch (err) {
        //@ts-ignore
        if (err.status) {
          //@ts-ignore
          console.error(err?.status, err?.response?.text);
          try {
            //@ts-ignore
            const jsonobj = JSON.parse(err?.response?.text)?.events;
            if (jsonobj) lastmove = jsonobj;
          } catch { }
        } else console.log("Error", err);
        isMatchRunning = false;
        break;
      }
    } //-- end:TURN
  } //-- end:MATCH

  //-- read match end status and display
  let ri_matchend = move_has_event(lastmove, _matcheventyypes.MatchEnded);
  if (ri_matchend) {
    const endstatus =
      typeof ri_matchend.matchEndedWinnerIdx !== "number"
        ? "TIE"
        : match.playerids[ri_matchend.matchEndedWinnerIdx]?.toString() ===
          basic.username
          ? "WON"
          : "LOST";
    console.log(
      `\nMATCHEND [${matchid}]: ${endstatus}`,
      `winnerIdx:${ri_matchend.matchEndedWinnerIdx} scores:${ri_matchend.matchEndedScores}`
    );
  }
}
