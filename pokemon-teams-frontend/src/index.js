const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

document.addEventListener("DOMContentLoaded", function() {
  fetchTrainers();
});

function fetchTrainers() {
  const trainersUrl = "http://localhost:3000/trainers";
  return fetch(trainersUrl)
    .then(response => response.json())
    .then(json => {
      renderTrainers(json);
      fetchPokemons();
    });
}

function renderTrainers(json) {
  const main = document.getElementsByTagName("main")[0];
  json.forEach(trainer => {
    const div = document.createElement("div");
    div.setAttribute("class", "card");
    div.setAttribute("data-id", `${trainer.id}`);
    main.appendChild(div);
    const p = document.createElement("p");
    p.textContent = `${trainer.name}`;
    div.appendChild(p);
    const addButton = document.createElement("button");
    addButton.setAttribute("data-trainer-id", `${trainer.id}`);
    addButton.textContent = "Add Pokemon";
    addButton.addEventListener("click", onClickAdd);
    div.appendChild(addButton);
    const ul = document.createElement("ul");
    div.appendChild(ul);
  });
}

function fetchPokemons() {
  const pokemonsUrl = "http://localhost:3000/pokemons";
  return fetch(pokemonsUrl)
    .then(response => response.json())
    .then(json => renderPokemons(json));
}

function renderPokemons(json) {
  const cards = document.getElementsByClassName("card");
  const idToUl = {};
  for (const card of cards) {
    const cardTrainerId = card.getAttribute("data-id");
    const ul = card.getElementsByTagName("ul")[0];
    idToUl[cardTrainerId] = ul;
  }
  json.forEach(pokemon => {
    const li = document.createElement("li");
    li.textContent = `${pokemon.nickname} (${pokemon.species})`;
    const releaseButton = document.createElement("button");
    releaseButton.class = "release";
    releaseButton.setAttribute("data-pokemon-id", `${pokemon.id}`);
    releaseButton.textContent = "Release";
    li.appendChild(releaseButton);
    const pokemonTrainerId = pokemon["trainer_id"].toString();
    const ul = idToUl[pokemonTrainerId];
    ul.appendChild(li);

    releaseButton.addEventListener("click", onClickDelete);
  });
}

function onClickDelete(event) {
  const releaseButton = event.currentTarget;
  const pokemonId = releaseButton.getAttribute("data-pokemon-id");
  fetchPokemonDelete(pokemonId);
}

function fetchPokemonDelete(id) {
  const url = "http://localhost:3000/pokemons";
  return fetch(url + "/" + id, {
    method: "delete"
  })
    .then(response => response.json())
    .then(clearPokemons)
    .then(fetchPokemons);
}

function clearPokemons() {
  const cards = document.getElementsByClassName("card");
  for (const card of cards) {
    const ul = card.getElementsByTagName("ul")[0];
    ul.innerHTML = "";
  }
}

function fetchPokemonAdd(id) {
  let data = { trainer_id: id };
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  };
  fetch("http://localhost:3000/pokemons", configObj)
    .then(response => response.json())
    .then(object => {
      console.log(object);
      renderPokemons([object]);
    });
}

function onClickAdd(event) {
  const addButton = event.currentTarget;
  const list = addButton.parentElement.getElementsByTagName("li");
  if (list.length < 6) {
    const trainerId = addButton.getAttribute("data-trainer-id");
    fetchPokemonAdd(trainerId);
  } else {
    alert("Stop being so greedy!");
  }
}
