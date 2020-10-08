const axios = require('axios');
const render = require('../helpers/markup/movieStartTime');
const time = require('../../../utils/lib/time');
const updateEJStemplate = require('../helpers/ejsupdate');

let socket = io('localhost:5001', { query: `screenId=${$('#screen-avl__times-list .time').eq(0).data('id')}` });

function setTimer(timeLeft) {
  $('#mycart__timer span').text(timeLeft);
}

function setSeatingGrid(seats) {
  $('.seat-wrapper button').prop('disabled', false);

  seats.forEach(reservation => {
    reservation.reserved.forEach(seat => {
      if(!$(`.seat-wrapper[data-id="${seat}"]`).children().hasClass('active')) {
        $(`.seat-wrapper[data-id="${seat}"]`).children().prop('disabled', true);
      }
    })
  })
}

async function updateScreenInfo(screenId) {
  console.log('called')
  socket.emit('update seats', screenId);

  const response = await axios.get(`/api/movies/screens/${screenId}`);

  const screenRoom = response.data.screen.screenRoom;
  $('#screenRoom').text(screenRoom);

  socket.on('update reserved seats', ({ seats }) => {
    setSeatingGrid(seats);
  });
}

async function getMovieStartTimes(movieId, selectedDate) {
  $('#screen-avl__times-list').remove();
  $('#screen-avl__times').append(updateEJStemplate(render.movieStartTimeLoader()));

  const response = await axios.get(`/api/movies/${movieId}?date=${selectedDate}`);
  
  $('#screen-avl__times-list').remove();
  $('#screen-avl__times').append(updateEJStemplate(render.movieStartTime(), { times: response.data.schedule.times }));

  return response.data.schedule;
}

$('#screen-avl__times').on('click', '#screen-avl__times-list .time', function() {
  const screenId = $(this).data('id');

  $('#screen-avl__times-list .time').removeClass('active');
  $(this).addClass('active');

  updateScreenInfo(screenId);
})

$(document).ready(() => {
  let scrollTimer;
  const movieId = location.pathname.toString().split('/')[2];

  $('#screen-dates-list').scroll(function() {
    clearTimeout(scrollTimer);

    scrollTimer = setTimeout(() => {
      $('.screen-avl__date').each(async function() {

        const maxOffset = $(window).width() > 700 ? 480 : 145;
        const minOffset = $(window).width() > 700 ? 460 : 130;

        if($(this).offset().left >= minOffset && $(this).offset().left <= maxOffset) {
          const selectedDate = $(this).data('date');  
          
          window.history.pushState('', '', `?date=${selectedDate}`);

          const schedule = await getMovieStartTimes(movieId, selectedDate);
          updateScreenInfo(schedule.times[0].id);
        } 
      })
    }, 800);
  })

  socket.on('update seats', ({ seats }) => {
    setSeatingGrid(seats);
  });

  time.startTimer(900, setTimer);
})

exports.connectedSocket = socket;