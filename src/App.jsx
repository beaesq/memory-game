import { useEffect, useState } from "react";
import "./App.css";
import getList from "./pokeapi";
import CardContainer from "./components/CardContainer";

function App() {
  const [list, setList] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    getList().then((response) => {
      setList(response);
    });
  }, []);

  function increaseScore() {
    setScore(score + 1);
  }

  function resetScore() {
    setScore(0);
  }

  return (
    <div>
      <p>Score: {score}</p>
      <CardContainer
        list={list}
        increaseScore={() => increaseScore()}
        resetScore={() => resetScore()}
      />
    </div>
  );
}

export default App;
