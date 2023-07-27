import React from 'react'
import { capFirstLetter } from '../controller/controller'

export default function StarterPokemon(props) {
  return (
    <div className='pokemon'>
        <div className='sprite-container'> <img src={props.sprite} alt='pokemon gen5 sprite'/> </div>
        <div className='name-container'> <h3>{capFirstLetter(props.name)}</h3> </div>
    </div>
  )
}
