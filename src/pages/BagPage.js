import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PokemonPartyFooter from '../components/PokemonPartyFooter'
import { setPageBackground } from '../controller/controller'
import { itemObj, items} from '../controller/itemController'
import '../styles/bagPage.css'
import '../styles/partyFooter.css'

let bag = JSON.parse(localStorage.getItem('PSV: bag'))
if (!bag) bag = []

let itemQuanityArr = [];
for (let i=0; i<bag.length; i++) {
    itemQuanityArr.push(bag[i]['quanity'])
}

export default function BagPage() {
    setPageBackground()

    const [itemQuanity, setItemQuanity] = useState(itemQuanityArr)

  return (
    <div className='bag-page'>
        <div id='stat-display'></div>
        {bag.length === 0 && 
        <h1 className='no-items'>Your bag is empty</h1>
        }
        {bag.length > 0 && 
        <div className='bag-items'>
            {bag.map((bagItem, key) => (
                <div className='bag-item-container'>
                    <div className='sprite-container'>
                        <img src={itemObj[bagItem['sprite']]} alt='item sprite'/>
                    </div>

                    <h4>{bagItem['item']}</h4>

                    <h4>{itemQuanity[key]}x</h4>

                    {bagItem['type'] === 'consume' &&
                    <button className='bag-button'>Use</button>
                    }
                    { (bagItem['type'] === 'hold' || bagItem['type'] === 'move') &&
                    <button className='bag-button'>Give</button>
                    }
                </div>
            ))}
        </div>
        }
        <PokemonPartyFooter />
    </div>
  )
}
