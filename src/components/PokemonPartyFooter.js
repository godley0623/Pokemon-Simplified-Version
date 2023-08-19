import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client';
import PkmnStatDisplay from './PkmnStatDisplay'

let root;

export default function PokemonPartyFooter() {
    const [pkmnParty, setPkmnParty] = useState(JSON.parse(localStorage.getItem('PSV: pkmn-party')))

    useEffect(() => {
        if (!pkmnParty) setPkmnParty([])
        root = createRoot(document.getElementById('stat-display'))
    }, []);

    function handlePkmnStats(e) {
        const partyIndex = Number(e.target.className);
        const pkmn = pkmnParty[partyIndex];
        
        root.render(<PkmnStatDisplay root={root} setPkmnParty={setPkmnParty} page='' index={partyIndex} pkmn={pkmn} moves={true} release={true} front={true} box={true} matchup={true} />);
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
        <div className='footer-buttons'>
            <div className='box'>Box</div>
            <div className='bag'>Bag</div>
            <div className='shop'>Shop</div>
        </div>
    </div>
  )
}
