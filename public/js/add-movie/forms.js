import render from './renderPartials';
import PathLoader from './pathLoader';
const apiKey = 'b8f31fc4';
const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}&`;

const resetFields = results => {
  $('.list-group-item').remove();
  results.clear();
}

const setCustomImage = poster => {
  const url = poster.split('_');
  url[2] = 'SX700.jpg';
  const newUrl = url.join('_');
  return newUrl;
}

const promptSuccess = () => {
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

  // call to omdbapi movie db for info if there is displays list : prompts user to nothing found
$('#search_input').keyup(() => {
  let results = new Set([]);
// array which will feed the ul data from the raw results set array after optimization
  let optimizedResults = [];

  if($('#search_input').val() === '') {
    $('.search_sug').addClass('hide');
    resetFields(optimizedResults, results);
  } else {
    $('.search_sug').removeClass('hide');

    axios.get(`${baseUrl}s=${$('#search_input').val()}`)
    .then(res => {
      if(res.data.Error === 'Movie not found!') {
        $('.list-group-item').remove();
        $('.search_sug').append(render.noSearchResults(`No results found for "${$('#search_input').val()}"`));
      }else {
        res.data.Search.map(mov => results.add(mov));
        
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
          $('.search_sug').append(render.searchItem(mov));
        })
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
});

// next functions toggles results on the inputs focus
// make it happen ^^^

// handles the user click on the item from the search results
$('.list-group.search_sug').on('click', '.list-group-item', function() {
  $('.srh-results').remove();
  $('.search_sug').addClass('hide');
  $('.loader').removeClass('hide');

  const movieId = $(this).data('id');
  axios.get(`${baseUrl}i=${movieId}&plot=full`)
  .then(res => {
    $('.loader').addClass('hide');
    
    $('.db-view .srh-form').removeClass('empty');
    $('.img-wrapper').removeClass('hide');
    $('.btn-prim').removeClass('hide');
    $('.img-wrapper img').attr('src', setCustomImage(res.data.Poster));
    $('.input-inline.body div').append(render.searchData(res.data));
  })
  .catch(err => console.log(err));
});

$('.srh-form button').on('click', function() {
  console.log($('#multiTheatreRoomSelect').val());

  axios
  .post('/admin/add', { movieId: $('.srh-results').data('id') })
  .then(res => {
    $('.dashboard').append(render.successMessage($('.srh-results').data('title')));
    $('.srh-results').remove();
    $('.img-wrapper').addClass('hide');
    $('.btn-prim').addClass('hide');
    $('#search_input').val('');
    $('#multiTheatreRoomSelect').val('');
      promptSuccess();
      setTimeout(() => {
        promptSuccess();
        $('.success-message').remove();
        $('srh-results').remove();
        $('.db-view .srh-form').addClass('empty');
      }, 2000);
    })
  .catch(function(err) {
    console.log(err);
  })
})