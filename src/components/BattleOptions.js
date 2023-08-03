import React from 'react'

export default function BattleOptions(props) {
  return (
    <div className={`${props.name} option`}>
        {`${props.title} Battle`}
        {props.options.length > 0 &&
            <select>
            {props.options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
            </select>
        }
        <div className='battle-button' onClick={props.clickCB}>Battle</div>
    </div>
  )
}
