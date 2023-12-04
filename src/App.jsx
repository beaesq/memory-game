import { useEffect, useState } from "react";
import "./styles/App.css";
import getList from "./pokeapi";
import CardContainer from "./components/CardContainer";

function App() {
  const [list, setList] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setbestScore] = useState(0);
  const [resetCount, setResetCount] = useState(0);

  useEffect(() => {
    getList().then((response) => {
      setList(response);
    });
  }, [resetCount]);

  function increaseScore() {
    setScore(score + 1);
    if (score + 1 > bestScore) {
      setbestScore(score + 1);
    }
  }

  function resetScore() {
    setScore(0);
  }

  function handleResetClick() {
    setResetCount(resetCount + 1);
    setScore(0);
  }

  return (
    <>
      <header>
        <h1>Generation I Pokémon Memory Game</h1>
        <p className="instructions">
          Try not to click on the same Pokémon twice!
        </p>
        <p className="score">Score: {score}</p>
        <p className="high-score">Best Score: {bestScore}</p>
        <button type="button" onClick={handleResetClick}>
          Reset Pokémon
        </button>
      </header>
      <main>
        <CardContainer
          list={list}
          increaseScore={() => increaseScore()}
          resetScore={() => resetScore()}
        />
      </main>
    </>
  );
}

export default App;
