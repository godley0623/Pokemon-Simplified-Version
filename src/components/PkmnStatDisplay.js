import React from 'react'
import { capFirstLetter } from '../controller/controller'
import '../styles/statDisplay.css'
import { pkmnTypes } from '../controller/pkmnTypesController'

export default function PkmnStatDisplay(props) {

    const pkmnType1 = pkmnTypes[props.pkmn.type[0]];
    const pkmnType2 = pkmnTypes[props.pkmn.type[1]];

    function closeDisplay() {
        props.root.render(<></>);
    }

    function handleFrontButton() {
        const pkmnParty = JSON.parse(localStorage.getItem('PSV: pkmn-party'));
        const partyClone = [...pkmnParty];

        pkmnParty[0] = partyClone[props.index];
        pkmnParty[props.index] = partyClone[0];

        props.setPkmnParty(pkmnParty);

        localStorage.setItem('PSV: pkmn-party', JSON.stringify(pkmnParty));

        closeDisplay();
    }

  return (
    <div className='pkmn-stat-display'>
        <div className='pkmn-stat-container'>
            <img src={props.pkmn.sprite[0]} alt='pokemon sprite'/>
            <h3 className='pkmn-name'>{capFirstLetter(props.pkmn.name)}</h3>
            <div className='pkmn-type-container'>
                <img src={pkmnType1} alt='pokemon type 1' />
                {pkmnType2 && <img src={pkmnType2} alt='pokemon type 2'/>}
            </div>
            <div className='pkmn-stats'>
                <p>{`HP: ${props.pkmn.hp}`}</p>
                <p>{`ATK: ${props.pkmn.atk}`}</p>
                <p>{`DEF: ${props.pkmn.def}`}</p>
                <p>{`SPD: ${props.pkmn.spd}`}</p>
            </div>
            <div className='move-container'>
                Moves
                <div className='moves'>
                    {props.pkmn['moves'].map((move, key) => (
                        <img key={key} src={pkmnTypes[`${move.toLowerCase()}`]} alt='pokemon type'/>
                    ))}
                </div>
            </div>
            <div className='button-container'>
                <div onClick={handleFrontButton} className='front-button'>Front</div>
                <div className='box-button'>Box</div>
                <div className='matchup-button'>Matchups</div>
                <div className='release-button'>Release</div>
            </div>
        </div>
    </div>
  )
}
