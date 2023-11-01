import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/mobileNavBar.css'


export default function MobileNavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const currentRoute = location.pathname;

    function handleBack() {
        navigate('/play')
    }
    function handleShop() {
        navigate('/shop')
    }
    function handleBag() {
        navigate('/bag')
    }

  return (
    <div className='mobile-navbar'>   
        {currentRoute === '/play' && <div className='footer-buttons'>
            <div className='box'>Box</div>
            <div onClick={handleBag} className='bag'>Bag</div>
            <div onClick={handleShop} className='shop'>Shop</div>
        </div>}
        {currentRoute === '/shop' && <div className='footer-buttons'>
            <div className='box'>Box</div>
            <div onClick={handleBag} className='bag'>Bag</div>
            <div onClick={handleBack} className='back'>Back</div>
        </div>}
        {currentRoute === '/bag' && <div className='footer-buttons'>
            <div className='box'>Box</div>
            <div onClick={handleShop} className='shop'>Shop</div>
            <div onClick={handleBack} className='back'>Back</div>
        </div>}
    </div>
  )
}
