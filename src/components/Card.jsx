import PropTypes from "prop-types";

export default function Card({ sprite, name, onClick }) {
  return (
    <button type="button" className="card" onClick={onClick}>
      <p>{name}</p>
      <img src={sprite} alt={name} />
    </button>
  );
}

Card.propTypes = {
  sprite: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Card.defaultProps = {
  sprite: `./Missingno_RB.png`,
  name: "Missingno",
};
