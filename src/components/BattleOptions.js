import React, { useEffect } from 'react'

export default function BattleOptions(props) {
  
  useEffect(() => {
    localStorage.setItem('PSV: trainerDiff', 'Easy');
    localStorage.setItem('PSV: gymRegion', 'Kanto');
  }, [])

  function handleOptions(e) {
    console.log(props.title, e.target.value)
    if (props.title === 'Trainer') {
      localStorage.setItem('PSV: trainerDiff', e.target.value);
    } else if (props.title === 'Gym') {
      localStorage.setItem('PSV: gymRegion', e.target.value);
    }
  }
  
  return (
    <div className={`${props.name} option`}>
        {`${props.title} Battle`}
        {props.options.length > 0 &&
            <select onChange={handleOptions}>
            {props.options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
            </select>
        }
        <div className='battle-button' onClick={props.clickCB}>Battle</div>
    </div>
  )
}
