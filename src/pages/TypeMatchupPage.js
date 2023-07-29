import React, { useState, useEffect, useRef } from 'react'
import bg from '../assets/backgroundImages/type-matchup-bg.jpeg'
import { setPageBackground, lowerFirstLetter } from '../controller/controller'
import '../styles/typeMatchup.css'
import { pkmnTypes, setTypeMatchup, weaknessCheck } from '../controller/pkmnTypesController'
import { getAllPkmnByType } from '../controller/pkmnDataBaseController'
import TypeDisplay from '../components/TypeDisplay'
import TMPokemonBox from '../components/TMPokemonBox'

export default function TypeMatchupPage() {
    setPageBackground(bg, '', 'rgb(233,242,235)');
    const types = ["None", "Fire", "Water", "Grass", "Electric", "Normal", "Flying", "Bug", "Poison", "Rock", "Ground", "Fighting", "Psychic", "Ghost", "Dark", "Steel", "Fairy", "Ice", "Dragon"];

    const [selectedType, setSelectedType] = useState(["None", "None"]);
    const type1Ref = useRef(null);
    const type2Ref = useRef(null);
    
    const [strongAgainst, setStrongAgainst] = useState([]);
    const [strongAgainst2, setStrongAgainst2] = useState([]);
    const [weakAgainst, setWeakAgainst] = useState([]);
    const [resistance, setResistance] = useState([]);
    const [immunity, setImmunity] = useState([]);

    const [pkmnList, setPkmnList] = useState([]);

    useEffect(() => {
        if (selectedType[0] === selectedType[1] && selectedType[0] !== "None") {
            setSelectedType([selectedType[0], "None"]);
            type2Ref.current.value = "None";
        }
        if (selectedType[0] === "None" && selectedType[1] !== "None") {
            setSelectedType(["None", "None"]);
            type1Ref.current.value = "None";
            type2Ref.current.value = "None";
        }
        setStrongAgainst(setTypeMatchup([selectedType[0], 'None'])[3]);
        setStrongAgainst2(setTypeMatchup(['None', selectedType[1]])[3]);
        setWeakAgainst([...weaknessCheck(setTypeMatchup([selectedType[0], selectedType[1]]))['fourXEff'], ...weaknessCheck(setTypeMatchup([selectedType[0], selectedType[1]]))['twoXEff']]);
        setResistance([...weaknessCheck(setTypeMatchup([selectedType[0], selectedType[1]]))['fourXRes'], ...weaknessCheck(setTypeMatchup([selectedType[0], selectedType[1]]))['twoXRes']]);
        setImmunity(weaknessCheck(setTypeMatchup([selectedType[0], selectedType[1]]))['immune']);

        console.log(getAllPkmnByType([selectedType[0], selectedType[1]]))
        setPkmnList(getAllPkmnByType([selectedType[0], selectedType[1]]))

    }, [selectedType])

    function handleType1(e) {
        const t = e.target.value
        setSelectedType([t, selectedType[1]])

    }
    function handleType2(e) {
        const t = e.target.value
        setSelectedType([selectedType[0], t])       
    }

    function getTypeImgList(types) {
        const typeImages = [];

        types.forEach((type) => {
            typeImages.push(pkmnTypes[lowerFirstLetter(type)])
        })

        return typeImages;
    }
    return (
    <div className='type-matchup-page'>
        <div className='type-selector'>
            <div className='selector-container'>
                <select className='type-1' onChange={handleType1} ref={type1Ref}>
                    {types.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                    ))}
                </select>
                <select className='type-2' onChange={handleType2} ref={type2Ref}>
                    {types.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div className='type-img-container'>
                {selectedType[0] !== 'None' && <img src={pkmnTypes[lowerFirstLetter(selectedType[0])]} alt='pokemon types'/>}
                {selectedType[1] !== 'None' && <img src={pkmnTypes[lowerFirstLetter(selectedType[1])]} alt='pokemon types'/>}
            </div>
        </div>
        {selectedType[0] !== 'None' && selectedType[1] === 'None' && <TypeDisplay label='Strong Against' types={getTypeImgList(strongAgainst)}/>}
        {selectedType[0] !== 'None' && selectedType[1] !== 'None' && <TypeDisplay label={`Strong Against (${selectedType[0]})`} types={getTypeImgList(strongAgainst)}/>}
        {selectedType[0] !== 'None' && selectedType[1] !== 'None' && <TypeDisplay label={`Strong Against (${selectedType[1]})`} types={getTypeImgList(strongAgainst2)}/>}

        {selectedType[0] !== 'None' && <TypeDisplay label='Weak Against' types={getTypeImgList(weakAgainst)}/>}
        {selectedType[0] !== 'None' && <TypeDisplay label='Resistances' types={getTypeImgList(resistance)}/>}
        {selectedType[0] !== 'None' && <TypeDisplay label='Immunities' types={getTypeImgList(immunity)}/>}

        {selectedType[0] !== 'None' && <TMPokemonBox icons={pkmnList} />}
    </div>
  )
}
