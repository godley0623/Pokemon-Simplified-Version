import { weaknessCheck, setTypeMatchup } from "./pkmnTypesController";
import { capFirstLetter } from "./controller";

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
                final = 4;
            } else if (key === 'twoXEff') {
                final = 2;
            } else if (key === 'fourXRes') {
                final = .25;
            } else if (key === 'twoXRes') {
                final = .5;
            } else {
                final = 0;
            }
        }
    })

    return final;
}

export function damageCalc(attacker, attackerMove, defender) {
    const level = 10;
    const power = attackerMove['power'];
    const attack = attacker['atk'];
    const defense = defender['def'];
    const random = Math.random() * (1 - .85 + 1e-9) + .85;
    let critical = Math.floor(Math.random() * 100) + 1;
    critical <= 10 ? critical = 1.5 : critical = 1;
    const burn = 1;
    const type = getTypeEff(defender, attackerMove);


    const damage = ( ( ( (2 * level/5) + 2 ) * power * attack/defense / 50) + 2) * random * burn * type;

    return Math.floor(damage);

}

export function getRandomMove(moves) {
    const moveIndex = Math.floor(Math.random() * moves.length);
    return moves[moveIndex];
}

export function speedCheck(yourPkmn, yourMove, oppPkmn, oppMove) {
    if (yourMove['priority'] > oppMove['priority']) {
        return [yourPkmn, oppPkmn];
    } else if (yourMove['priority'] < oppMove['priority']) {
        return [oppPkmn, yourPkmn];
    }

    if (yourPkmn['spd'] > oppPkmn['spd']) {
        return [yourPkmn, oppPkmn];
    } else if (yourPkmn['spd'] < oppPkmn['spd']) {
        return [oppPkmn, yourPkmn];
    }

    const speedTie = [yourPkmn];
    const rand = Math.floor(Math.random() * 2)
    if (rand === 0) {
        speedTie.push(oppPkmn);
    } else {
        speedTie.unshift(oppPkmn);
    }

    return speedTie;
}