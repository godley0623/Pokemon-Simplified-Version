import React from 'react'

export default function NavBar() {
  return (
    <div className='navbar'>
        <div className='title-container'>
            <h3>Pokemon: Simplified Version</h3>
        </div>
        <div className='nav-options-container'>
            <h4 className='your-team'>Your Team</h4>
            <h4 className='pokebox'>PokeBox</h4>
            <h4 className='type-matchups'>Type Matchups</h4>
        </div>
    </div>
  )
}
