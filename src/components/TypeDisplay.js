import React from 'react'

export default function TypeStrong(props) {
  return (
    <div className='type-display-container'>
        <div className='label'>{props.label}</div>
        <div className='types'>
          {props.types.map((type, index) => (
              <img key={index} src={type} alt='pokemon type' />
          ))}
        </div>
    </div>
  )
}
