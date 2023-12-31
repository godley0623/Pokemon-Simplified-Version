import React from 'react'
import { useNavigate } from 'react-router-dom'
import bg from '../assets/backgroundImages/type-matchup-bg.jpeg'
import { setPageBackground } from '../controller/controller'
import { getPkmnParty, setWildPkmn, setTrainer } from '../controller/pkmnDataBaseController'
import PokemonPartyFooter from '../components/PokemonPartyFooter'
import MobileNavBar from '../components/MobileNavBar'
import BattleOptions from '../components/BattleOptions'
import '../styles/playPage.css'

export default function PlayPage() {
    const navigate = useNavigate();
    setPageBackground(bg, 'cover');

    function goToStarterPage() {
        navigate('/starter-choice')
    }

    function handleWildBattle() {
        const wildPkmn = setWildPkmn();
        localStorage.setItem('PSV: wild-pkmn', JSON.stringify(wildPkmn));
        navigate('/battle/wild');
    }

    function handleTrainerBattle() {
        const trainer = setTrainer();
        localStorage.setItem('PSV: trainer', JSON.stringify(trainer));
        navigate('/battle/trainer');
    }
    
  return (
    <div className='play-page'>
        <MobileNavBar />
        <div id='stat-display'></div>
        {!getPkmnParty() && 
            <div className='get-starter-pokemon'>
                <p>You don't have any Pokemon</p>
                <div className='button' onClick={goToStarterPage}>Get A Pokemon</div>
            </div>
        }
        {getPkmnParty() &&
            <>
                <div className='battle-options'>
                    <BattleOptions title='Wild' name='wild-battle' options={['Plains']} clickCB={handleWildBattle}/>
                    <BattleOptions title='Trainer' name='trainer-battle' options={['Easy', 'Normal', 'Hard']} clickCB={handleTrainerBattle}/>
                    <BattleOptions title='Gym' name='gym-battle' options={['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Random']} />
                </div>
                <PokemonPartyFooter />
            </>
        }
    </div>
  )
}
