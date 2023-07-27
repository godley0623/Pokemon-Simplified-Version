import React from 'react'
import FirstPokemon from '../components/FirstPokemon'
import '../styles/firstPokemon.css'
import bg from '../assets/backgroundImages/starter-choice-bg.jpeg'
import { setPageBackground } from '../controller/controller'

export default function StarterChoicePage() {
    setPageBackground(bg);
  return (
    <div className='starter-choice-page'>
        <FirstPokemon />
    </div>
  )
}
