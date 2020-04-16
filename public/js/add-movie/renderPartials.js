module.exports = {
  searchItem: data => (
    `
    <li class="list-group-item" data-id="${data.imdbID}">
      <img src="${data.Poster}" alt="movie" height="60px">
      <div class="list-group-item-inner">
        <h6 class="title">${data.Title}</h6>
        <h6>${data.Year}</h6>
      </div>
    </li>
  `
  ),
  noSearchResults: str => (
    `
    <li class="list-group-item na">
      <h6>${str}</h6>
    </li>
  `
  ),
  searchData: data => (
    `
    <ul class="srh-results" data-id="${data.imdbID}" data-title="${data.Title}">
      <li>
        Title: <span>${data.Title}</span>
      </li>
      <li>
        Rated: <span>${data.Rated}</span>
      </li>
      <li>
        Runtime: <span>${data.Runtime}</span>
      </li>
      <li>
        Genre: <span>${data.Genre}</span>
      </li>
      <li>
        Plot: <span>${data.Plot}</span>
      </li>
      <li>
        Actors: <span>${data.Actors}</span>
      </li>
    </ul>
  `
  ),
  successMessage: title => (
    `
    <div class="success-message">
      <svg viewBox="0 0 76 76" class="success-message__icon icon-checkmark">
          <circle cx="38" cy="38" r="36"/>
          <path fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M17.7,40.9l10.9,10.9l28.7-28.7"/>
      </svg>
      <h1 class="success-message__title">Success</h1>
      <div class="success-message__content">
          <p>${title} has been successfully added</p>
      </div>
    </div>
    `
  )
}