import React, { useState, useEffect } from 'react'

export default function PokemonPartyFooter() {
    const [pkmnParty, setPkmnParty] = useState(JSON.parse(localStorage.getItem('PSV: pkmn-party')))

    useEffect(() => {
        console.log(pkmnParty)
        if (!pkmnParty) setPkmnParty([])
    }, [])

  return (
    <div className='pkmn-party-footer'>
        {pkmnParty.map((pkmn, index) => (
            <div key={index} className='icon-container'>
                <img src={pkmn['icon']} alt='pokemon icon'/>
            </div>
        ))}
    </div>
  )
}
