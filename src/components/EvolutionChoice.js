import React, { useState, useEffect } from 'react'
import { getPkmnParty, allPkmn } from '../controller/pkmnDataBaseController';
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

    console.log(pkmnChoice[0][0])

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
                        {pkmn[1].map((p, key) => (
                           <div key={key} className='option-container'>
                                <img src={allPkmn[p]['icon']} alt='icon sprite'/>
                           </div> 
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
