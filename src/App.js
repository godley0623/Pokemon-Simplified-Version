import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import StarterChoicePage from './pages/StarterChoicePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/starter-choice' element={<StarterChoicePage />} />
      </Routes>
    </div>
  );
}

export default App;
