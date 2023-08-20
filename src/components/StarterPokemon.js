import React from 'react'
import { useNavigate } from 'react-router-dom'
import { capFirstLetter } from '../controller/controller'
import { allPkmn, addPkmnToParty } from '../controller/pkmnDataBaseController'
import { addMove } from '../controller/pkmnDataBaseController'

export default function StarterPokemon(props) {
  const allPkmnCopy = JSON.parse(JSON.stringify(allPkmn));
  let pokemon = allPkmnCopy[props.name];
  pokemon = addMove(pokemon, 'Normal');
  const navigate = useNavigate()
  function handlePkmnClick() {
    addPkmnToParty(pokemon);
    localStorage.setItem('PSV: money', '500');
    navigate('/play');
  }

  return (
    <div className='pokemon' onClick={handlePkmnClick}>
        <div className='sprite-container'> <img src={props.sprite} alt='pokemon gen5 sprite'/> </div>
        <div className='name-container'> <h3>{capFirstLetter(props.name)}</h3> </div>
    </div>
  )
}
