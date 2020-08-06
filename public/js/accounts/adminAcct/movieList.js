const { hasAttribute } = require('./utils/helpers');
const { updateTemplate } = require('../../utils/ejsupdate');
const render = require('../../utils/markup/tableMarkup');

function resetTableview() {
  $('#overview #now-playing-table').remove();
  $('#adj-movie #now-playing-table').remove();
}

function resetDisplayMsg() {
  $('#overview #no-results-msg').remove();
  $('#adj-movie #no-results-msg').remove();
}

function refreshAdminTodoList() {
  axios.get('/admin/nowplaying')
  .then(res => {
    resetTableview();
    $('#add-movie').removeAttr('data-nmu');

    if(res.data.moviesInTheater.length > 0) {
      resetDisplayMsg();
      $('#overview').append(updateTemplate(render.tablesawTable(false), { currentlyPlaying: res.data.moviesInTheater } ));
      $('#adj-movie').append(updateTemplate(render.tablesawTable(true), { currentlyPlaying: res.data.moviesInTheater } ));
    } else {
      $("#overview, #adj-movie").append(updateTemplate(render.noneCurrentlyPlaying));
    }
  })
} 

$('#overview-tab, #adj-movie-tab').click( function() {  
  if(hasAttribute($('#add-movie').attr('data-nmu'))) {
    refreshAdminTodoList();
  }
})

$('#adj-movie').on('click', '#mov-row', function() {
  const selectedId = $(this).data('id');
  alert(`deleting ${selectedId}`);
})