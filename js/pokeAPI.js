const API_POKEMON = "https://pokeapi.co/api/v2/pokemon?limit=20";

function getPokemon(api) {
  fetch(api)
    .then((response) => response.json())
    .then((json) => {
      fillData(json.results), pagination(json.previous, json.next);
    })
    .catch((error) => {
      console.log(error, "Error consumiendo la PokeAPI");
    });
}

function fillData(results) {
  let cards = "";
  results.forEach((pokemon) => {
    fetch(pokemon.url)
      .then((response) => response.json())
      .then((details) => {
        cards += `
<div class="col">
<div class="card h-100" style="width: 12rem;">
<img src="${details.sprites.front_default}" class="card-img-top" alt="${details.name
          }">
<h2 class="card-title">${details.name}</h2>
<div class="card-body">
<h5 class="card-title">ID: ${details.id}</h5>
<h5 class="card-title">Tipo: ${details.types
            .map((t) => t.type.name)
            .join(", ")}</h5>
</div>
</div>
</div>`;
        document.getElementById("pokemon-container").innerHTML = cards;
      });
  });
}

function pagination(prev, next) {
  let html = `
    <li class="page-item ${!prev ? "disabled" : ""}">
      <a class="page-link" onclick="getPokemon('${prev}')">Prev</a>
    </li>
    <li class="page-item ${!next ? "disabled" : ""}">
      <a class="page-link" onclick="getPokemon('${next}')">Next</a>
    </li>
  `;
  document.getElementById("pagination").innerHTML = html;
}

getPokemon(API_POKEMON);
