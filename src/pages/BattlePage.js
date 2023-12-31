import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { setPageBackground, capFirstLetter, sleep } from '../controller/controller'
import { damageCalc, speedCheck, getRandomMove, attackHandler, faintHandler, fullHealParty, handleTrainerMoves, addBattleText, aiRandom, aiWeakness, lostCheck } from '../controller/pkmnBattleController';
import { addMoney, addMove } from '../controller/pkmnDataBaseController';
import { setAudio, stopAudio } from '../controller/audioController';
import '../styles/battlePage.css';
import '../styles/type.css';
import moveJson from '../data/moves.json';
import grassBg from '../assets/pokemonBWBG/battle_bg_grass.png';
//import indoorBg from '../assets/pokemonBWBG/battle_bg_indoor.png';
import pokeball from '../assets/pokeball.png';

let canAttack = true;
let canSwitch = true;

let trainerPkmnParty = [];
let trainerPkmnFainted = [];
let battleTextArr = [];

let bgm;
let pkmnPartyTracker = [];

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
    const [battleText, setBattleText] = useState([]);
    const [btTracker, setBtTracker] = useState(0);
    const [gameState, setGameState] = useState('');

    const yourPkmnImg = useRef(null);
    const oppPkmnImg = useRef(null);
    const battleTextRef = useRef(null);

    const bgStyle = {
        backgroundImage: `url(${grassBg})`,
        backgroundSize: '100% 100%',
    };

    useEffect(() => {
    }, [yourPkmnImg])
    useEffect(() => {
    }, [oppPkmnImg])

    useEffect(() => {
        battleTextArr = []
        if (param !== 'wild' && param !== 'trainer') navigate('/play')

        const lsParty = JSON.parse(localStorage.getItem('PSV: pkmn-party'));
        fullHealParty(lsParty);
        setPkmnParty(lsParty);

        addBattleText(`${capFirstLetter(lsParty[0]['name'])} was sent out!`, battleTextArr, setBtTracker)
        
        if (!localStorage.getItem('PSV: wild-pkmn') && param === 'wild') {
            navigate('/play');
        } else if (param === 'wild') {
            let wildPkmn = JSON.parse(localStorage.getItem('PSV: wild-pkmn'));
            wildPkmn = addMove(wildPkmn, 'random');
            setOppPkmn(wildPkmn);
            localStorage.removeItem('PSV: wild-pkmn');
            
            bgm = setAudio('wild');
            bgm.play();
        }

        if (!localStorage.getItem('PSV: trainer') && param === 'trainer') {
            navigate('/play');
        } else if (param === 'trainer') {
            let trainerObj = JSON.parse(localStorage.getItem('PSV: trainer'));
            trainerPkmnParty = handleTrainerMoves(trainerObj.pkmnParty);

            setTrainer(trainerObj);
            setOppPkmn(trainerPkmnParty[0]);
            let bt = `${trainerObj.trainerClass} ${trainerObj.name} sent out ${capFirstLetter(trainerPkmnParty[0].name)}`
            addBattleText(bt, battleTextArr, setBtTracker)
            localStorage.removeItem('PSV: trainer');

            bgm = setAudio(trainerObj.bgm);
            console.log(bgm)
            bgm.play();
        }
    },[navigate, param])

    useEffect(() => {
        if (oppPkmn['name']) {
            if (param === 'wild') {
                setTitleText(`A wild ${capFirstLetter(oppPkmn['name'])} appeared!`)
            } else if (param === 'trainer') {
                setTitleText(`${trainer.trainerClass} ${trainer.name} wants to battle!`)
            }
        }
        setOppHp([oppPkmn['hp'], oppPkmn['currentHp']])
    }, [oppPkmn, param, trainer.name, trainer.trainerClass])

    useEffect(() => {
        if (pkmnParty[0]) {
            setYourHp([pkmnParty[0]['hp'], pkmnParty[0]['currentHp']])
        }
        pkmnPartyTracker = pkmnParty
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
        if (yourHp[1] <= 0) {
            addBattleText(`${capFirstLetter(pkmnPartyTracker[0]['name'])} fainted!`, battleTextArr, setBtTracker)
        }
        
    }, [yourHp])

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

    useEffect(() => {
        if (oppHp[1] === 0 && param !== 'wild') {
            setTimeout(() => {
                let bt = `The opposing ${capFirstLetter(trainerPkmnParty[0].name)} fainted`
                addBattleText(bt, battleTextArr, setBtTracker)
                const faintedPkmn = trainerPkmnParty.shift()
                trainerPkmnFainted.push(faintedPkmn)

                if (trainerPkmnParty.length > 0) {
                    setOppPkmn(trainerPkmnParty[0])
                    setOppHp([trainerPkmnParty[0].hp, trainerPkmnParty[0].currentHp])
                    let bt = `${trainer.trainerClass} ${trainer.name} sent out ${capFirstLetter(trainerPkmnParty[0].name)}`
                    addBattleText(bt, battleTextArr, setBtTracker)
                }else {
                    //Handle Win State
                    let bt = `${trainer.trainerClass} ${trainer.name} is defeated, you've earn 300 poke-dollars`
                    setGameState('Win')
                    addMoney(300)
                    addBattleText(bt, battleTextArr, setBtTracker)
                }
            }, 2000)
        }
    }, [oppHp, param, trainer.name, trainer.trainerClass])

    useEffect(() => {
        if (yourHp[1] === 0 && param !== 'wild') {
            setTimeout(() => {
                let bt = `${capFirstLetter(pkmnParty[0].name)} fainted`
                addBattleText(bt, battleTextArr, setBtTracker)

                if (lostCheck(pkmnParty)) {
                    let bt = `You're out of usable pokemon`
                    setGameState('Lose')
                    addBattleText(bt, battleTextArr, setBtTracker)
                }
            }, 2000)
        }
    }, [yourHp, param, pkmnParty])

    useEffect(() => {
        battleTextRef.current.scrollTop = battleTextRef.current.scrollHeight;
        setBattleText(battleTextArr);
        console.log('testing battle text')
    }, [btTracker])

    useEffect(() => {
        console.log(gameState)
    }, [gameState])

    function handleRun() {
        stopAudio(bgm)
        navigate('/play')
    }

    function handleCatch(e) {
        const pokeball = e.target;
        const partyNum = pkmnParty.length;

        if (param === 'wild') {
            if (oppHp[1] === 0) {
                if (partyNum < 6) {
                    pkmnParty.push(oppPkmn);
                    localStorage.setItem('PSV: pkmn-party', JSON.stringify(pkmnParty));

                    pokeball.classList.add('hidden');
                    addBattleText(`${capFirstLetter(oppPkmn['name'])} was captured! You've earned 150 poke-dollars`, battleTextArr, setBtTracker)
                    addMoney(150)
                }
            } else {
                console.log('You need to defeat the pokemon before you can catch it.')
                addBattleText('You need to defeat the pokemon before you can catch it.', battleTextArr, setBtTracker)
            }
        } else {
            console.log("You can't catch a trainer's Pokemon.")
            addBattleText("You can't catch a trainer's Pokemon.", battleTextArr, setBtTracker)
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
        
        let oppMove;
        if (oppPkmn.ai) {

            if (oppPkmn.ai.length === 1) {
                switch(oppPkmn.ai[0]) {
                    case 'random':
                        oppMove = aiRandom(oppPkmn['moves'])
                    break
                    
                    case 'weakness':
                        oppMove = aiWeakness(oppPkmn['moves'], pkmnParty[0])
                    break

                    default:
                    break
                }
            }

        } else {
            oppMove = aiRandom(oppPkmn['moves'])
        }
        const yourMove = e.target.textContent

        const attackOrder = speedCheck(pkmnParty[0], moveJson[yourMove], oppPkmn, moveJson[oppMove]);

        const yourDmg = damageCalc(pkmnParty[0], moveJson[yourMove], oppPkmn);
        const oppDmg = damageCalc(oppPkmn, moveJson[oppMove], pkmnParty[0]);
        
        attackHandler(attackOrder, pkmnParty[0], oppPkmn, yourDmg[0], oppDmg[0], damageHandler, 2000, false, currentPlayer, currentOpp, yourDmg[1], yourDmg[2], oppDmg[1], oppDmg[2], yourMove, oppMove, battleTextArr, setBtTracker);

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
        console.log(pkmnParty)

        if (pkmnParty[index2]) {
            if (pkmnParty[index2]['currentHp'] <= 0) {
                console.log("You can't switch to a fainted Pokemon.")
                addBattleText("You can't switch to a fainted Pokemon.", battleTextArr, setBtTracker)
                canAttack = true;
                canSwitch = true;
                return false;
            }
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

        if (pkmnParty[index1]['currentHp'] > 0) {
            addBattleText(`${capFirstLetter(pkmnParty[index1]['name'])} was called back, ${capFirstLetter(pkmnParty[index2]['name'])} was sent out!`, battleTextArr, setBtTracker)
        } else {
            addBattleText(`${capFirstLetter(pkmnParty[index2]['name'])} was sent out!`, battleTextArr, setBtTracker)
        }
    
        // Update the state with the modified array
        setPkmnParty(newArray);
        
        let switchTime = 500;
        if (leadPkmnHp > 0) {
            await sleep(1000);
            const oppMove = getRandomMove(oppPkmn['moves'])
            const oppDmg = damageCalc(oppPkmn, moveJson[oppMove], pkmnParty[index2]);
            
            attackHandler(['opp', 'none'], pkmnParty[0], oppPkmn, 0, oppDmg[0], damageHandler, 0, true, currentPlayer, currentOpp, '', '', oppDmg[1], oppDmg[2], '', oppMove, battleTextArr, setBtTracker);
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
                <img className='trainer-img' src={trainer.sprite} alt='trainer sprite' />
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
                    pkmnParty.map((pkmn, key) => {
                        return (<div key={key} className={`icon-container ${key}`}>
                                <img onClick={handlePkmnSwitch} className={`${key}`} src={pkmn['icon']} alt='pokemon icon'/>
                        </div>)
                    })
                    }
                </div>
                
                <div className='run-catch-container'>
                    <div className='catch-container'>
                        <img onClick={handleCatch} className='pokeball' src={pokeball} alt='pokeball sprite'/>
                    </div>
                    <div onClick={handleRun} className='run-container'>Run</div>
                </div>
            </div>
            <div ref={battleTextRef} className='battle-message-box'>
                {battleText.map((text, key) => (
                    <h4 key={key} className='battle-text'>{text}</h4>
                ))}
            </div>
        </div>
    </div>
  )
}
