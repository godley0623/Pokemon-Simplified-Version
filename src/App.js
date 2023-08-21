import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import StarterChoicePage from './pages/StarterChoicePage';
import TypeMatchupPage from "./pages/TypeMatchupPage";
import PlayPage from "./pages/PlayPage";
import BattlePage from "./pages/BattlePage";
import ShopPage from "./pages/ShopPage";
import BagPage from "./pages/BagPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/play' element={<PlayPage />} />
        <Route path='/starter-choice' element={<StarterChoicePage />} />
        <Route path='/type-matchup' element={<TypeMatchupPage />} />
        <Route path='/battle/:type' element={<BattlePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/bag' element={<BagPage />} />
      </Routes>
    </div>
  );
}

export default App;
