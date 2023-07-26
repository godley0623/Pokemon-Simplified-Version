import React from 'react'

export default function StarterPokemon(props) {
  return (
    <div className='pokemon'>
        <div className='sprite-container'> <img src={props.sprite}/> </div>
        <div className='name-container'> <h3>{props.name}</h3> </div>
    </div>
  )
}
