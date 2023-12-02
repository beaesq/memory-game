import { useEffect, useState } from "react";
import "./App.css";
import getList from "./pokeapi";
import CardContainer from "./components/CardContainer";

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList().then((response) => {
      setList(response);
    });
  }, []);

  return (
    <div>
      <CardContainer list={list} />
    </div>
  );
}

export default App;
