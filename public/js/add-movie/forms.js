const apiKey = 'b8f31fc4';
const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}&`;

const renderSearchItem = (data) => {
  return `
    <li class="list-group-item" data-id="${data.imdbID}">
      <img src="${data.Poster}" alt="movie" height="60px">
      <div class="list-group-item-inner">
        <h6 class="title">${data.Title}</h6>
        <h6>${data.Year}</h6>
      </div>
    </li>
  `
}

const renderNoResults = str => {
  return `
    <li class="list-group-item na">
      <h6>${str}</h6>
    </li>
  `
}

const renderData = data => {
  return `
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
}

const renderSuccessMsg = title => {
  return `
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
}

const resetFields = (optimizedResults, results) => {
  $('.search_sug').css('display', 'none');
  $('.list-group-item').remove();
  // optimizedResults = [];
  results.clear();
}

const setCustomImage = poster => {
  const url = poster.split('_');
  url[2] = 'SX600.jpg';
  const newUrl = url.join('_');
  return newUrl;
}

  // call to omdbapi movie db for info if there is displays list : prompts user to nothing found
$('#search_input').keyup(() => {
  let results = new Set([]);
// array which will feed the ul data from the raw results set array after optimization
  let optimizedResults = [];

  if($('#search_input').val() === '') {
    resetFields(optimizedResults, results);
  }

  axios.get(`${baseUrl}s=${$('#search_input').val()}`)
  .then(res => {
    if(res.data.Error === 'Movie not found!') {
      $('.list-group-item').remove();
      $('.search_sug').append(renderNoResults(`No results found for "${$('#search_input').val()}"`));
    }else {
      $('.search_sug').css('display', 'block');
      res.data.Search.map(mov => {
        results.add(mov)
      });
      
      results.forEach(val => {
        if(val.Title.toLowerCase().includes($('#search_input').val())) {
          if(optimizedResults.length < 5) {
              optimizedResults.push(val);
          }
        }
      });
// resets previous results search state, removing items from the ul for next matching values
      $('.list-group-item').remove();
      optimizedResults.map((mov, i) => {
        $('.search_sug').append(renderSearchItem(mov))
      })
    }
  })
  .catch(err => {
    console.log(err);
  })
});

// next functions toggles results on the inputs focus
// make it happen ^^^

// handles the user click on the item from the search results
$('.list-group.search_sug').on('click', '.list-group-item', function() {
  $('.srh-results').remove();
  $('.search_sug').css('display', 'none');
  $('.loader').css('display', 'block');

  const movieId = $(this).data('id');
  axios.get(`${baseUrl}i=${movieId}&plot=full`)
  .then(res => {
    $('.loader').css('display', 'none');
    
    $('.db-view form').removeClass('empty');
    $('.img-wrapper').removeClass('hide');
    $('.btn-add').removeClass('hide');
    $('.search_sug').css('display', 'none');
    $('.img-wrapper img').attr('src', setCustomImage(res.data.Poster));
    $('.input-inline.body').append(renderData(res.data));
  })
  .catch(err => console.log(err));
});

$('.db-view form').submit(function(e) {
  e.preventDefault();

  console.log($('#multiTheatreRoomSelect').val());

  axios
  .post('/admin/add', { movieId: $('.srh-results').data('id') })
  .then((res) => {
    $('.dashboard').append(renderSuccessMsg($('.srh-results').data('title')));
    $('.srh-results').remove();
    $('.img-wrapper').addClass('hide');
    $('.btn-add').addClass('hide');
    $('#search_input').val('');
    $('#multiTheatreRoomSelect').val('');
      proptSuccess();
      setTimeout(() => {
        proptSuccess();
        $('.success-message').remove();
        $('srh-results').remove();
        $('.db-view form').addClass('empty');
      }, 2000);
    })
  .catch(function(err) {
    console.log(err);
  })
})

const proptSuccess = () => {
  let svg = document.querySelector('.icon-checkmark path');
  svg = new PathLoader(svg);

  if($('.dashboard').hasClass('active')) {
    $('.dashboard').removeClass('active');
    svg.setProgress(0);
    return;
  }
  $('.dashboard').addClass('active');
  svg.setProgress(1);
}