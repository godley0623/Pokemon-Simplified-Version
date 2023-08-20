import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PokemonPartyFooter from '../components/PokemonPartyFooter'
import bg from '../assets/backgroundImages/type-matchup-bg.jpeg'
import { setPageBackground } from '../controller/controller'
import shopItems from '../data/shop.json'
import '../styles/shopPage.css'
import '../styles/partyFooter.css'

import evolutionStone from '../assets/itemSprites/evolution-stone.png'
import tmRandom from '../assets/itemSprites/tm-random.png'
import vsSeeker from '../assets/itemSprites/vs-seeker.png'
import leftovers from '../assets/itemSprites/leftovers.png'
import sitrusBerry from '../assets/itemSprites/sitrus-berry.png'
import normalMove from '../assets/itemSprites/normal-move.png'
import grassMove from '../assets/itemSprites/grass-move.png'
import waterMove from '../assets/itemSprites/water-move.png'

const itemObj = {
    'evolution-stone.png': evolutionStone,
    'tm-random.png': tmRandom,
    'vs-seeker.png': vsSeeker,
    'leftovers.png': leftovers,
    'sitrus-berry.png': sitrusBerry,
    'normal-move.png': normalMove,
    'grass-move.png': grassMove,
    'water-move.png': waterMove
}

const items = shopItems['shop']
const itemQuanityArray = []
for(let i=0; i<items.length; i++) {
    if (items[i]['sprite'] === 'name') {
        items[i]['sprite'] = items[i]['item'].split(' ').join('-').toLowerCase() + '.png'
    }
    itemQuanityArray.push(1);
}

const currentMoney = Number(localStorage.getItem('PSV: money'))



export default function ShopPage() {
    const navigate = useNavigate();
    setPageBackground();

    const [itemQuanity, setItemQuanity] = useState(itemQuanityArray);
    const [money, setMoney] = useState(currentMoney);

    useEffect(() => {
        const pkmnParty = localStorage.getItem('PSV: pkmn-party')
        if (!pkmnParty) navigate('/play')
    }, [])

    function handleIncreaseQuanity(index) {
        const cloneQuanity = [...itemQuanity]
        cloneQuanity[index]++

        setItemQuanity(cloneQuanity)
    }

    function handleDecreaseQuanity(index) {
        if (itemQuanity[index] === 1) return
        
        const cloneQuanity = [...itemQuanity]
        cloneQuanity[index]--

        setItemQuanity(cloneQuanity)
    }

    function handleQuanityChange(e, index) {
        return
        // const cloneQuanity = [...itemQuanity]
        // cloneQuanity[index] = Number(e.target.value)

        // setItemQuanity(cloneQuanity)
    }

    return (
    <div className='shop-page'>
        <div id='stat-display'></div>
        <div className='shop-items'>
            {items.map((item, key) => (
                <div key={key} className='shop-item-container'>
                    <div className='sprite-container'>
                        <img src={itemObj[item['sprite']]} alt='item sprite'/>
                    </div>
                    
                    <h4>{item['item']}</h4>
                    
                    <div className='quanity-container'>
                        <button onClick={() => handleDecreaseQuanity(key)}>-</button>
                        <input onChange={(e, key) => handleQuanityChange(e, key)} value={itemQuanity[key]}></input>
                        <button onClick={() => handleIncreaseQuanity(key)}>+</button>
                    </div>

                    {money >= item['price']*itemQuanity[key] &&
                        <h4 className='price-text green'>{item['price']*itemQuanity[key]}</h4>
                    }
                    {money < item['price']*itemQuanity[key] &&
                        <h4 className='price-text red'>{item['price']*itemQuanity[key]}</h4>
                    }

                    <button className='buy-button'>Buy</button>
                </div>
            ))}
        </div>
        <PokemonPartyFooter />
    </div>
  )
}
