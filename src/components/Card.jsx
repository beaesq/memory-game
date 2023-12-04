import PropTypes from "prop-types";

export default function Card({ sprite, name, onClick }) {
  return (
    <button type="button" className="card" onClick={onClick}>
      <img src={sprite} alt={name} />
      <p>{name}</p>
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
