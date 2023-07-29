import React from 'react'
import { useNavigate } from 'react-router-dom'
import { capFirstLetter } from '../controller/controller'
import { allPkmn, addPkmnToParty } from '../controller/pkmnDataBaseController'

export default function StarterPokemon(props) {
  const pokemon = allPkmn[props.name];
  const navigate = useNavigate()
  function handlePkmnClick() {
    addPkmnToParty(pokemon);
    navigate('/play')
  }

  return (
    <div className='pokemon' onClick={handlePkmnClick}>
        <div className='sprite-container'> <img src={props.sprite} alt='pokemon gen5 sprite'/> </div>
        <div className='name-container'> <h3>{capFirstLetter(props.name)}</h3> </div>
    </div>
  )
}
