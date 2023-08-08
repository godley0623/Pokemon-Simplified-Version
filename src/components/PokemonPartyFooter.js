import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client';
import PkmnStatDisplay from './PkmnStatDisplay'

export default function PokemonPartyFooter() {
    const [pkmnParty, setPkmnParty] = useState(JSON.parse(localStorage.getItem('PSV: pkmn-party')))

    useEffect(() => {
        if (!pkmnParty) setPkmnParty([])
    }, []);

    function handlePkmnStats(e) {
        const partyIndex = Number(e.target.className);
        const pkmn = pkmnParty[partyIndex];

        createRoot(document.getElementById('stat-display')).render(<PkmnStatDisplay page='' pkmn={pkmn} moves={true} release={true} front={true} box={true} matchup={true} />);
    }

  return (
    <div className='pkmn-party-footer'>
        <div className='pkmn-party'>
            {pkmnParty.map((pkmn, index) => (
                <div key={index} className='icon-container'>
                    <img onClick={handlePkmnStats} className={`${index}`} src={pkmn['icon']} alt='pokemon icon'/>
                </div>
            ))}
        </div>
    </div>
  )
}
