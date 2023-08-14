import _ from 'lodash';
import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { setPageBackground, capFirstLetter, sleep } from '../controller/controller'
import { damageCalc, speedCheck, getRandomMove, attackHandler, faintHandler, fullHealParty } from '../controller/pkmnBattleController';
import { addMove } from '../controller/pkmnDataBaseController'
import '../styles/battlePage.css';
import moveJson from '../data/moves.json';
import grassBg from '../assets/pokemonBWBG/battle_bg_grass.png';
import indoorBg from '../assets/pokemonBWBG/battle_bg_indoor.png';
import pokeball from '../assets/pokeball.png';

let canAttack = true;
let canSwitch = true;

export default function BattlePage() {    
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

    const yourPkmnImg = useRef(null);
    const oppPkmnImg = useRef(null);

    const bgStyle = {
        backgroundImage: `url(${grassBg})`,
        backgroundSize: '100% 100%',
    };

    //const oppPkmnImg = document.querySelector('.opp-pkmn-img');
    //const yourPkmnImg = document.querySelector('.your-pkmn-img');

    
    useEffect(() => {
    }, [yourPkmnImg])
    useEffect(() => {
    }, [oppPkmnImg])

    useEffect(() => {
        if (param !== 'wild') navigate('/play')

        const lsParty = JSON.parse(localStorage.getItem('PSV: pkmn-party'));
        fullHealParty(lsParty);
        setPkmnParty(lsParty);
        
        if (!localStorage.getItem('PSV: wild-pkmn') && param === 'wild') {
            navigate('/play');
        } else {
            let wildPkmn = JSON.parse(localStorage.getItem('PSV: wild-pkmn'));
            wildPkmn = addMove(wildPkmn, 'random');
            setOppPkmn(wildPkmn);
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

        faintHandler(yourPkmnImg, yourHp, 750);

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
        
        faintHandler(oppPkmnImg, oppHp, 750);

    }, [oppHp, oppFillColor])

    function handleRun() {
        navigate('/play')
    }

    function handleCatch(e) {
        const pokeball = e.target;
        const partyNum = pkmnParty.length;

        if (param === 'wild') {
            if (oppHp[1] === 0) {
                if (partyNum < 6) {
                    pkmnParty.push(oppPkmn);
                    console.log(pkmnParty);
                    localStorage.setItem('PSV: pkmn-party', JSON.stringify(pkmnParty));

                    pokeball.classList.add('hidden');
                }
            } else {
                console.log('You need to defeat the pokemon before you can catch it.')
            }
        } else {
            console.log("You can't catch a trainer's Pokemon.")
        }
    }

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
        const currentPlayer = yourPkmnImg.current;
        const currentOpp = oppPkmnImg.current;

        if (!canAttack) return false;
        if (oppPkmn['currentHp'] <= 0 || pkmnParty[0]['currentHp'] <= 0) return false;

        canAttack = false;
        canSwitch = false;

        const oppMove = getRandomMove(oppPkmn['moves'])
        const yourMove = e.target.textContent

        const attackOrder = speedCheck(pkmnParty[0], moveJson[yourMove], oppPkmn, moveJson[oppMove]);

        const yourDmg = damageCalc(pkmnParty[0], moveJson[yourMove], oppPkmn);
        const oppDmg = damageCalc(oppPkmn, moveJson[oppMove], pkmnParty[0]);
        
        attackHandler(attackOrder, pkmnParty[0], oppPkmn, yourDmg[0], oppDmg[0], damageHandler, 2000, false, currentPlayer, currentOpp, yourDmg[1], yourDmg[2], oppDmg[1], oppDmg[2]);

        await sleep(3000);
        canAttack = true;
        canSwitch = true;
        console.log('actions freed')
        currentPlayer.classList.remove('attack-player');
        currentOpp.classList.remove('attack-opp');
    }

    async function handlePkmnSwitch(e) {
        if (!canSwitch) return false;

        const currentPlayer = yourPkmnImg.current;
        const currentOpp = oppPkmnImg.current;

        canAttack = false;
        canSwitch = false;
        
        const index1 = 0;
        const index2 = Number(e.target.className);
        const leadPkmnHp = pkmnParty[0]['currentHp'];

        if (pkmnParty[index2]['currentHp'] <= 0) {
            console.log("You can't switch to a fainted Pokemon.")
            canAttack = true;
            canSwitch = true;
            return false;
        }

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
        
        let switchTime = 500;
        if (leadPkmnHp > 0) {
            await sleep(1000);
            const oppMove = getRandomMove(oppPkmn['moves'])
            const oppDmg = damageCalc(oppPkmn, moveJson[oppMove], pkmnParty[index2]);
            
            attackHandler(['opp', 'none'], pkmnParty[0], oppPkmn, 0, oppDmg[0], damageHandler, 0, true, currentPlayer, currentOpp, '', '', oppDmg[1], oppDmg[2]);
            switchTime = 1000;
        }

        await sleep(switchTime);
        canAttack = true;
        canSwitch = true;
        console.log('actions freed')
        currentPlayer.classList.remove('attack-player');
        currentOpp.classList.remove('attack-opp');
      };


  return (
    <div className='battle-page' >
        <div className='battle-container'>
            <h1 className='title'>{`${titleText}`}</h1>
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
                        <img className={'opp-pkmn-img'} ref={oppPkmnImg} src={oppPkmn['sprite'][0]} alt='opponent pokemon sprite' />
                    </div>
                    }
                    {pkmnParty[0] &&
                    <div className='your-field'>
                        <img className={'your-pkmn-img'} ref={yourPkmnImg} src={pkmnParty[0]['sprite'][1]} alt='your pokemon sprite' />
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
            <div className='party-catch-container'>
                <div className='battle-party-container'>
                    {pkmnParty &&
                    pkmnParty.map((pkmn, key) => (
                    <div key={key} className={`icon-container ${key}`} onClick={handlePkmnSwitch}>
                            <img className={`${key}`} src={pkmn['icon']} alt='pokemon icon'/>
                    </div> 
                    ))
                    }
                </div>
                
                <div className='run-catch-container'>
                    <div className='catch-container'>
                        <img onClick={handleCatch} className='pokeball' src={pokeball} alt='pokeball sprite'/>
                    </div>
                    <div onClick={handleRun} className='run-container'>Run</div>
                </div>
            </div>
            <div className='battle-message-box'></div>
        </div>
    </div>
  )
}
