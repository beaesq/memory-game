import { useEffect, useState } from "react";
import "./App.css";
import getList from "./pokeapi";
import Card from "./components/Card";

function App() {
  const [list, setList] = useState(null);

  useEffect(() => {
    getList().then((response) => {
      console.log(response);
      setList(response);
    });
  }, []);

  return (
    <div>
      {list && <Card sprite={list[0].sprite} name={list[0].name} onClick="" />}
    </div>
  );
}

export default App;
