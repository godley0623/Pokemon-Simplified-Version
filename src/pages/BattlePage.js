import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { setPageBackground, capFirstLetter } from '../controller/controller'
import { weaknessCheck, setTypeMatchup } from '../controller/pkmnTypesController'
import { damageCalc, speedCheck, getRandomMove } from '../controller/pkmnBattleController'
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
    const [oppPkmn, setOppPkmn] = useState({});
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
            setOppPkmn(JSON.parse(localStorage.getItem('PSV: wild-pkmn')))
            localStorage.removeItem('PSV: wild-pkmn');
        }
    }, [])

    useEffect(() => {
        if (oppPkmn['name']) {
            setTitleText(`A wild ${capFirstLetter(oppPkmn['name'])} appeared!`)
        }
        setOppHp([oppPkmn['hp'], oppPkmn['currentHp']])
    }, [oppPkmn])

    useEffect(() => {
        if (pkmnParty[0]) setYourHp([pkmnParty[0]['hp'], pkmnParty[0]['currentHp']])
        
    }, [pkmnParty])

    useEffect(() => {
        const hp = Math.floor(yourHp[1] / yourHp[0] * 100);
        console.log(yourHp[1])
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

    function damageHandler(target, dmg) {
        if (target === 'player') {
            const newArray = [...pkmnParty];
            newArray[0]['currentHp'] -= dmg;
            setPkmnParty(newArray);
        }
    }

    function handleMoveClick(e) {
        const oppMove = getRandomMove(oppPkmn['moves'])
        const yourMove = e.target.textContent

        const attackOrder = speedCheck(pkmnParty[0], moveJson[yourMove], oppPkmn, moveJson[oppMove]);

        const yourDmg = damageCalc(pkmnParty[0], moveJson[yourMove], oppPkmn);
        const oppDmg = damageCalc(oppPkmn, moveJson[oppMove], pkmnParty[0]);
        console.log(yourDmg, oppDmg);
    }

    function handlePkmnSwitch(e) {
        const index1 = 0;
        const index2 = Number(e.target.className);

        if (index1 < 0 || index1 >= pkmnParty.length || index2 < 0 || index2 >= pkmnParty.length) {
          // Index out of bounds, return without modifying the array
          return;
        }
    
        // Create a copy of the original array
        const newArray = [...pkmnParty];
    
        // Perform the switch
        const temp = newArray[index1];
        newArray[index1] = newArray[index2];
        newArray[index2] = temp;
    
        // Update the state with the modified array
        setPkmnParty(newArray);
      };


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
                    {oppPkmn['name'] &&
                    <>
                        <h3>{capFirstLetter(oppPkmn['name'])}</h3>
                        <div className='hp-bar'>
                            <p className='hp-percent'>{`${Math.floor(oppHp[1] / oppHp[0] * 100)}%`}</p>
                            <div className='fill' style={oppFillStyle}></div>
                        </div>
                    </>
                    }
                </div>
                <div className='bg' style={bgStyle}>
                    {oppPkmn['sprite'] &&
                    <div className='opp-field'>
                        <img src={oppPkmn['sprite'][0]} alt='opponent pokemon sprite' />
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
                   <div key={key} className={`icon-container ${key}`} onClick={handlePkmnSwitch}>
                        <img className={`${key}`} src={pkmn['icon']} alt='pokemon icon'/>
                   </div> 
                ))
                }
            </div>
            <div className='battle-message-box'></div>
        </div>
    </div>
  )
}
