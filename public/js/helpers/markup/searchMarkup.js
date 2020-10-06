const noSearchResults = str => (
  `
  <li class="list-group__item flex-row flex-center p-md">
    <h6>${str}</h6>
  </li>
`
);

const searchData = data => (
  `
  <ul id="srh-results__list" class="srh-results-list flex-column" data-id="${data.imdbID}" data-title="${data.Title}">
    <li>
      <span class="text-red">Title:</span>
      <p class="srh-results__title">${data.Title}</p>
    </li>
    <li>
      <span class="text-red">Rated:</span>
      <p class="srh-results__rated">${data.Rated}</p>
    </li>
    <li>
      <span class="text-red">Runtime:</span>
      <p class="srh-results__runtime">${data.Runtime}</p>
    </li>
    <li>
      <span class="text-red">Genre:</span>
      <p class="srh-results__genre">${data.Genre.split(',').splice(1, 2).join(',')}</p>
    </li>
    <li>
      <span class="text-red">Actors:</span>
      <p class="srh-results__actors">${data.Actors}</p>
    </li>
    <li>
      <span class="text-red">Plot:</span>
      <p class="srh-results__plot">${data.Plot}</p>
    </li>
  </ul>
  <div id="srh-results__poster" class="img-wrapper">
    <img
      src="${data.Poster}"
      alt="${data.Title}"
      width="100%"
      height="100%"
    />
  </div>
`
);

const searchItem = data => (
  `
  <li class="list-group__item flex-row align-center" data-id="${data.imdbID}">
    <img src="${data.Poster}" alt="${data.Title}" height="80rem" onerror="this.src='assets/images/svg/popcorn-alt.svg'">
    <div class="list-group__body">
      <h6 class="title">${data.Title}</h6>
      <h6>${data.Year}</h6>
    </div>
  </li>
  `
);

const successMessage = title => (
  `
  <div id="flash-msg" class="flash-msg flex-row flex-center slide-in-bottom">
    <div class="flash-msg__content">
      <h4>Success! &nbsp;${title} added</h4>
    </div>
  </div>
  `
);

module.exports = {
  noSearchResults,
  searchData,
  searchItem,
  successMessage
}