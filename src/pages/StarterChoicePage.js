import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FirstPokemon from '../components/FirstPokemon'
import '../styles/firstPokemon.css'
import bg from '../assets/backgroundImages/starter-choice-bg.jpeg'
import { setPageBackground } from '../controller/controller'

export default function StarterChoicePage() {
  const navigate = useNavigate()

  useEffect(() => {
    const pkmnParty = localStorage.getItem('PSV: pkmn-party');
    if (pkmnParty) navigate('/play');
  }, [navigate])

  setPageBackground(bg);
  return (
    <div className='starter-choice-page'>
        <FirstPokemon />
    </div>
  )
}
