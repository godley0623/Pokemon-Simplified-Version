import normal from '../assets/PokemonTypes/normal.png';
import fire from '../assets/PokemonTypes/fire.png';
import water from '../assets/PokemonTypes/water.png';
import grass from '../assets/PokemonTypes/grass.png';
import electric from '../assets/PokemonTypes/electric.png';
import ice from '../assets/PokemonTypes/ice.png';
import fighting from '../assets/PokemonTypes/fighting.png';
import poison from '../assets/PokemonTypes/poison.png';
import ground from '../assets/PokemonTypes/ground.png';
import flying from '../assets/PokemonTypes/flying.png';
import psychic from '../assets/PokemonTypes/psychic.png';
import bug from '../assets/PokemonTypes/bug.png';
import rock from '../assets/PokemonTypes/rock.png';
import ghost from '../assets/PokemonTypes/ghost.png';
import dragon from '../assets/PokemonTypes/dragon.png';
import dark from '../assets/PokemonTypes/dark.png';
import steel from '../assets/PokemonTypes/steel.png';
import fairy from '../assets/PokemonTypes/fairy.png';

export const pkmnTypes = {
    normal: normal,
    fire: fire,
    water: water,
    grass: grass,
    electric: electric,
    ice: ice,
    fighting: fighting,
    poison: poison,
    ground: ground,
    flying: flying,
    psychic: psychic,
    bug: bug,
    rock: rock,
    ghost: ghost,
    dragon: dragon,
    dark: dark,
    steel: steel,
    fairy: fairy,
};

