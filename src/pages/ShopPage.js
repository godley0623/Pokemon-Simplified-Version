import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PokemonPartyFooter from '../components/PokemonPartyFooter'
import { setPageBackground } from '../controller/controller'
import { itemObj, items, itemQuanityArray } from '../controller/itemController'
import '../styles/shopPage.css'
import '../styles/partyFooter.css'


let bag;



export default function ShopPage() {
    const navigate = useNavigate();
    setPageBackground();

    const currentMoney = Number(localStorage.getItem('PSV: money'))
    console.log(currentMoney)

    const [itemQuanity, setItemQuanity] = useState(itemQuanityArray);
    const [money, setMoney] = useState(currentMoney);

    useEffect(() => {
        const pkmnParty = localStorage.getItem('PSV: pkmn-party')
        if (!pkmnParty) navigate('/play')

        bag = localStorage.getItem('PSV: bag')
        if (!bag) {
            bag = []
            localStorage.setItem('PSV: bag', JSON.stringify(bag))
        } else {
            bag = JSON.parse(localStorage.getItem('PSV: bag'))
        }
    }, [navigate])

    useEffect(() => {
        localStorage.setItem('PSV: money', JSON.stringify(money))
    }, [money])

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

    function handleBuy(index) {
        if (money < (items[index]['price'] * itemQuanity[index]) ) return

        setMoney(prevMoney => prevMoney - (items[index]['price'] * itemQuanity[index]))

        const item = {
            'item': items[index]['item'],
            'type': items[index]['type'],
            'sprite': items[index]['sprite'],
            'desc': items[index]['desc'],
            'quanity': itemQuanity[index]
        }

        if (bag.length === 0) {
            bag.push(item)
            localStorage.setItem('PSV: bag', JSON.stringify(bag))
            return
        } else {
            for (let i=0; i<bag.length; i++) {
                if (bag[i]['item'] === item['item']) {
                    bag[i]['quanity'] += item['quanity']
                    localStorage.setItem('PSV: bag', JSON.stringify(bag))
                    return
                }
            }
            bag.push(item)
            localStorage.setItem('PSV: bag', JSON.stringify(bag))
            return
        }
    }

    return (
    <div className='shop-page'>
        <h1>Shop</h1>
        {money && <h2 className='money green'>{money}</h2>}
        {!money && <h2 className='money red'>{money}</h2>}
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

                    <button onClick={() => handleBuy(key)} className='buy-button'>Buy</button>
                </div>
            ))}
        </div>
        <PokemonPartyFooter />
    </div>
  )
}
