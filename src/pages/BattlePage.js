import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { setPageBackground, capFirstLetter } from '../controller/controller'
import '../styles/battlePage.css'
import moveJson from '../data/moves.json';

import grassBg from '../assets/pokemonBWBG/battle_bg_grass.png'
import indoorBg from '../assets/pokemonBWBG/battle_bg_indoor.png'

// import { HealthBar } from '../classes/healthBar';
// const yourHp = new HealthBar(300);
// const oppHp = new HealthBar(250);



export default function BattlePage() {
    setPageBackground('');

    const navigate = useNavigate();
    const param = useParams()['type'];
    const [wildPkmn, setWildPkmn] = useState({});
    const [titleText, setTitleText] = useState('');
    const [trainer, setTrainer] = useState('');
    const [pkmnParty, setPkmnParty] = useState([]);
    const [yourHp, setYourHp] = useState([100, 100]);
    const [oppHp, setOppHp] = useState([100, 100]);
    const [yourFillStyle, setYourFillStyle] = useState({});
    const [oppFillStyle, setOppFillStyle] = useState({});
    const [yourFillColor, setYourFillColor] = useState('rgb(2,203,88)');
    const [oppFillColor, setOppFillColor] = useState('rgb(2,203,88)');

    const bgStyle = {
        backgroundImage: `url(${grassBg})`,
        backgroundSize: '100% 100%',
    };

    
    useEffect(() => {
        if (param !== 'wild') navigate('/play')

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
        if (wildPkmn['name']) {
            setTitleText(`A wild ${capFirstLetter(wildPkmn['name'])} appeared!`)
        }
        setOppHp([wildPkmn['hp'], wildPkmn['currentHp']])
    }, [wildPkmn])

    useEffect(() => {
        if (pkmnParty[0]) setYourHp([pkmnParty[0]['hp'], pkmnParty[0]['currentHp']])
        
    }, [pkmnParty])

    useEffect(() => {
        const hp = Math.floor(yourHp[1] / yourHp[0] * 100);
        console.log(hp)
        if (hp > 49) {
            setYourFillColor('rgb(2,203,88)');
        } else if (hp > 20 && hp <= 49) {
            console.log(1)
            setYourFillColor('rgb(245,213,55)');
        } else {
            setYourFillColor('rgb(238,74,39)');
        }
        setYourFillStyle({
            width: `${hp}%`,
            background: yourFillColor,
        })
    }, [yourHp, yourFillColor])

    useEffect(() => {
        const hp = Math.floor(oppHp[1] / oppHp[0] * 100);
        console.log(hp)
        if (hp > 49) {
            setOppFillColor('rgb(2,203,88)');
        } else if (hp > 20 && hp <= 49) {
            console.log(1)
            setOppFillColor('rgb(245,213,55)');
        } else {
            setOppFillColor('rgb(238,74,39)');
        }
        setOppFillStyle({
            width: `${hp}%`,
            background: oppFillColor,
        })
    }, [oppHp, oppFillColor])

    function handleMoveClick() {
        setOppHp([oppHp[0], oppHp[1] - 5]);
    }

  return (
    <div className='battle-page' >
        <div className='battle-container'>
            {`${titleText}`}
            <div className='bg-container'>
                <div className='your-hp-container'>
                    {pkmnParty[0] &&
                    <>
                        <h3>{capFirstLetter(pkmnParty[0]['name'])}</h3>
                        <div className='hp-bar'>
                            <p className='hp-percent'>{`${Math.floor(yourHp[1] / yourHp[0] * 100)}%`}</p>
                            <div className='fill' style={yourFillStyle}></div>
                        </div>
                    </>
                    }
                </div>
                <div className='opp-hp-container'>
                    {wildPkmn['name'] &&
                    <>
                        <h3>{capFirstLetter(wildPkmn['name'])}</h3>
                        <div className='hp-bar'>
                            <p className='hp-percent'>{`${Math.floor(oppHp[1] / oppHp[0] * 100)}%`}</p>
                            <div className='fill' style={oppFillStyle}></div>
                        </div>
                    </>
                    }
                </div>
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
                    <div onClick={handleMoveClick} key={key} className={`move ${moveJson[move]['type']}`}>{move}</div>
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
