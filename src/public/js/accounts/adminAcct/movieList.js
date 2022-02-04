import { hasAttribute } from "client_utils/global";
import * as render from "client_utils/markup/tableMarkup";
import updateEJStemplate from "client_utils/ejsupdate";

function resetTableview() {
  $("#overview #now-playing-table").remove();
  $("#adj-movie #now-playing-table").remove();
}

function resetDisplayMsg() {
  $("#overview #no-results-msg").remove();
  $("#adj-movie #no-results-msg").remove();
}

async function refreshAdminTodoList() {
  const movies = await axios.get("/api/movies");
  resetTableview();
  $("#add-movie").removeAttr("data-nmu");

  if (movies.data.movies.length > 0) {
    resetDisplayMsg();
    $("#overview").append(
      updateEJStemplate(render.tablesawTable(false), { movies: movies.data.movies })
    );
    $("#adj-movie").append(
      updateEJStemplate(render.tablesawTable(true), { movies: movies.data.movies })
    );
  } else {
    $("#overview, #adj-movie").append(updateEJStemplate(render.noneCurrentlyPlaying));
  }
}

$(async function () {
  const movies = await axios.get("/api/movies");
  const response = await axios.get("/api/movies/screens");
  let allScreenTimes = response.data.screens;

  allScreenTimes = allScreenTimes.map((screen) => {
    let startTime = screen.startTime.match(/\d{2}:\d{2}/)[0];
    let date = screen.startTime.match(/\w{3}\s\d{2}\s\d{4}/)[0];
    let reserved = 0,
      total = 0;

    screen.seating_chart.forEach((row) => {
      if (row.seats) {
        row.seats.forEach((seat) => {
          if (seat.reserved) {
            ++reserved;
          }
          ++total;
        });
      }
    });

    return {
      ...screen,
      startTime,
      date,
      avl: total - reserved,
    };
  });

  $("#overview").append(
    updateEJStemplate(render.tablesawTable(false), {
      movies: movies.data.movies,
      screens: allScreenTimes,
    })
  );

  $("#overview-tab, #adj-movie-tab").on("click", function () {
    if (hasAttribute($("#add-movie").attr("data-nmu"))) {
      refreshAdminTodoList();
    }
  });

  $("#adj-movie").on("click", "#mov-row", function () {
    const selectedId = $(this).data("id");
    alert(`deleting ${selectedId}`);
  });
});
