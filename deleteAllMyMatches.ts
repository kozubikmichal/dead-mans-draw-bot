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

const gameApi = new Spc22Arena.GameApi();;
const gameAdminApi = new Spc22Arena.GameAdminApi();

const defaultClient = Spc22Arena.ApiClient.instance;
defaultClient.basePath = "https://slhpc2023.appspot.com/";
console.log(`Using server: ${defaultClient.basePath}`);

// Configure HTTP basic authorization: basic
const basic = defaultClient.authentications["basic"];
basic.username = params.username;
basic.password = params.password;

const program = async () => {
    var opts = { at: "today", sortasc: true };
    const matches = (await gameApi.getMatches(opts)).filter(match => Number.isInteger(match.activePlayerIndex));
    console.log('matches: ', matches);

    if (Array.isArray(matches) && matches.length > 0) {
        matches.forEach(match => {
            gameAdminApi.deleteMatch(match._id, {});
        })
    }
}

program();