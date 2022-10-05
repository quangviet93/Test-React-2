import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartGame from './page/StartGame';
import CreateGame from './page/CreateGame';
import GameScreen from './page/GameScreen';
import GameHistory from './page/GameHistory';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartGame />}></Route>
        {/* <Route path="/create-game" element={<CreateGame />}></Route> */}
        <Route path="/game-screen" element={<GameScreen />}></Route>
        <Route path="/history" element={<GameHistory />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
