import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { setPageBackground } from '../controller/controller'
import '../styles/battlePage.css'
import moveJson from '../data/moves.json';

import grassBg from '../assets/pokemonBWBG/battle_bg_grass.png'
import indoorBg from '../assets/pokemonBWBG/battle_bg_indoor.png'

export default function BattlePage() {
    setPageBackground('');

    const navigate = useNavigate();
    const param = useParams()['type'];
    const [wildPkmn, setWildPkmn] = useState({});
    const [titleText, setTitleText] = useState('');
    const [trainer, setTrainer] = useState('');
    const [pkmnParty, setPkmnParty] = useState([]);

    const bgStyle = {
        backgroundImage: `url(${grassBg})`,
        backgroundSize: '100% 100%',
    };

    
    useEffect(() => {
        if (param != 'wild') navigate('/play')

        const lsParty = JSON.parse(localStorage.getItem('PSV: pkmn-party'))
        setPkmnParty(lsParty);
        
        if (!localStorage.getItem('PSV: wild-pkmn') && param === 'wild') {
            navigate('/play');
        } else {
            setWildPkmn(JSON.parse(localStorage.getItem('PSV: wild-pkmn')))
            localStorage.removeItem('PSV: wild-pkmn');
        }
        
    }, [])

    useEffect(() => {
        setTitleText(`A wild ${wildPkmn['name']} appeared!`)
        if (wildPkmn['sprite']) console.log(wildPkmn['sprite'][0])
        console.log(pkmnParty)
    }, [wildPkmn])

  return (
    <div className='battle-page' >
        <div className='battle-container'>
            {titleText}
            <div className='bg-container'>
                <div className='bg' style={bgStyle}>
                    {wildPkmn['sprite'] &&
                    <div className='opp-field'>
                        <img src={wildPkmn['sprite'][0]} alt='opponent pokemon sprite' />
                    </div>
                    }
                    {pkmnParty[0] &&
                    <div className='your-field'>
                        <img src={pkmnParty[0]['sprite'][1]} alt='your pokemon sprite' />
                    </div>
                    }
                </div>
                {param !== 'wild' &&
                <img src={trainer} alt='trainer sprite' />
                }
            </div>
            <div className='move-container'>
                {pkmnParty[0] &&
                pkmnParty[0]['moves'].map((move, key) => (
                    <div key={key} className={`move ${moveJson[move]['type']}`}>{move}</div>
                ))
                }
            </div>
            <div className='battle-party-container'>
                {pkmnParty &&
                pkmnParty.map((pkmn, key) => (
                   <div key={key} className='icon-container'>
                        <img src={pkmn['icon']} alt='pokemon icon'/>
                   </div> 
                ))
                }
            </div>
            <div className='battle-message-box'></div>
        </div>
    </div>
  )
}
