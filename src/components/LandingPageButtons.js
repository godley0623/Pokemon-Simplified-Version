import React from 'react'

export default function LandingPageButtons(props) {
  return (
    <div className='landing-page-button' onClick={props.clickCB}>
        <h1>{props.text}</h1>
    </div>
  )
}