export function setTypeMatchup(type) {
    let weakTo = [];
    let resist = [];
    let immuneTo = [];
    let strongAgainst = [];

    // Set the type match up for the first type
    switch (type[0]) {
        case "Fire":
            weakTo.push("Water", "Rock", "Ground");
            resist.push("Grass", "Steel", "Fairy", "Fire", "Ice", "Bug");
            strongAgainst.push("Grass", "Bug", "Steel", "Ice");
            break;
        case "Water":
            weakTo.push("Grass", "Electric");
            resist.push("Water", "Fire", "Ice", "Steel");
            strongAgainst.push("Fire", "Ground", "Rock");
            break;
        case "Grass":
            weakTo.push("Fire", "Ice", "Bug", "Flying", "Poison");
            resist.push("Grass", "Water", "Ground", "Electric");
            strongAgainst.push("Water", "Ground", "Rock");
            break;
        case "Electric":
            weakTo.push("Ground");
            resist.push("Electric", "Flying", "Steel");
            strongAgainst.push("Water", "Flying");
            break;
        case "Normal":
            weakTo.push("Fighting");
            immuneTo.push("Ghost");
            strongAgainst.push(); // Normal-type doesn't have any specific strengths
            break;
        case "Flying":
            weakTo.push("Electric", "Ice", "Rock");
            resist.push("Fighting", "Bug", "Grass");
            immuneTo.push("Ground");
            strongAgainst.push("Grass", "Fighting", "Bug");
            break;
        case "Bug":
            weakTo.push("Flying", "Rock", "Fire");
            resist.push("Fighting", "Ground", "Grass");
            strongAgainst.push("Grass", "Psychic", "Dark");
            break;
        case "Poison":
            weakTo.push("Ground", "Psychic");
            resist.push("Fighting", "Poison", "Bug", "Grass", "Fairy");
            strongAgainst.push("Grass", "Fairy");
            break;
        case "Rock":
            weakTo.push("Water", "Grass", "Fighting", "Steel", "Ground");
            resist.push("Normal", "Fire", "Flying", "Poison");
            strongAgainst.push("Flying", "Bug", "Fire", "Ice");
            break;
        case "Ground":
            weakTo.push("Water", "Grass", "Ice");
            resist.push("Poison", "Rock");
            immuneTo.push("Electric");
            strongAgainst.push("Fire", "Electric", "Poison", "Rock", "Steel");
            break;
        case "Fighting":
            weakTo.push("Flying", "Psychic", "Fairy");
            resist.push("Rock", "Bug", "Dark");
            strongAgainst.push("Normal", "Ice", "Rock", "Dark", "Steel");
            break;
        case "Psychic":
            weakTo.push("Ghost", "Dark", "Bug");
            resist.push("Fighting", "Psychic");
            strongAgainst.push("Fighting", "Poison");
            break;
        case "Ghost":
            weakTo.push("Ghost", "Dark");
            resist.push("Poison", "Bug");
            immuneTo.push("Fighting", "Normal");
            strongAgainst.push("Ghost", "Psychic");
            break;
        case "Dark":
            weakTo.push("Fighting", "Bug", "Fairy");
            resist.push("Ghost", "Dark");
            immuneTo.push("Psychic");
            strongAgainst.push("Ghost", "Psychic");
            break;
        case "Steel":
            weakTo.push("Fire", "Ground", "Fighting");
            resist.push("Normal", "Psychic", "Bug", "Grass", "Fairy", "Flying", "Rock", "Steel", "Ice", "Dragon");
            immuneTo.push("Poison");
            strongAgainst.push("Ice", "Rock", "Fairy");
            break;
        case "Fairy":
            weakTo.push("Steel", "Poison");
            resist.push("Bug", "Fighting", "Dark");
            immuneTo.push("Dragon");
            strongAgainst.push("Fighting", "Dragon", "Dark");
            break;
        case "Ice":
            weakTo.push("Fighting", "Fire", "Rock", "Steel");
            resist.push("Ice");
            strongAgainst.push("Grass", "Ground", "Flying", "Dragon");
            break;
        case "Dragon":
            weakTo.push("Ice", "Dragon", "Fairy");
            resist.push("Fire", "Water", "Grass", "Electric");
            strongAgainst.push("Dragon");
            break;
        default:
        break;
    }

    // Set the type match up for the second type
    switch (type[1]) {
        case "Fire":
            weakTo.push("Water", "Rock", "Ground");
            resist.push("Grass", "Steel", "Fairy", "Fire", "Ice", "Bug");
            strongAgainst.push("Grass", "Bug", "Steel", "Ice");
            break;
        case "Water":
            weakTo.push("Grass", "Electric");
            resist.push("Water", "Fire", "Ice", "Steel");
            strongAgainst.push("Fire", "Ground", "Rock");
            break;
        case "Grass":
            weakTo.push("Fire", "Ice", "Bug", "Flying", "Poison");
            resist.push("Grass", "Water", "Ground", "Electric");
            strongAgainst.push("Water", "Ground", "Rock");
            break;
        case "Electric":
            weakTo.push("Ground");
            resist.push("Electric", "Flying", "Steel");
            strongAgainst.push("Water", "Flying");
            break;
        case "Normal":
            weakTo.push("Fighting");
            immuneTo.push("Ghost");
            strongAgainst.push(); // Normal-type doesn't have any specific strengths
            break;
        case "Flying":
            weakTo.push("Electric", "Ice", "Rock");
            resist.push("Fighting", "Bug", "Grass");
            immuneTo.push("Ground");
            strongAgainst.push("Grass", "Fighting", "Bug");
            break;
        case "Bug":
            weakTo.push("Flying", "Rock", "Fire");
            resist.push("Fighting", "Ground", "Grass");
            strongAgainst.push("Grass", "Psychic", "Dark");
            break;
        case "Poison":
            weakTo.push("Ground", "Psychic");
            resist.push("Fighting", "Poison", "Bug", "Grass", "Fairy");
            strongAgainst.push("Grass", "Fairy");
            break;
        case "Rock":
            weakTo.push("Water", "Grass", "Fighting", "Steel", "Ground");
            resist.push("Normal", "Fire", "Flying", "Poison");
            strongAgainst.push("Flying", "Bug", "Fire", "Ice");
            break;
        case "Ground":
            weakTo.push("Water", "Grass", "Ice");
            resist.push("Poison", "Rock");
            immuneTo.push("Electric");
            strongAgainst.push("Fire", "Electric", "Poison", "Rock", "Steel");
            break;
        case "Fighting":
            weakTo.push("Flying", "Psychic", "Fairy");
            resist.push("Rock", "Bug", "Dark");
            strongAgainst.push("Normal", "Ice", "Rock", "Dark", "Steel");
            break;
        case "Psychic":
            weakTo.push("Ghost", "Dark", "Bug");
            resist.push("Fighting", "Psychic");
            strongAgainst.push("Fighting", "Poison");
            break;
        case "Ghost":
            weakTo.push("Ghost", "Dark");
            resist.push("Poison", "Bug");
            immuneTo.push("Fighting", "Normal");
            strongAgainst.push("Ghost", "Psychic");
            break;
        case "Dark":
            weakTo.push("Fighting", "Bug", "Fairy");
            resist.push("Ghost", "Dark");
            immuneTo.push("Psychic");
            strongAgainst.push("Ghost", "Psychic");
            break;
        case "Steel":
            weakTo.push("Fire", "Ground", "Fighting");
            resist.push("Normal", "Psychic", "Bug", "Grass", "Fairy", "Flying", "Rock", "Steel", "Ice", "Dragon");
            immuneTo.push("Poison");
            strongAgainst.push("Ice", "Rock", "Fairy");
            break;
        case "Fairy":
            weakTo.push("Steel", "Poison");
            resist.push("Bug", "Fighting", "Dark");
            immuneTo.push("Dragon");
            strongAgainst.push("Fighting", "Dragon", "Dark");
            break;
        case "Ice":
            weakTo.push("Fighting", "Fire", "Rock", "Steel");
            resist.push("Ice");
            strongAgainst.push("Grass", "Ground", "Flying", "Dragon");
            break;
        case "Dragon":
            weakTo.push("Ice", "Dragon", "Fairy");
            resist.push("Fire", "Water", "Grass", "Electric");
            strongAgainst.push("Dragon");
            break;
        default:
        break;
    }

    return [weakTo, resist, immuneTo, strongAgainst, type];
}

