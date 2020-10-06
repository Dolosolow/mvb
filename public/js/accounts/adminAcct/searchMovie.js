const { hasAttribute } = require('../../utils/global');
const apiKey = process.env.APIKEY;
const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}&`;
const render = require('../../helpers/markup/searchMarkup');

function clearSearchResults() {
  $('#srh-results__list').remove();
  $('#srh-results__poster').remove();
};

function filterSearchResults(list) {
  let results = new Set([]);
  let optimizedResults = [];

  list.map(searchItem => results.add(searchItem));

  results.forEach(result => {
    if(result.Title.toLowerCase().includes($('#search__input').val())) {
      if(optimizedResults.length < 5) {
          optimizedResults.push(result);
      }
    }
  });

  return optimizedResults;
};

async function searchMovie(title) {
  const foundMovie = await axios.get(`${baseUrl}s=${title}`);
  $('#search__sugg').addClass('collapse');
  getSearchResults(foundMovie.data);
};

function getSearchResults(response) {
  $('.list-group__item').remove();

  if(response.Error === 'Movie not found!') {
    $('#search__sugg').append(render.noSearchResults(`No results found for "${$('#search__input').val()}"`));
  }else {
    filterSearchResults(response.Search).map(mov => {
      $('#search__sugg').append(render.searchItem(mov));
    });
  }
};

$('#search__input').keyup(() => {
  if($('#search__input').val() === '') {
    $('#search__sugg').removeClass('collapse');
  } else {
    searchMovie($('#search__input').val());
  }
});

$('#search__sugg').on('click', '.list-group__item', async function() {
  $('#search__sugg').removeClass('collapse');
  $('#loader').css('display', 'block');
  $('#search__input').val('');
  clearSearchResults();

  const movieId = $(this).data('id');
  const foundMovie = await axios.get(`${baseUrl}i=${movieId}&plot=full`);

  $('.no-results-msg').css('display', 'none');
  $('#add-mov-btn').removeAttr('disabled');
  $('#add-mov-btn')[0].scrollIntoView({ behavior: 'smooth' });
  $('#loader').css('display', 'none');
  $('.srh-results').append(render.searchData(foundMovie.data));
});

$('#add-mov-btn').on('click', async function() {
  const isBtnDisabled = $(this).attr('disabled');

  if(!hasAttribute(isBtnDisabled)) {
    const sendData = { movieId: $('#srh-results__list').data('id') };

    const response = await axios.post('/api/movies/add-movie', sendData);
    clearSearchResults();
    $('.no-results-msg').css('display', 'block');
    $('.btn-prim').attr('disabled', true);
    $('#account__card')[0].scrollIntoView({ behavior: 'smooth' });
    $('body').append(render.successMessage(response.data.Title));
    $('#add-movie').attr('data-nmu', '');

    setTimeout(() => {
      $('body #flash-msg').removeClass('slide-in-bottom');
      $('body #flash-msg').addClass('slide-out-bottom');
    }, 3000);
  }
});
