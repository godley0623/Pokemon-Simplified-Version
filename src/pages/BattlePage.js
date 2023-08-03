import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { setPageBackground } from '../controller/controller'
import '../styles/battlePage.css'

import grassBg from '../assets/pokemonBWBG/battle_bg_grass.png'
import indoorBg from '../assets/pokemonBWBG/battle_bg_indoor.png'

export default function BattlePage() {
    setPageBackground('');

    const navigate = useNavigate();
    const param = useParams()['type'];
    const [wildPkmn, setWildPkmn] = useState({});
    const [titleText, setTitleText] = useState('');
    const [trainer, setTrainer] = useState('');

    const bgStyle = {
        backgroundImage: `url(${grassBg})`,
        backgroundSize: '100% 100%',
    };

    
    useEffect(() => {
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
    }, [wildPkmn])

  return (
    <div className='battle-page' >
        <div className='battle-container'>
            {titleText}
            <div className='bg-container'>
                <div className='bg' style={bgStyle}>
                    {wildPkmn['sprite'] && 
                    <img src={wildPkmn['sprite'][0]} alt='wild pokemon sprite'/>}
                </div>
                {param !== 'wild' &&
                <img src={trainer} alt='trainer sprite' />
                }
            </div>
        </div>
    </div>
  )
}
