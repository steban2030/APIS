let currentPage = 1;

document.getElementById('searchButton').addEventListener('click', function () {
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    searchAnime(query, currentPage);
  } else {
    alert('Por favor, ingresa un nombre de anime.');
  }
});

function searchAnime(query, page) {
  const url = `https://api.jikan.moe/v4/anime?q=${query}&page=${page}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayResults(data.data);
      pagination(data.pagination);
    })
    .catch(error => {
      console.error('Error al buscar el anime:', error);
      alert('Hubo un error al buscar el anime. Intenta nuevamente.');
    });
}

function displayResults(animes) {
  const resultsContainer = document.getElementById('animeResults');
  resultsContainer.innerHTML = '';

  if (animes.length === 0) {
    resultsContainer.innerHTML = '<p>No se encontraron animes.</p>';
    return;
  }

  animes.forEach(anime => {
    const animeCard = document.createElement('div');
    animeCard.classList.add('col-md-3');
    animeCard.innerHTML = `
      <div class="card">
        <img src="${anime.images.jpg.image_url}" class="card-img-top" alt="${anime.title}">
        <div class="card-body">
          <h5 class="card-title">${anime.title}</h5>
          <p class="card-text">Episodios: ${anime.episodes || 'N/A'}</p>
          <a href="${anime.url}" target="_blank" class="btn btn-primary">Más Info</a>
        </div>
      </div>
    `;
    resultsContainer.appendChild(animeCard);
  });
}

function pagination(paginationData) {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  if (!paginationData) return;

  const prevDisabled = paginationData.has_previous ? "" : "disabled";
  const nextDisabled = paginationData.has_next ? "" : "disabled";

  const html = `
    <li class="page-item ${prevDisabled}">
      <a class="page-link" href="#" onclick="changePage(${paginationData.current_page - 1})">Prev</a>
    </li>
    <li class="page-item ${nextDisabled}">
      <a class="page-link" href="#" onclick="changePage(${paginationData.current_page + 1})">Next</a>
    </li>
  `;

  paginationContainer.innerHTML = html;
}

function changePage(page) {
  currentPage = page;
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    searchAnime(query, currentPage);
  }
}
