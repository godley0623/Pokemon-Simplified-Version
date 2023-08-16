import { weaknessCheck, setTypeMatchup } from "./pkmnTypesController";
import { capFirstLetter, sleep, choose } from "./controller";
import { allPkmn } from "./pkmnDataBaseController";
import moveJson from "../data/moves.json";
import { set } from "lodash";

export function fullHealParty(pkmnParty) {
    for (let i=0; i<pkmnParty.length; i++) {
        pkmnParty[i]['currentHp'] = pkmnParty[i]['hp'];
    }
}

function stabCheck(attacker, attackerMove) {
    if (attackerMove['type'] === attacker['type'][0] || attackerMove['type'] === attacker['type'][1]) {
        return 1.5;
    }

    return 1;
}

function getTypeEff(pkmn, move) {
    let final = 1;
    let pkmnTypeClone = [...pkmn['type']];
    pkmnTypeClone[0] = capFirstLetter(pkmnTypeClone[0]);
    pkmnTypeClone[1] = capFirstLetter(pkmnTypeClone[1]);

    const typeEff =  weaknessCheck(setTypeMatchup(pkmnTypeClone));

    Object.keys(typeEff).forEach((key) => {
        const exists = typeEff[key].some(eff => eff === capFirstLetter(move['type']));
        
        if (exists) {
            if (key === 'fourXEff') {
                final = 2;
            } else if (key === 'twoXEff') {
                final = 1.5;
            } else if (key === 'fourXRes') {
                final = .5;
            } else if (key === 'twoXRes') {
                final = .75;
            } else {
                final = 0;
            }
        }
    })

    return final;
}

export function damageCalc(attacker, attackerMove, defender) {
    if (attackerMove['power'] === 0) return 'status';
    
    const level = 10;
    const power = attackerMove['power'];
    const stab = stabCheck(attacker, attackerMove);
    const attack = attacker['atk'];
    const defense = defender['def'] * 1.25;
    const random = Math.random() * (1 - .85 + 1e-9) + .85;
    let critical = Math.floor(Math.random() * 100) + 1;
    critical <= 10 ? critical = 1.5 : critical = 1;
    const burn = 1;
    const type = getTypeEff(defender, attackerMove);


    const damage = ( ( ( (2 * level/5) + 2 ) * (power * .75) * (attack/defense) / 50) + 2) * random * burn * type * stab;

    let typeText = '';
    let critText = '';

    if (critical === 1.5) critText = "It's a critical hit!!!";

    switch(type) {
        case 2:
            typeText = "It's super effective!!!";
        break;
        
        case 1.5:
            typeText = "It's super effective!";
        break;

        case .5:
            typeText = "It's not very effective!!!";
        break;

        case .75:
            typeText = "It's not very effective!";
        break;

        case 0:
            typeText = `It doesn't affect ${capFirstLetter(defender['name'])}`
        break;
    }

    return [Math.floor(damage), typeText, critText];

}

export function getRandomMove(moves) {
    const moveIndex = Math.floor(Math.random() * moves.length);
    return moves[moveIndex];
}

export function speedCheck(yourPkmn, yourMove, oppPkmn, oppMove) {
    if (yourMove['priority'] > oppMove['priority']) {
        return ['player', 'opp'];
    } else if (yourMove['priority'] < oppMove['priority']) {
        return ['opp', 'player'];
    }

    if (yourPkmn['spd'] > oppPkmn['spd']) {
        return ['player', 'opp'];
    } else if (yourPkmn['spd'] < oppPkmn['spd']) {
        return ['opp', 'player'];
    }

    const speedTie = ['player'];
    const rand = Math.floor(Math.random() * 2)
    if (rand === 0) {
        speedTie.push('opp');
    } else {
        speedTie.unshift('opp');
    }

    return speedTie;
}

