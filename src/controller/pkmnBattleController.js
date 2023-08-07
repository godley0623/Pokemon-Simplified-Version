import { weaknessCheck, setTypeMatchup } from "./pkmnTypesController";
import { capFirstLetter, sleep } from "./controller";
import { delay } from "lodash";

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

export async function attackHandler (attackOrder, yourPkmn, oppPkmn, yourDmg, oppDmg, damageHandler, timeDelay, pkmnSwitch = false, yourPkmnImg, oppPkmnImg, yourTypeText, yourCritText, oppTypeText, oppCritText) {
    if (attackOrder[0] === 'player') {
        if (yourPkmn['currentHp'] >= 1) {
            yourPkmnImg.classList.add('attack-player')
            damageHandler('opp', yourDmg, pkmnSwitch);
            if (yourTypeText) {
                console.log(yourTypeText);
            }
            if (yourCritText) {
                console.log(yourCritText);
            }
        }
    } if (attackOrder[0] === 'opp') {
        if (oppPkmn['currentHp'] >= 1) {
            oppPkmnImg.classList.add('attack-opp')
            damageHandler('player', oppDmg, pkmnSwitch);
            if (oppTypeText) {
                console.log(oppTypeText);
            }
            if (oppCritText) {
                console.log(oppCritText);
            }
        }
    }

    // Time Delay
    await sleep(timeDelay)

    if (attackOrder[1] === 'player') {
        if (yourPkmn['currentHp'] >= 1) {
            yourPkmnImg.classList.add('attack-player');
            damageHandler('opp', yourDmg);
            if (yourTypeText) {
                console.log(yourTypeText);
            }
            if (yourCritText) {
                console.log(yourCritText);
            }
        }
    } if (attackOrder[1] === 'opp') {
        if (oppPkmn['currentHp'] >= 1) {
            oppPkmnImg.classList.add('attack-opp');
            damageHandler('player', oppDmg);
            if (oppTypeText) {
                console.log(oppTypeText);
            }
            if (oppCritText) {
                console.log(oppCritText);
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