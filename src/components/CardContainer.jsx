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

export default function CardContainer({ list }) {
  const [clicked, setClicked] = useState([]);
  // loading text
  if (list.length === 0) {
    return <p className="loading">Loading...</p>;
  }
  const order = randomizeOrder(list.length);
  console.log(`clicked: ${clicked}`);

  function handleClick(value) {
    const newClicked = clicked.slice();
    newClicked.push(value);
    setClicked(newClicked);
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
};
