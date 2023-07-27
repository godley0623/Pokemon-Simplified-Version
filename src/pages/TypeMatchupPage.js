import React, { useState, useEffect, useRef } from 'react'
import bg from '../assets/backgroundImages/type-matchup-bg.jpeg'
import { setPageBackground } from '../controller/controller'
import '../styles/typeMatchup.css'

export default function TypeMatchupPage() {
    setPageBackground(bg);
    const types = ["None", "Fire", "Water", "Grass", "Electric", "Normal", "Flying", "Bug", "Poison", "Rock", "Ground", "Fighting", "Psychic", "Ghost", "Dark", "Steel", "Fairy", "Ice", "Dragon"];
    const [selectedType, setSelectedType] = useState(["None", "None"]);
    const type1Ref = useRef(null);
    const type2Ref = useRef(null);
    
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
    }, [selectedType])

    function handleType1(e) {
        const t = e.target.value
        setSelectedType([t, selectedType[1]])

    }
    function handleType2(e) {
        const t = e.target.value
        setSelectedType([selectedType[0], t])       
    }
    return (
    <div className='type-matchup-page'>
        <div className='type-selector'>
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
    </div>
  )
}
