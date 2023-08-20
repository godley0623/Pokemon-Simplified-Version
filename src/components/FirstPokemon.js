import React from 'react'
import StarterPokemon from './StarterPokemon'
import genOne from '../data/genone_pkmn.json' 
import genTwo from '../data/gentwo_pkmn.json'
import genThree from '../data/genthree_pkmn.json'
import genFour from '../data/genfour_pkmn.json'
import genFive from '../data/genfive_pkmn.json'

export default function FirstPokemon() {
  return (
    <div className='first-pokemon-container'>
        <h1>Choose Your Starter Pokemon</h1>
        <div className='starter-pokemon-container'>
            <div className='kanto'>
                <h2>Kanto Starters</h2>
                <div className='starters'>
                    <StarterPokemon name={genOne['bulbasaur']['name']} sprite={genOne['bulbasaur']['sprite'][0]}/>
                    <StarterPokemon name={genOne['charmander']['name']} sprite={genOne['charmander']['sprite'][0]}/>
                    <StarterPokemon name={genOne['squirtle']['name']} sprite={genOne['squirtle']['sprite'][0]}/>
                </div>
            </div>
            <div className='johto'>
                <h2>Johto Starters</h2>
                <div className='starters'>
                    <StarterPokemon name={genTwo['chikorita']['name']} sprite={genTwo['chikorita']['sprite'][0]}/>
                    <StarterPokemon name={genTwo['cyndaquil']['name']} sprite={genTwo['cyndaquil']['sprite'][0]}/>
                    <StarterPokemon name={genTwo['totodile']['name']} sprite={genTwo['totodile']['sprite'][0]}/>
                </div>
            </div>
            <div className='hoenn'>
                <h2>Hoenn Starters</h2>
                <div className='starters'>
                    <StarterPokemon name={genThree['treecko']['name']} sprite={genThree['treecko']['sprite'][0]}/>
                    <StarterPokemon name={genThree['torchic']['name']} sprite={genThree['torchic']['sprite'][0]}/>
                    <StarterPokemon name={genThree['mudkip']['name']} sprite={genThree['mudkip']['sprite'][0]}/>
                </div>
            </div>
            <div className='sinnoh'>
                <h2>Sinnoh Starters</h2>
                <div className='starters'>
                    <StarterPokemon name={genFour['turtwig']['name']} sprite={genFour['turtwig']['sprite'][0]}/>
                    <StarterPokemon name={genFour['chimchar']['name']} sprite={genFour['chimchar']['sprite'][0]}/>
                    <StarterPokemon name={genFour['piplup']['name']} sprite={genFour['piplup']['sprite'][0]}/>
                </div>
            </div>
            <div className='unova'>
                <h2>Unova Starters</h2>
                <div className='starters'>
                    <StarterPokemon name={genFive['snivy']['name']} sprite={genFive['snivy']['sprite'][0]}/>
                    <StarterPokemon name={genFive['tepig']['name']} sprite={genFive['tepig']['sprite'][0]}/>
                    <StarterPokemon name={genFive['oshawott']['name']} sprite={genFive['oshawott']['sprite'][0]}/>
                </div>
            </div>
        </div>
    </div>
  )
}
