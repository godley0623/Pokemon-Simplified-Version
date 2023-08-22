import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import PkmnStatDisplay from './PkmnStatDisplay'

let root;

export default function PokemonPartyFooter() {
    const location = useLocation();
    const navigate = useNavigate();
    const currentRoute = location.pathname;
    const [pkmnParty, setPkmnParty] = useState(JSON.parse(localStorage.getItem('PSV: pkmn-party')))

    useEffect(() => {
        if (!pkmnParty) setPkmnParty([])
        root = createRoot(document.getElementById('stat-display'))
    }, [pkmnParty]);

    function handlePkmnStats(e) {
        const partyIndex = Number(e.target.className);
        const pkmn = pkmnParty[partyIndex];
        
        root.render(<PkmnStatDisplay root={root} setPkmnParty={setPkmnParty} page='' index={partyIndex} pkmn={pkmn} moves={true} release={true} front={true} box={true} matchup={true} />);
    }

    function handleBack() {
        navigate('/play')
    }
    function handleShop() {
        navigate('/shop')
    }
    function handleBag() {
        navigate('/bag')
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
        
        {currentRoute === '/play' && <div className='footer-buttons'>
            <div className='box'>Box</div>
            <div onClick={handleBag} className='bag'>Bag</div>
            <div onClick={handleShop} className='shop'>Shop</div>
        </div>}
        {currentRoute === '/shop' && <div className='footer-buttons'>
            <div className='box'>Box</div>
            <div onClick={handleBag} className='bag'>Bag</div>
            <div onClick={handleBack} className='back'>Back</div>
        </div>}
        {currentRoute === '/bag' && <div className='footer-buttons'>
            <div className='box'>Box</div>
            <div onClick={handleShop} className='shop'>Shop</div>
            <div onClick={handleBack} className='back'>Back</div>
        </div>}
    </div>
  )
}
