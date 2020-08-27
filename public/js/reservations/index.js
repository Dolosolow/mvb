const axios = require('axios');
const render = require('../utils/markup/movieStartTime');
const { startTimer } = require('../utils/stopwatch');
const { updateTemplate } = require('../utils/ejsupdate');
let socket = io('localhost:5001', { query: `screenId=${$('#screen-avl__times-list .time').eq(0).data('id')}` });

const setTimer = timeLeft => {
  $('#mycart__timer span').text(timeLeft);
}

const setSeatingGrid = seats => {
  $('.seat-wrapper button').prop('disabled', false);

  seats.forEach(reservation => {
    reservation.reserved.forEach(seat => {
      if(!$(`.seat-wrapper[data-id="${seat}"]`).children().hasClass('active')) {
        $(`.seat-wrapper[data-id="${seat}"]`).children().prop('disabled', true);
      }
    })
  })
}

$('#screen-avl__times').on('click', '#screen-avl__times-list .time', function() {
  const screenId = $(this).data('id');

  $('#screen-avl__times-list .time').removeClass('active');
  $(this).addClass('active');
  socket.emit('change screen', screenId);

  socket.on('update reserved seats', ({ seats }) => {
    setSeatingGrid(seats);
  });
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
          try {
            const response = await axios.get(`/api/movies/${movieId}?date=${selectedDate}`);
            $('#screen-avl__times-list').remove();
            $('#screen-avl__times').append(updateTemplate(render.movieStartTime(), { times: response.data.schedule.times }));
            

            socket.emit('change screen', response.data.schedule.times[0].id);

            socket.on('update reserved seats', ({ seats }) => {
              setSeatingGrid(seats);
            });

          } catch (err) {
            console.log(err)
          }
        } 
      })
    }, 800);
  })

  socket.on('find reserved seats', ({ seats }) => {
    setSeatingGrid(seats);
  });

  startTimer(900, setTimer);
})

exports.connectedSocket = socket;