export function weaknessCheck(matchup){
    let w = 0;
    let r = 1;
    let i = 2;

    let dmg = {};
    let dupe = false;

    let fourTimes = [];
    let twoTimes = [];
    let halfResist = [];
    let quarterResist = [];
    let immune = [];

    //Check Weakness
    for(let o = 0; o < matchup[w].length; o++){
        if (matchup[w][o] !== undefined){
            if(matchup[w].length > o+1){
                for(let p = o+1; p < matchup[w].length; p++){
                    if(matchup[w][o] === matchup[w][p]){
                        dmg[matchup[w][o]] = 4;
                        delete matchup[w][p];
                        dupe = true
                    }
                }
            }
            if(!dupe){
                dmg[matchup[w][o]] = 2;
            } else{
                dupe = false;
            }
        }
    }

    //Check Resist
    for(let o = 0; o < matchup[r].length; o++){
        if (matchup[r][o] !== undefined){
            if(matchup[r].length > o+1){
                for(let p = o+1; p < matchup[r].length; p++){
                    if(matchup[r][o] === matchup[r][p]){
                        dmg[matchup[r][o]] = dmg[matchup[r][o]] / 4 || .25;
                        delete matchup[r][p];
                        dupe = true
                    }
                }
            }
            if(!dupe){
                dmg[matchup[r][o]] = dmg[matchup[r][o]] / 2 || .5;
            } else{
                dupe = false;
            }
        }

        //Remove from the dict if resist becomes normal effective
        if (dmg[matchup[r][o]] === 1){
            delete dmg[matchup[r][o]];
        }
    }

    //Check Immunity
    for(let o = 0; o < matchup[i].length; o++){
        if (matchup[i][o] !== undefined){
            if(matchup[i].length > o+1){
                for(let p = o+1; p < matchup[i].length; p++){
                    if(matchup[i][o] === matchup[i][p]){
                        dmg[matchup[i][o]] = dmg[matchup[i][o]] * 0 || 0;
                        delete matchup[i][p];
                        dupe = true
                    }
                }
            }
            if(!dupe){
                dmg[matchup[i][o]] = dmg[matchup[i][o]] * 0 || 0;
            } else{
                dupe = false;
            }
        }
    }     

    //Seperating the types in different arrays
    for (const [key, value] of Object.entries(dmg)) {
        switch (value) {
            case 4:
                fourTimes.push(key);
                break;
            case 2:
                twoTimes.push(key);
                break;
            case .5:
                halfResist.push(key);
                break;
            case .25:
                quarterResist.push(key);
                break;
            case 0:
                immune.push(key);
                break;
            default:
            break;
        }
    }

    return {
        fourXEff: fourTimes,
        twoXEff: twoTimes,
        fourXRes: quarterResist,
        twoXRes: halfResist,
        immune: immune
    }
}
