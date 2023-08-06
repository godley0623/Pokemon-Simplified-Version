import _ from 'lodash';
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { setPageBackground, capFirstLetter, sleep } from '../controller/controller'
import { weaknessCheck, setTypeMatchup } from '../controller/pkmnTypesController'
import { damageCalc, speedCheck, getRandomMove, attackHandler } from '../controller/pkmnBattleController'
import '../styles/battlePage.css'
import moveJson from '../data/moves.json';
import grassBg from '../assets/pokemonBWBG/battle_bg_grass.png'
import indoorBg from '../assets/pokemonBWBG/battle_bg_indoor.png'


// import { HealthBar } from '../classes/healthBar';
// const yourHp = new HealthBar(300);
// const oppHp = new HealthBar(250);

let canAttack = true;
let canSwitch = true;

export default function BattlePage() {
    // function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }
    
    setPageBackground('');

    const navigate = useNavigate();
    const param = useParams()['type'];
    const [oppPkmn, setOppPkmn] = useState({});
    const [titleText, setTitleText] = useState('');
    const [trainer, setTrainer] = useState('');
    let [pkmnParty, setPkmnParty] = useState([]);
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
        if (pkmnParty[0]) {
            setYourHp([pkmnParty[0]['hp'], pkmnParty[0]['currentHp']])
        }
    }, [pkmnParty])

    useEffect(() => {
        const hp = Math.floor(yourHp[1] / yourHp[0] * 100);
        if (hp > 49) {
            setYourFillColor('rgb(2,203,88)');
        } else if (hp > 20 && hp <= 49) {
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
            setOppFillColor('rgb(245,213,55)');
        } else {
            setOppFillColor('rgb(238,74,39)');
        }
        setOppFillStyle({
            width: `${hp}%`,
            background: oppFillColor,
        })
    }, [oppHp, oppFillColor])

    function damageHandler(target, dmg, pkmnSwitch) {
        if (target === 'opp') {
            setOppPkmn(prevOppPkmn => {
                const newOppPkmn = { ...prevOppPkmn };
                newOppPkmn['currentHp'] -= dmg;
                if (newOppPkmn['currentHp'] < 0) newOppPkmn['currentHp'] = 0;
                oppPkmn['currentHp'] = newOppPkmn['currentHp'];
                return newOppPkmn;
            });
            return dmg;
        }
    
        if (target === 'player') {
            setPkmnParty(prevPkmnParty => {
                if (pkmnSwitch) pkmnParty = prevPkmnParty;
                console.log(pkmnParty)
                const newPkmnParty = [...prevPkmnParty];
                newPkmnParty[0]['currentHp'] -= dmg;
                if (newPkmnParty[0]['currentHp'] < 0) newPkmnParty[0]['currentHp'] = 0;
                pkmnParty[0]['currentHp'] = newPkmnParty[0]['currentHp']
                return newPkmnParty;
            });
            return dmg;
        }
    }

    async function handleMoveClick(e) {
        if (!canAttack) return false;

        canAttack = false;
        canSwitch = false;

        const oppMove = getRandomMove(oppPkmn['moves'])
        const yourMove = e.target.textContent

        const attackOrder = speedCheck(pkmnParty[0], moveJson[yourMove], oppPkmn, moveJson[oppMove]);

        const yourDmg = damageCalc(pkmnParty[0], moveJson[yourMove], oppPkmn);
        const oppDmg = damageCalc(oppPkmn, moveJson[oppMove], pkmnParty[0]);
        
        attackHandler(attackOrder, pkmnParty[0], oppPkmn, yourDmg, oppDmg, damageHandler, 2000);

        await sleep(1000);
        canAttack = true;
        canSwitch = true;
        console.log('actions freed')
    }

    async function handlePkmnSwitch(e) {
        if (!canSwitch) return false;

        canAttack = false;
        canSwitch = false;
        
        const index1 = 0;
        const index2 = Number(e.target.className);
        const leadPkmnHp = pkmnParty[0]['currentHp'];

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

        if (leadPkmnHp > 0) {
            await sleep(1000);
            const oppMove = getRandomMove(oppPkmn['moves'])
            const oppDmg = damageCalc(oppPkmn, moveJson[oppMove], pkmnParty[0]);
            
            attackHandler(['opp', 'none'], pkmnParty[0], oppPkmn, 0, oppDmg, damageHandler, 0, true);
            console.log(pkmnParty)
        }

        await sleep(500);
        canAttack = true;
        canSwitch = true;
        console.log('actions freed')
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
