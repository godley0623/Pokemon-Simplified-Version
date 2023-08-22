import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client';
import PokemonPartyFooter from '../components/PokemonPartyFooter'
import { setPageBackground } from '../controller/controller'
import { itemObj, items} from '../controller/itemController'
import '../styles/bagPage.css'
import '../styles/partyFooter.css'
import EvolutionChoice from '../components/EvolutionChoice';

let root;

let bag = JSON.parse(localStorage.getItem('PSV: bag'))
if (!bag) bag = []

let itemQuanityArr = [];
for (let i=0; i<bag.length; i++) {
    itemQuanityArr.push(bag[i]['quanity'])
}

export default function BagPage() {
    setPageBackground()

    const [itemQuanity, setItemQuanity] = useState(itemQuanityArr)
    const [bagState, setBagState] = useState(bag)

    useEffect(() => {
        root = createRoot(document.getElementById('bag-display'))
        let bag = JSON.parse(localStorage.getItem('PSV: bag'))
        if (!bag) bag = []

        let itemQuanityArr = [];
        for (let i=0; i<bag.length; i++) {
            itemQuanityArr.push(bag[i]['quanity'])
        }
        setItemQuanity(itemQuanityArr)
    }, [])

    function handleButtonClick(index) {
        switch (bag[index]['item']){
            case 'Evolution Stone':
                root.render(<EvolutionChoice root={root} index={index} reduceQuanity={reduceQuanity}/>)
            break;
        }
    }

    function reduceQuanity(index) {
        console.log(bag)
        bag[index]['quanity']--
        if (bag[index]['quanity'] <= 0) {
            bag = bag.slice(0, index).concat(bag.slice(index + 1));
        }
        localStorage.setItem('PSV: bag', JSON.stringify(bag))

        window.location.reload();
    }

  return (
    <div className='bag-page'>
        <div id='bag-display'></div>
        <div id='stat-display'></div>
        {bagState.length === 0 && 
        <h1 className='no-items'>Your bag is empty</h1>
        }
        {bagState.length > 0 && 
        <div className='bag-items'>
            {bagState.map((bagItem, key) => (
                <div key={key} className='bag-item-container'>
                    <div className='sprite-container'>
                        <img src={itemObj[bagItem['sprite']]} alt='item sprite'/>
                    </div>

                    <h4>{bagItem['item']}</h4>

                    <h4>{itemQuanity[key]}x</h4>

                    {bagItem['type'] === 'consume' &&
                    <button onClick={() => handleButtonClick(key)} className='bag-button'>Use</button>
                    }
                    { (bagItem['type'] === 'hold' || bagItem['type'] === 'move') &&
                    <button onClick={() => handleButtonClick(key)} className='bag-button'>Give</button>
                    }
                </div>
            ))}
        </div>
        }
        <PokemonPartyFooter />
    </div>
  )
}
