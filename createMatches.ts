var Spc22Arena = require("spc22_arena");

require('dotenv').config()

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

const gameApi = new Spc22Arena.GameApi();

const defaultClient = Spc22Arena.ApiClient.instance;
defaultClient.basePath = "https://slhpc2023.appspot.com/";
console.log(`Using server: ${defaultClient.basePath}`);

// Configure HTTP basic authorization: basic
const basic = defaultClient.authentications["basic"];
basic.username = params.username;
basic.password = params.password;

export async function getActiveMatches() {
    console.log("... polling ...")

    var opts = { at: "today", sortasc: true };

    let matches: null | any[] = null;

    matches = (await gameApi.getMatches(opts)).filter(match => Number.isInteger(match.activePlayerIndex));

    if (Array.isArray(matches) && matches.length > 0) {
        console.log("match is running currently")
        //NOTE: what to do when there are multiple matches available - now: just pick first and play with it
        const picked_match = matches[0];
        return picked_match;
    }
    console.log("No match, continue")

    return null;
}

const program = async () => {
    while (true) {
        const activeMatches = await getActiveMatches();
        console.log('activeMatches: ', activeMatches);
        if (activeMatches) {
            await new Promise(resolve => setTimeout(resolve, 15000));
            continue
        }

        try {
            await gameApi.createMatch(JSON.stringify({ playerids: ['000000000000000000000000', process.env.USERNAME], tags: ["alp-iddqd"] }))
        } catch (err) {
            console.log('err: ', (err as any).response.text);
        }

    }
}

program();