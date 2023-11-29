import { useEffect, useState } from "react";
import "./App.css";
import getList from "./pokeapi";

function App() {
  console.log("hello");
  let [list, setList] = useState(null);
  useEffect(() => {
    getList().then((response) => {
      console.log(response);
    });
  }, []);
  return <></>;
}

export default App;
