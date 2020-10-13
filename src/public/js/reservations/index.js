import axios from 'axios';
import * as time from '../utils/time';
import * as render from '../utils/markup/movieStartTime';
import { resetSelectedSeats } from './seat-reservations';
import updateEJStemplate from '../utils/ejsupdate';

let socket = io('localhost:5001', { query: `screenId=${$('#screen-avl__times-list .time').eq(0).data('id')}` });
// --------------------------
// A timer where if it reaches 0:00 will cancel any reservations created by that visitor; If they have not
// reached the checkout phase of the transaction.
function setTimer(timeLeft) {
  $('#mycart__timer span').text(timeLeft);
}
// --------------------------
// checks for any reservations, any seats with the class active(reserved). If any is found, it applies the attribute 
// disabled to that seat preventing any other visitors from reserving it concurrently.
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
// --------------------------
// When triggered updates the current data with the new screenId request.
async function updateScreenInfo(screenId) {
  socket.emit('update seats', screenId);
  socket.on('update reserved seats', ({ seats }) => {
    setSeatingGrid(seats);
  });

  const response = await axios.get(`/api/movies/screens/${screenId}`);

  const screenRoom = response.data.screen.screenRoom;
  $('#screenRoom').text(screenRoom);
}
// --------------------------
// Targeted towards the dates being screened.  
$('#screen-dates-list').scroll(function() {
  const movieId = location.pathname.toString().split('/')[2];
  // scrolltimer is used as a way to improve user friendliness and avoid multiple calls to the api. 
  // From the inital scroll, the timer starts and if scrolling has stopped for xxxms( set to 800ms) it proceeds
  // and makes the call to the api fetching the new startTimes for that day. Otherwise ClearTimeout will be
  // hit on the next scroll resetting the timeout.
  let scrollTimer;

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
});
// --------------------------
// using the info provided in the parameters it removes the the old time list if any, replacing it with 
// the dates playing for the date selected. 
async function getMovieStartTimes(movieId, selectedDate) {
  $('#screen-avl__times-list').remove();
  $('#screen-avl__times').append(updateEJStemplate(render.movieStartTimeLoader()));

  const response = await axios.get(`/api/movies/${movieId}?date=${selectedDate}`);
  
  $('#screen-avl__times-list').remove();
  $('#screen-avl__times').append(updateEJStemplate(render.movieStartTime(), { times: response.data.schedule.times }));

  return response.data.schedule;
}
// ------------------------
// event handler for when a start time is clicked. If different from the current selected time, changes
// to the newly selected time, cancels/removes any reservations created prior to the new time clicked, and 
// updates screen info. Otherwise nothing is done.
function changeStartTime() {
  const screenId = $(this).data('id');
  const currentScreenId = $('#screen-avl__times-list .time.active').data('id');

  if(screenId !== currentScreenId) {
    $('#screen-avl__times-list .time').removeClass('active');
    $(this).addClass('active');
    // ------------------------
    // remove selected seats and unreserve them.
    $('#mycart__list .mycart__item').each((idx, item) => {
      resetSelectedSeats($(item).data('id'));
    });
    updateScreenInfo(screenId);
  }
}

$('#screen-avl__times').on('click', '#screen-avl__times-list .time', changeStartTime);

$(document).ready(() => {
  // ------------------------
  // helps render page with most current information
  updateScreenInfo($('#screen-avl__times-list .time.active').data('id'));
  // ------------------------
  // reservation timer starts once everything has been rendered.
  time.startTimer(900, setTimer);
});