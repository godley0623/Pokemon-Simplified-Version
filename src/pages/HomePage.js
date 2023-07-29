import React from 'react'
import { useNavigate } from 'react-router-dom';
import LandingPageButton from '../components/LandingPageButtons'
import '../styles/homePage.css'
import bg from '../assets/backgroundImages/home-page-bg.jpeg';
import { setPageBackground } from '../controller/controller';


export default function HomePage() {
    setPageBackground(bg);
    const navigate = useNavigate();
    function goToTypeMatchupPage() {
        window.open("/type-matchup", "_blank");
    }
    function goToPlayPage() {
        navigate('/play')
    }
  return (
    <div className='home-page'>
        <div className='button-container'>
            <div className='non-play'>
                <LandingPageButton text='Type Matchups' clickCB={goToTypeMatchupPage}/>
                <LandingPageButton text='GitHub'/>
            </div>
            <div className='play'>
                <LandingPageButton text='Play' clickCB={goToPlayPage}/>
            </div>
        </div>
    </div>
  )
}
