import render from './utils/searchMarkup';
const apiKey = process.env.APIKEY;
const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}&`;
const { hasAttribute } = require('./utils/helpers');

const clearSearchResults = () => {
  $('#srh-results__list').remove();
  $('#srh-results__poster').remove();
};

const filterSearchResults = (list) => {
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

const searchMovie = title => {
  axios.get(`${baseUrl}s=${title}`)
  .then(res => {
    $('#search__sugg').addClass('collapse');
    getSearchResults(res.data);
  })
};

const getSearchResults = response => {
  if(response.Error === 'Movie not found!') {
    $('.list-group__item').remove();
    $('#search__sugg').append(render.noSearchResults(`No results found for "${$('#search__input').val()}"`));
  }else {
    $('.list-group__item').remove();
    filterSearchResults(response.Search).map(mov => {
      $('#search__sugg').append(render.searchItem(mov));
    });
  }
};

$('#search__input').keyup(() => {
  // if search input is not empty api call is made requesting movies matching the value
  if($('#search__input').val() === '') {
    $('#search__sugg').removeClass('collapse');
  } else {
    searchMovie($('#search__input').val());
  }
});

$('#search__sugg').on('click', '.list-group__item', function() {
  $('#search__sugg').removeClass('collapse');
  $('#loader').css('display', 'block');
  $('#search__input').val('');
  clearSearchResults();

  const movieId = $(this).data('id');

  axios.get(`${baseUrl}i=${movieId}&plot=full`)
  .then(res => {
    $('.no-results-msg').css('display', 'none');
    $('#add-mov-btn').removeAttr('disabled');
    $('#add-mov-btn')[0].scrollIntoView({ behavior: 'smooth' });
    $('#loader').css('display', 'none');
    $('.srh-results').append(render.searchData(res.data));
  })
  .catch(err => console.log(err));
});

$('#add-mov-btn').on('click', function() {
  const isBtnDisabled = $(this).attr('disabled');

  if(!hasAttribute(isBtnDisabled)) {
    const sendData = { movieId: $('#srh-results__list').data('id') };

    axios
    .post('/admin/add-movie', sendData)
    .then(res => {
      clearSearchResults();
      $('.no-results-msg').css('display', 'block');
      $('.btn-prim').attr('disabled', true);
      $('#account__card')[0].scrollIntoView({ behavior: 'smooth' });
      $('body').append(render.successMessage(res.data.Title));
      // data-nma => data-newMovieUpdate
      $('#add-movie').attr('data-nmu', '');
      setTimeout(() => {
        $('body #flash-msg').removeClass('bounce-in-bottom');
        $('body #flash-msg').addClass('slide-out-bottom');
      }, 3000);

      return true;
    })
    .catch(err => console.log(err));
  }
});
