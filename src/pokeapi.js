function getRandomNumbers(amount, length) {
  const list = [];
  while (list.length < amount) {
    const num = Math.floor(Math.random() * length);
    if (!list.includes(num)) {
      list.push(num);
    }
  }
  return list;
}

function formatName(string) {
  let newString = string;
  if (string.includes("mime")) {
    newString = newString.replace("-", ". ");
  } else if (string.includes("-") && string.includes("nido")) {
    newString = newString.replace("-", " (");
    newString += ")";
  }
  return newString.replace(/(?<=\b)\w/g, (match) => match.toUpperCase());
}

function getSprite(data) {
  if (data.sprites.versions["generation-i"]["red-blue"].front_gray) {
    return data.sprites.versions["generation-i"]["red-blue"].front_gray;
  }
  return data.sprites.front_default;
}

async function getPokemon(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const message = `Error fetching individual pokemon data: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  const pokemon = {
    name: formatName(data.name),
    sprite: getSprite(data),
  };
  return pokemon;
}

export default async function getList(amount = 12, offset = 0, limit = 151) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  );
  if (!response.ok) {
    const message = `Error fetching pokemon range: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  const indexList = getRandomNumbers(amount, data.results.length);
  return Promise.all(
    indexList.map((index) => getPokemon(data.results[index].url)),
  )
    .then((results) => results)
    .catch((error) => {
      const message = `Error making pokemon list: ${error}`;
      throw new Error(message);
    });
}

// for testing
// if (process.env.NODE_DEV === "TEST") {
//   module.exports.getRandomNumbers = getRandomNumbers;
// }
