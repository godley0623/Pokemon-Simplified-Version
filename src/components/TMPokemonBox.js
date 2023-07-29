import React from 'react'

export default function TMPokemonBox(props) {
  return (
    <div className='tm-box-container'>
        <div className='label'>Pokemon of this type</div>
        <div className='pokemon-icon-container'>
            {props.icons.map((icon, index) => (
            <div key={index} className='pokemon-icon'> <img key={index} src={icon['icon']} alt='pokemon icon' /> </div>
            ))}
        </div>
    </div>
  )
}
