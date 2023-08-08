import React from 'react'
import { capFirstLetter } from '../controller/controller'

export default function PkmnStatDisplay(props) {
  return (
    <div className='pkmn-stat-display'>
        <div className='pkmn-stat-container'>
            <img src={props.pkmn.sprite[0]} alt='pokemon sprite'/>
            <h3 className='pkmn-name'>{capFirstLetter(props.pkmn.name)}</h3>
            <div className='pkmn-type-container'></div>
            <div className='pkmn-stats'>
                <p>{`HP: ${props.pkmn.hp}`}</p>
                <p>{`ATK: ${props.pkmn.atk}`}</p>
                <p>{`DEF: ${props.pkmn.def}`}</p>
                <p>{`SPD: ${props.pkmn.spd}`}</p>
            </div>
            <div className='move-container'></div>
            <div className='button-container'>
                <div className='front-button'>Front</div>
                <div className='box-button'>Box</div>
                <div className='matchup-button'>Matchups</div>
                <div className='release-button'>Release</div>
            </div>
        </div>
    </div>
  )
}
