import React, { useState, useEffect } from 'react'
import { getPkmnParty, updatePkmnParty, allPkmn } from '../controller/pkmnDataBaseController';
import evolutionJson from '../data/evolution.json'
import '../styles/evolutionChoice.css'



export default function EvolutionChoice(props) {
    const [pkmnChoice, setPkmnChoice] = useState(getPkmnToEvolve())

    function closeDisplay() {
        props.root.render(<></>);
    }

    function getPkmnToEvolve() {
        const pkmn = []
        const pkmnParty = getPkmnParty()

        for (let i=0; i<pkmnParty.length; i++) {
            let pkmnName = pkmnParty[i]['name']
            if (pkmnName in evolutionJson) {
                pkmn.push([pkmnName, evolutionJson[pkmnName], i])
            }
        }

        return pkmn
    }

    function handleCancel() {
        closeDisplay()
    }

    function handleEvolution(evolvedPkmn, index) {
        const pkmn = getPkmnParty()[index]
        let pkmnParty = getPkmnParty()
       
        evolvedPkmn.moves = pkmn.moves
        if (pkmn.item) evolvedPkmn.item = pkmn.item

        pkmnParty[index] = evolvedPkmn
        updatePkmnParty(pkmnParty)

        props.reduceQuanity(props.index)
    }



    return (
    <div className='evolution-choice-display'>
        <p onClick={handleCancel} className='cancel-x'>X</p>
        <div className='pkmn-container'>
            {pkmnChoice.map((pkmn, key) => (
               <div className='evolution-container'>
                    <div key={key} className='sprite-container'>
                        <img src={allPkmn[pkmn[0]]['sprite'][0]} alt='pokemon sprite'/>
                    </div>
                    <div className='icon-container'>
                        {pkmn[1].map((p, key2) => (
                           <div key={key2} className='option-container'>
                                <img onClick={() => handleEvolution({...allPkmn[p]}, pkmnChoice[key][2])} src={allPkmn[p]['icon']} alt='icon sprite'/>
                           </div> 
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
