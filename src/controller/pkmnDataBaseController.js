import genOne from '../data/genone_pkmn.json' 
import genTwo from '../data/gentwo_pkmn.json'
import genThree from '../data/genthree_pkmn.json'
import genFour from '../data/genfour_pkmn.json'

export const allPkmn = { ...genOne, ...genTwo, ...genThree, ...genFour};

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