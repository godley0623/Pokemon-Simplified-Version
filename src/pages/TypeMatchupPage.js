import React, { useState, useEffect, useRef } from 'react'
import bg from '../assets/backgroundImages/type-matchup-bg.jpeg'
import { setPageBackground, lowerFirstLetter } from '../controller/controller'
import '../styles/typeMatchup.css'
import { pkmnTypes, setTypeMatchup, weaknessCheck } from '../controller/pkmnTypesController'
import TypeDisplay from '../components/TypeDisplay'

export default function TypeMatchupPage() {
    setPageBackground(bg);
    const types = ["None", "Fire", "Water", "Grass", "Electric", "Normal", "Flying", "Bug", "Poison", "Rock", "Ground", "Fighting", "Psychic", "Ghost", "Dark", "Steel", "Fairy", "Ice", "Dragon"];

    const [selectedType, setSelectedType] = useState(["None", "None"]);
    const type1Ref = useRef(null);
    const type2Ref = useRef(null);
    
    const [strongAgainst, setStrongAgainst] = useState([]);
    const [weakAgainst, setWeakAgainst] = useState([]);

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
        setStrongAgainst(setTypeMatchup([selectedType[0], selectedType[1]])[3]);
        setWeakAgainst([...weaknessCheck(setTypeMatchup([selectedType[0], selectedType[1]]))['fourXEff'], ...weaknessCheck(setTypeMatchup([selectedType[0], selectedType[1]]))['twoXEff']]);

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
        {selectedType[0] !== 'None' && <TypeDisplay label='Weak Against' types={getTypeImgList(weakAgainst)}/>}
    </div>
  )
}
