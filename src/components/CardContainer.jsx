import PropTypes from "prop-types";
import { useState } from "react";
import Card from "./Card";

function randomizeOrder(length) {
  const tempOrder = [];
  while (tempOrder.length < length) {
    const num = Math.floor(Math.random() * length);
    if (!tempOrder.includes(num)) {
      tempOrder.push(num);
    }
  }
  return tempOrder;
}

export default function CardContainer({ list, increaseScore, resetScore }) {
  const [clicked, setClicked] = useState([]);
  // loading text
  if (list.length === 0) {
    return <p className="loading">Loading...</p>;
  }
  const order = randomizeOrder(list.length);

  function addToClicked(value) {
    const newClicked = clicked.slice();
    newClicked.push(value);
    setClicked(newClicked);
  }

  function handleClick(value) {
    if (clicked.length % list.length === 0) {
      increaseScore();
      setClicked([value]);
    } else if (clicked.includes(value)) {
      setClicked([]);
      resetScore();
    } else {
      addToClicked(value);
      increaseScore();
    }
  }

  return (
    <ul>
      {order.map((index) => (
        <li key={list[index].name}>
          <Card
            sprite={list[index].sprite}
            name={list[index].name}
            onClick={() => handleClick(list[index].name)}
          />
        </li>
      ))}
    </ul>
  );
}

CardContainer.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, sprite: PropTypes.string }),
  ).isRequired,
  increaseScore: PropTypes.func.isRequired,
  resetScore: PropTypes.func.isRequired,
};
