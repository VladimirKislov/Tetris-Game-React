import { Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/home/Home";
import Game from "./pages/game/Game";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="tetris-to-play" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
