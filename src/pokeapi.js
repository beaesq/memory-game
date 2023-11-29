function getRandomNumbers(amount, start, end) {
  const list = [];
  while (list.length < amount) {
    const num = Math.round(Math.random() * (end - start));
    if (!list.includes(num)) {
      list.push(num);
    }
  }
  return list;
}

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

async function getPokemon(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const message = `Error fetching individual pokemon data: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  const pokemon = {
    name: capitalizeFirstLetter(data.name),
    sprite: data.sprites.versions["generation-i"]["red-blue"].front_gray,
  };
  return pokemon;
}

export default async function getList(amount = 12, start = 1, end = 151) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${end + start - 1}&offset=${
      start - 1
    }`,
  );
  if (!response.ok) {
    const message = `Error fetching pokemon range: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  const indexList = getRandomNumbers(amount, start, end);
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
