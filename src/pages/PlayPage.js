import React from 'react'
import { useNavigate } from 'react-router-dom'
import bg from '../assets/backgroundImages/type-matchup-bg.jpeg'
import { setPageBackground } from '../controller/controller'
import { getPkmnParty } from '../controller/pkmnDataBaseController'
import PokemonPartyFooter from '../components/PokemonPartyFooter'

import '../styles/playPage.css'

export default function PlayPage() {
    const navigate = useNavigate();
    setPageBackground(bg, 'cover');

    function goToStarterPage() {
        navigate('/starter-choice')
    }
  return (
    <div className='play-page'>
        {!getPkmnParty() && 
            <div className='get-starter-pokemon'>
                <p>You don't have any Pokemon</p>
                <div className='button' onClick={goToStarterPage}>Get A Pokemon</div>
            </div>
        }
        {getPkmnParty() &&
            <PokemonPartyFooter />
        }
    </div>
  )
}
