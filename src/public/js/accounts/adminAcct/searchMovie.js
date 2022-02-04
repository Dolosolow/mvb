import { hasAttribute } from "client_utils/global";
import * as render from "client_utils/markup/searchMarkup";

// ------------------------
// resets search results including movie poster.
function clearSearchResults() {
  $("#srh-results__list").remove();
  $("#srh-results__poster").remove();
}
// ------------------------
// limit set to 5. While opResults array length is < 5 using the list of users input on
// keydown fitlers through data from api fetch and adds it to opResults.
function filterSearchResults(list) {
  let results = new Set([]);
  let optimizedResults = [];

  list.map((searchItem) => results.add(searchItem));

  results.forEach((result) => {
    if (result.Title.toLowerCase().includes($("#search__input").val())) {
      if (optimizedResults.length < 5) {
        optimizedResults.push(result);
      }
    }
  });

  return optimizedResults;
}
// ------------------------
// Removes old search results and replaces them with new results if any. If movie is not found,
// it will get populated with "no results found for <movie-title>".
function getSearchResults(response) {
  $(".list-group__item").remove();

  if (response.Error === "Movie not found!") {
    $("#search__sugg").append(
      render.noSearchResults(`No results found for "${$("#search__input").val()}"`)
    );
  } else {
    filterSearchResults(response.Search).map((mov) => {
      $("#search__sugg").append(render.searchItem(mov));
    });
  }
}
// ------------------------
// makes call to api using the search input from the user.
async function searchMovie(title) {
  const foundMovie = await axios.get(`${process.env.BASE_API_URL}&s=${title}`);
  $("#search__sugg").addClass("collapse");
  getSearchResults(foundMovie.data);
}

$(function () {
  // ------------------------
  // search input event handler and makes call to searchMovie populating it with the input value.
  $("#search__input").on("keyup", () => {
    if ($("#search__input").val() === "") {
      $("#search__sugg").removeClass("collapse");
    } else {
      searchMovie($("#search__input").val());
    }
  });
  // ------------------------
  // fills out movie suggestions based on input values user typed.
  $("#search__sugg").on("click", ".list-group__item", async function () {
    $("#search__sugg").removeClass("collapse");
    $("#loader").css("display", "block");
    $("#search__input").val("");
    clearSearchResults();

    const movieId = $(this).data("id");
    const foundMovie = await axios.get(`${process.env.BASE_API_URL}&i=${movieId}&plot=full`);

    $(".no-results-msg").css("display", "none");
    $("#add-mov-btn").removeAttr("disabled");
    $("#add-mov-btn")[0].scrollIntoView({ behavior: "smooth" });
    $("#loader").css("display", "none");
    $(".srh-results").append(render.searchData(foundMovie.data));
  });
  // ------------------------
  // hanldes post when add-movie button is clicked
  $("#add-mov-btn").on("click", async function () {
    const isBtnDisabled = $(this).attr("disabled");

    if (!hasAttribute(isBtnDisabled)) {
      const sendData = { movieId: $("#srh-results__list").data("id") };

      const response = await axios.post("/admin/add-movie", sendData);
      clearSearchResults();
      $(".no-results-msg").css("display", "block");
      $(".btn-prim").attr("disabled", true);
      $("#account__card")[0].scrollIntoView({ behavior: "smooth" });
      $("body").append(render.successMessage(response.data.Title));
      $("#add-movie").attr("data-nmu", "");

      setTimeout(() => {
        $("body #flash-msg").removeClass("slide-in-bottom");
        $("body #flash-msg").addClass("slide-out-bottom");
      }, 3000);
    }
  });
});
