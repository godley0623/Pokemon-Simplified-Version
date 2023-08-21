import shopItems from '../data/shop.json'

import evolutionStone from '../assets/itemSprites/evolution-stone.png'
import tmRandom from '../assets/itemSprites/tm-random.png'
import vsSeeker from '../assets/itemSprites/vs-seeker.png'
import leftovers from '../assets/itemSprites/leftovers.png'
import sitrusBerry from '../assets/itemSprites/sitrus-berry.png'
import normalMove from '../assets/itemSprites/normal-move.png'
import grassMove from '../assets/itemSprites/grass-move.png'
import fireMove from '../assets/itemSprites/fire-move.png'
import waterMove from '../assets/itemSprites/water-move.png'
import electricMove from '../assets/itemSprites/electric-move.png'
import rockMove from '../assets/itemSprites/rock-move.png'
import flyingMove from '../assets/itemSprites/flying-move.png'
import pyschicMove from '../assets/itemSprites/pyschic-move.png'
import bugMove from '../assets/itemSprites/bug-move.png'
import darkMove from '../assets/itemSprites/dark-move.png'
import dragonMove from '../assets/itemSprites/dragon-move.png'
import ghostMove from '../assets/itemSprites/ghost-move.png'
import iceMove from '../assets/itemSprites/ice-move.png'
import steelMove from '../assets/itemSprites/steel-move.png'

export const itemObj = {
    'evolution-stone.png': evolutionStone,
    'tm-random.png': tmRandom,
    'vs-seeker.png': vsSeeker,
    'leftovers.png': leftovers,
    'sitrus-berry.png': sitrusBerry,
    'normal-move.png': normalMove,
    'grass-move.png': grassMove,
    'water-move.png': waterMove,
    'fire-move.png': fireMove,
    'electric-move.png': electricMove,
    'rock-move.png': rockMove,
    'steel-move.png': steelMove,
    'flying-move.png': flyingMove,
    'bug-move.png': bugMove,
    'pyschic-move.png': pyschicMove,
    'ghost-move.png': ghostMove,
    'dark-move.png': darkMove,
    'dragon-move.png': dragonMove,
    'ice-move.png': iceMove
}

export const items = shopItems['shop']
export const itemQuanityArray = []
for(let i=0; i<items.length; i++) {
    if (items[i]['sprite'] === 'name') {
        items[i]['sprite'] = items[i]['item'].split(' ').join('-').toLowerCase() + '.png'
    }
    itemQuanityArray.push(1);
}