export async function attackHandler (attackOrder, yourPkmn, oppPkmn, yourDmg, oppDmg, damageHandler, timeDelay, pkmnSwitch = false, yourPkmnImg, oppPkmnImg, yourTypeText, yourCritText, oppTypeText, oppCritText, yourMove, oppMove, battleText, setBattleText) {
    if (attackOrder[0] === 'player') {
        if (yourPkmn['currentHp'] >= 1) {
            addBattleText(`${capFirstLetter(yourPkmn['name'])} used Attack: ${yourMove}`, battleText, setBattleText)
            yourPkmnImg.classList.add('attack-player')
            damageHandler('opp', yourDmg, pkmnSwitch);
            if (yourTypeText) {
                console.log(yourTypeText);
                addBattleText(yourTypeText, battleText, setBattleText)
            }
            if (yourCritText) {
                console.log(yourCritText);
                addBattleText(yourCritText, battleText, setBattleText)
            }
        }
    } if (attackOrder[0] === 'opp') {
        if (oppPkmn['currentHp'] >= 1) {
            addBattleText(`The opposing ${capFirstLetter(oppPkmn['name'])} used Attack: ${oppMove}`, battleText, setBattleText)
            oppPkmnImg.classList.add('attack-opp')
            damageHandler('player', oppDmg, pkmnSwitch);
            if (oppTypeText) {
                console.log(oppTypeText);
                addBattleText(oppTypeText, battleText, setBattleText)
            }
            if (oppCritText) {
                console.log(oppCritText);
                addBattleText(oppCritText, battleText, setBattleText)
            }
        }
    }

    // Time Delay
    await sleep(timeDelay)

    if (attackOrder[1] === 'player') {
        if (yourPkmn['currentHp'] >= 1) {
            addBattleText(`${capFirstLetter(yourPkmn['name'])} used Attack: ${yourMove}`, battleText, setBattleText)
            yourPkmnImg.classList.add('attack-player');
            damageHandler('opp', yourDmg);
            if (yourTypeText) {
                console.log(yourTypeText);
                addBattleText(yourTypeText, battleText, setBattleText)
            }
            if (yourCritText) {
                console.log(yourCritText);
                addBattleText(yourCritText, battleText, setBattleText)
            }
        }
    } if (attackOrder[1] === 'opp') {
        if (oppPkmn['currentHp'] >= 1) {
            addBattleText(`The opposing ${capFirstLetter(oppPkmn['name'])} used Attack: ${oppMove}`, battleText, setBattleText)
            oppPkmnImg.classList.add('attack-opp');
            damageHandler('player', oppDmg);
            if (oppTypeText) {
                console.log(oppTypeText);
                addBattleText(oppTypeText, battleText, setBattleText)
            }
            if (oppCritText) {
                console.log(oppCritText);
                addBattleText(oppCritText, battleText, setBattleText)
            }
        }
    }
}

export function faintHandler(img, hp, faintSpd) {
    if (img.current) {
        if (hp[1] === 0) {
            img.current.classList.add('faint');
            setTimeout(() => {
                img.current.classList.remove('faint');
                img.current.classList.add('fainted');
            }, faintSpd)
        } else {
            img.current.classList.remove('fainted');
        }
    }
}

export function handleTrainerMoves(pkmnArr) {
    const pkmnParty = []
    for (let i=0; i<pkmnArr.length; i++) {
        let pkmnName = pkmnArr[i].pokemon;
        let pkmnMoves = pkmnArr[i].moves;
        let pkmnItems = pkmnArr[i].items;
        let pkmnAi = pkmnArr[i].ai;
        let pkmn = {...allPkmn[pkmnName]};
        
        pkmn.moves = pkmnMoves;
        pkmn.items = pkmnItems;
        pkmn.ai = pkmnAi;

        pkmnParty.push(pkmn);
    }

    return pkmnParty;
}

export function addBattleText(text, battleText, setBattleText) {
    const btCopy = [...battleText];
    btCopy.unshift(text);
    setBattleText(btCopy);
}

export function aiRandom(moves) {
    return choose(moves);
}

export function aiWeakness(moves, defender) {
    let defenderType = defender.type;
    defenderType[0] = capFirstLetter(defenderType[0])
    defenderType[1] = capFirstLetter(defenderType[1])
    
    const weaknesses = weaknessCheck(setTypeMatchup(defenderType))

    if (weaknesses.fourXEff.length > 0) {
        let weakArr = weaknesses.fourXEff;
        for (let i=0; i<weakArr.length; i++) {
            for (let j=0; j<moves.length; j++) {
                if (weakArr[i].toLowerCase() === moveJson[moves[j]]['type'] && moveJson[moves[j]]['power'] > 0) return moves[j]
            }
        } 
    }

    if (weaknesses.twoXEff.length > 0) {
        let weakArr = weaknesses.twoXEff;
        for (let i=0; i<weakArr.length; i++) {
            for (let j=0; j<moves.length; j++) {
                if (weakArr[i].toLowerCase() === moveJson[moves[j]]['type'] && moveJson[moves[j]]['power'] > 0) return moves[j]
            }
        } 
    }

    return moves[0]
}