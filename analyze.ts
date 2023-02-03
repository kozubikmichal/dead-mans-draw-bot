import fs from "fs";

const files = fs.readdirSync("./logs");


const logs = files.map(file => {
    console.log('file: ', file);
    if (file === '.DS_Store') return null
    return JSON.parse(fs.readFileSync(`./logs/${file}`, 'utf8'))
}).filter(f => f);

console.log("I won in ", logs.reduce((count, log) => count + (log.mine > log.opponent ? 1 : 0), 0) / logs.length * 100, '% of games')

/**
 * 
 *  BUSTED
 */


const matchesRisks = logs.map((file, index) => {
    const turnNumbers = Object.keys(file.moves);
    const turnsAsArrays = turnNumbers.map(turnNumber => file.moves[turnNumber]);

    const onlyNonBusted = turnsAsArrays
        .filter((turn: any[]) => turn.some(move => move.endTurn === true));

    const movesAsArrays = onlyNonBusted
        .map((turnLog: any[]) => turnLog.slice(0, -2))
        .filter(moves => moves.length > 0)

    const AVGMatchRisk = movesAsArrays.reduce((risk, turn) => {
        if (!turn) return risk;
        return risk + turn[turn.length - 1].risk
    }, 0) / movesAsArrays.length

    return AVGMatchRisk
})

const matchesRisksFiltred = matchesRisks.filter(el => !Number.isNaN(el));
console.log("Avg risk if not busted", matchesRisksFiltred.reduce((acc, curr) => curr + acc, 0) / matchesRisksFiltred.length)

/**
 * 
 * NON BUSTED
 */

const matchesRisksBusted = logs.map((file, index) => {
    const turnNumbers = Object.keys(file.moves);
    const turnsAsArrays = turnNumbers.map(turnNumber => file.moves[turnNumber]);

    const onlyBusted = turnsAsArrays
        .filter((turn: any[]) => !turn.some(move => move.endTurn === true));

    const movesAsArrays = onlyBusted
        .map((turnLog: any[]) => turnLog.slice(0, -1))
        .filter(moves => moves.length > 0)

    const AVGMatchRisk = movesAsArrays.reduce((risk, turn) => {
        if (!turn) return risk;
        return risk + turn[turn.length - 1].risk
    }, 0) / movesAsArrays.length

    return AVGMatchRisk
})

const matchesRisksBustedFiltered = matchesRisksBusted.filter(el => !Number.isNaN(el));

console.log("Avg risk if busted", matchesRisksBustedFiltered.reduce((acc, curr) => curr + acc, 0) / matchesRisksBustedFiltered.length)

// Only Wins
const matchesRisksByTurnNumber = logs
    .filter(el => el.mine > el.opponent)
    .map((file, index) => {
        const turnNumbers = Object.keys(file.moves);

        const onlyBusted = turnNumbers.reduce((obj, currTurn) => {
            if (file.moves[currTurn].some(move => move.endTurn === true)) {
                return obj
            };

            const currentTurnArray = file.moves[currTurn];
            const onlyRisk = currentTurnArray.slice(0, -1);

            if (onlyRisk.length > 0) {
                obj[currTurn] = onlyRisk[onlyRisk.length - 1]
            }

            return obj
        }, {})

        return onlyBusted;
    })

const structurizedAnalitics = matchesRisksByTurnNumber.reduce((obj, curr) => {
    Object.keys(curr).forEach((key) => {
        if (!obj[key]) obj[key] = [];

        obj[key].push(curr[key]);
    })

    return obj;
}, {})

const avgAnalyticByTurn = Object.keys(structurizedAnalitics).reduce((obj, key) => {
    obj[key] = structurizedAnalitics[key].reduce((analiticOject, curr) => {
        const risk = curr.risk + analiticOject.risk;
        const profitToRisk = Math.pow(curr.profit, 2) / risk + analiticOject.profitToRisk;
        const profit = curr.profit + analiticOject.profit

        return {
            risk,
            profitToRisk,
            profit
        }
    }
        , { risk: 0, profitToRisk: 0, profit: 0 })

    obj[key].risk /= structurizedAnalitics[key].length
    obj[key].profitToRisk /= structurizedAnalitics[key].length
    obj[key].profit /= structurizedAnalitics[key].length

    return obj;
}, {})

console.log('output: ', avgAnalyticByTurn);