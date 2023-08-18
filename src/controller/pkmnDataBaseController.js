import genOne from '../data/genone_pkmn.json' 
import genTwo from '../data/gentwo_pkmn.json'
import genThree from '../data/genthree_pkmn.json'
import genFour from '../data/genfour_pkmn.json'
import genFive from '../data/genfive_pkmn.json'
import { getRandomNumber, choose } from './controller'
import { easyTrainers } from '../trainers/easy/easyTrainers'
import { normalTrainers } from '../trainers/normal/normalTrainers'
import { hardTrainers } from '../trainers/hard/hardTrainers'

const types = ["Fire", "Water", "Grass", "Electric", "Normal", "Flying", "Bug", "Poison", "Rock", "Ground", "Fighting", "Psychic", "Ghost", "Dark", "Steel", "Fairy", "Ice", "Dragon"];

export const allPkmn = { ...genOne, ...genTwo, ...genThree, ...genFour, ...genFive};

let low = [];
let mid = [];
let high = [];
Object.keys(allPkmn).forEach((key) => {
    if (allPkmn[key]['atk'] <= 5) low.push(allPkmn[key]);
    else if (allPkmn[key]['atk'] <= 9) mid.push(allPkmn[key]);
    else high.push(allPkmn[key]);
})

export let lowPkmn = low;
export let midPkmn = mid;
export let highPkmn = high;

export function getPkmnParty() {
    return localStorage.getItem('PSV: pkmn-party');
}

export function addPkmnToParty(pkmn) {
    let pkmnParty = JSON.parse(localStorage.getItem('PSV: pkmn-party'));

    if (pkmnParty) {
        pkmnParty.push(pkmn)
    }else {
        pkmnParty = [pkmn]
    }

    localStorage.setItem('PSV: pkmn-party', JSON.stringify(pkmnParty))
}

export function getAllPkmnByType(type) {
    if (type[0] === 'None') return [];
   
    const pkmnArray = [];

   Object.keys(allPkmn).forEach((key) => {
    if (type[1] !== 'None') {
        if (allPkmn[key]['type'][0] === type[0].toLowerCase() && allPkmn[key]['type'][1] === type[1].toLowerCase() || allPkmn[key]['type'][0] === type[1].toLowerCase() && allPkmn[key]['type'][1] === type[0].toLowerCase()) {
            pkmnArray.push({
                'name': key,
                'icon': allPkmn[key]['icon']
            });
        }
    } else {
        if (allPkmn[key]['type'][0] === type[0].toLowerCase() || allPkmn[key]['type'][1] === type[0].toLowerCase()) {
            pkmnArray.push({
                'name': key,
                'icon': allPkmn[key]['icon']
            });
        }
    }
  });

  return pkmnArray;
}

export function setWildPkmn () {
    const randNum = getRandomNumber(100) + 1;
    const randLow = low[getRandomNumber(low.length)];
    const randMid = mid[getRandomNumber(mid.length)];
    const randHigh = high[getRandomNumber(high.length)];

    if (randNum <= 80) return randLow;
    else if (randNum <= 99) return randMid;
    else return randHigh;
} 

export function setTrainer () {
    const diff = localStorage.getItem('PSV: trainerDiff');
    let trainer;
    switch(diff) {
        case 'Easy':
            trainer = choose(easyTrainers);
        break;

        case 'Normal':
            trainer = choose(normalTrainers);
        break

        case 'Hard':
            trainer = choose(hardTrainers)
        break
    }
    return trainer;
}

export function addMove (pkmn, move) {
    if (pkmn.moves.length >= 4) return pkmn;
    
    if (move.toLowerCase() === 'random') {
        let randomMove = choose(types);
        if (Math.floor(Math.random() * 100 + 1) <= 20) {
            randomMove = randomMove + '+';
        }

        pkmn.moves.push(randomMove);
        return pkmn
    } else {
        pkmn.moves.push(move);
        return pkmn
    }

}