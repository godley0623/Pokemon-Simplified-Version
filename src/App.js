import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import StarterChoicePage from './pages/StarterChoicePage';
import TypeMatchupPage from "./pages/TypeMatchupPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/starter-choice' element={<StarterChoicePage />} />
        <Route path='/type-matchup' element={<TypeMatchupPage />} />
      </Routes>
    </div>
  );
}

export default App;
