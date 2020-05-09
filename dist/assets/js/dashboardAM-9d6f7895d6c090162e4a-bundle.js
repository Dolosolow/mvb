/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/add-movie/forms.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/add-movie/forms.js":
/*!**************************************!*\
  !*** ./public/js/add-movie/forms.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _renderPartials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderPartials */ "./public/js/add-movie/renderPartials.js");
/* harmony import */ var _renderPartials__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_renderPartials__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pathLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pathLoader */ "./public/js/add-movie/pathLoader.js");


var apiKey = 'b8f31fc4';
var baseUrl = "http://www.omdbapi.com/?apikey=".concat(apiKey, "&");

var resetFields = function resetFields(results) {
  $('.list-group-item').remove();
  results.clear();
};

var setCustomImage = function setCustomImage(poster) {
  var url = poster.split('_');
  url[2] = 'SX700.jpg';
  var newUrl = url.join('_');
  return newUrl;
};

var promptSuccess = function promptSuccess() {
  var svg = document.querySelector('.icon-checkmark path');
  svg = new _pathLoader__WEBPACK_IMPORTED_MODULE_1__["default"](svg);

  if ($('.dashboard').hasClass('active')) {
    $('.dashboard').removeClass('active');
    svg.setProgress(0);
    return;
  }

  $('.dashboard').addClass('active');
  svg.setProgress(1);
}; // call to omdbapi movie db for info if there is displays list : prompts user to nothing found


$('#search_input').keyup(function () {
  var results = new Set([]); // array which will feed the ul data from the raw results set array after optimization

  var optimizedResults = [];

  if ($('#search_input').val() === '') {
    $('.search_sug').addClass('hide');
    resetFields(results);
  } else {
    $('.search_sug').removeClass('hide');
    axios.get("".concat(baseUrl, "s=").concat($('#search_input').val())).then(function (res) {
      if (res.data.Error === 'Movie not found!') {
        $('.list-group-item').remove();
        $('.search_sug').append(_renderPartials__WEBPACK_IMPORTED_MODULE_0___default.a.noSearchResults("No results found for \"".concat($('#search_input').val(), "\"")));
      } else {
        res.data.Search.map(function (mov) {
          return results.add(mov);
        });
        results.forEach(function (val) {
          if (val.Title.toLowerCase().includes($('#search_input').val())) {
            if (optimizedResults.length < 5) {
              optimizedResults.push(val);
            }
          }
        }); // resets previous results search state, removing items from the ul for next matching values

        $('.list-group-item').remove();
        optimizedResults.map(function (mov, i) {
          $('.search_sug').append(_renderPartials__WEBPACK_IMPORTED_MODULE_0___default.a.searchItem(mov));
        });
      }
    })["catch"](function (err) {
      console.log(err);
    });
  }
}); // next functions toggles results on the inputs focus
// make it happen ^^^
// handles the user click on the item from the search results

$('.list-group.search_sug').on('click', '.list-group-item', function () {
  $('.srh-results').remove();
  $('.search_sug').addClass('hide');
  $('.loader').removeClass('hide');
  var movieId = $(this).data('id');
  axios.get("".concat(baseUrl, "i=").concat(movieId, "&plot=full")).then(function (res) {
    $('.loader').addClass('hide');
    $('.db-view .srh-form').removeClass('empty');
    $('.img-wrapper').removeClass('hide');
    $('.btn-prim').removeClass('hide');
    $('.img-wrapper img').attr('src', setCustomImage(res.data.Poster));
    $('.input-inline.body div').append(_renderPartials__WEBPACK_IMPORTED_MODULE_0___default.a.searchData(res.data));
  })["catch"](function (err) {
    return console.log(err);
  });
});
$('.srh-form button').on('click', function () {
  console.log($('#multiTheatreRoomSelect').val());
  axios.post('/admin/add', {
    movieId: $('.srh-results').data('id')
  }).then(function (res) {
    $('.dashboard').append(_renderPartials__WEBPACK_IMPORTED_MODULE_0___default.a.successMessage($('.srh-results').data('title')));
    $('.srh-results').remove();
    $('.img-wrapper').addClass('hide');
    $('.btn-prim').addClass('hide');
    $('#search_input').val('');
    $('#multiTheatreRoomSelect').val('');
    promptSuccess();
    setTimeout(function () {
      promptSuccess();
      $('.success-message').remove();
      $('srh-results').remove();
      $('.db-view .srh-form').addClass('empty');
    }, 2000);
  })["catch"](function (err) {
    console.log(err);
  });
});

/***/ }),

/***/ "./public/js/add-movie/pathLoader.js":
/*!*******************************************!*\
  !*** ./public/js/add-movie/pathLoader.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PathLoader; });
function PathLoader(el) {
  this.el = el;
  this.strokeLength = el.getTotalLength(); // set dash offset to 0

  this.el.style.strokeDasharray = this.el.style.strokeDashoffset = this.strokeLength;
}

PathLoader.prototype._draw = function (val) {
  this.el.style.strokeDashoffset = this.strokeLength * (1 - val);
};

PathLoader.prototype.setProgress = function (val, cb) {
  this._draw(val);

  if (cb && typeof cb === 'function') cb();
};

PathLoader.prototype.setProgressFn = function (fn) {
  if (typeof fn === 'function') fn(this);
};

/***/ }),

/***/ "./public/js/add-movie/renderPartials.js":
/*!***********************************************!*\
  !*** ./public/js/add-movie/renderPartials.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  searchItem: function searchItem(data) {
    return "\n    <li class=\"list-group-item\" data-id=\"".concat(data.imdbID, "\">\n      <img src=\"").concat(data.Poster, "\" alt=\"movie\" height=\"60px\">\n      <div class=\"list-group-item-inner\">\n        <h6 class=\"title\">").concat(data.Title, "</h6>\n        <h6>").concat(data.Year, "</h6>\n      </div>\n    </li>\n  ");
  },
  noSearchResults: function noSearchResults(str) {
    return "\n    <li class=\"list-group-item na\">\n      <h6>".concat(str, "</h6>\n    </li>\n  ");
  },
  searchData: function searchData(data) {
    return "\n    <ul class=\"srh-results\" data-id=\"".concat(data.imdbID, "\" data-title=\"").concat(data.Title, "\">\n      <li>\n        Title: <span>").concat(data.Title, "</span>\n      </li>\n      <li>\n        Rated: <span>").concat(data.Rated, "</span>\n      </li>\n      <li>\n        Runtime: <span>").concat(data.Runtime, "</span>\n      </li>\n      <li>\n        Genre: <span>").concat(data.Genre, "</span>\n      </li>\n      <li>\n        Actors: <span>").concat(data.Actors, "</span>\n      </li>\n      <li>\n        Plot: <span>").concat(data.Plot, "</span>\n      </li>\n    </ul>\n  ");
  },
  successMessage: function successMessage(title) {
    return "\n    <div class=\"success-message\">\n      <svg viewBox=\"0 0 76 76\" class=\"success-message__icon icon-checkmark\">\n          <circle cx=\"38\" cy=\"38\" r=\"36\"/>\n          <path fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"M17.7,40.9l10.9,10.9l28.7-28.7\"/>\n      </svg>\n      <h1 class=\"success-message__title\">Success</h1>\n      <div class=\"success-message__content\">\n          <p>".concat(title, " has been successfully added</p>\n      </div>\n    </div>\n    ");
  }
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2FkZC1tb3ZpZS9mb3Jtcy5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvYWRkLW1vdmllL3BhdGhMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2FkZC1tb3ZpZS9yZW5kZXJQYXJ0aWFscy5qcyJdLCJuYW1lcyI6WyJhcGlLZXkiLCJiYXNlVXJsIiwicmVzZXRGaWVsZHMiLCJyZXN1bHRzIiwiJCIsInJlbW92ZSIsImNsZWFyIiwic2V0Q3VzdG9tSW1hZ2UiLCJwb3N0ZXIiLCJ1cmwiLCJzcGxpdCIsIm5ld1VybCIsImpvaW4iLCJwcm9tcHRTdWNjZXNzIiwic3ZnIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiUGF0aExvYWRlciIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzZXRQcm9ncmVzcyIsImFkZENsYXNzIiwia2V5dXAiLCJTZXQiLCJvcHRpbWl6ZWRSZXN1bHRzIiwidmFsIiwiYXhpb3MiLCJnZXQiLCJ0aGVuIiwicmVzIiwiZGF0YSIsIkVycm9yIiwiYXBwZW5kIiwicmVuZGVyIiwibm9TZWFyY2hSZXN1bHRzIiwiU2VhcmNoIiwibWFwIiwibW92IiwiYWRkIiwiZm9yRWFjaCIsIlRpdGxlIiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsImxlbmd0aCIsInB1c2giLCJpIiwic2VhcmNoSXRlbSIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJvbiIsIm1vdmllSWQiLCJhdHRyIiwiUG9zdGVyIiwic2VhcmNoRGF0YSIsInBvc3QiLCJzdWNjZXNzTWVzc2FnZSIsInNldFRpbWVvdXQiLCJlbCIsInN0cm9rZUxlbmd0aCIsImdldFRvdGFsTGVuZ3RoIiwic3R5bGUiLCJzdHJva2VEYXNoYXJyYXkiLCJzdHJva2VEYXNob2Zmc2V0IiwicHJvdG90eXBlIiwiX2RyYXciLCJjYiIsInNldFByb2dyZXNzRm4iLCJmbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJpbWRiSUQiLCJZZWFyIiwic3RyIiwiUmF0ZWQiLCJSdW50aW1lIiwiR2VucmUiLCJBY3RvcnMiLCJQbG90IiwidGl0bGUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsSUFBTUEsTUFBTSxHQUFHLFVBQWY7QUFDQSxJQUFNQyxPQUFPLDRDQUFxQ0QsTUFBckMsTUFBYjs7QUFFQSxJQUFNRSxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFBQyxPQUFPLEVBQUk7QUFDN0JDLEdBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCQyxNQUF0QjtBQUNBRixTQUFPLENBQUNHLEtBQVI7QUFDRCxDQUhEOztBQUtBLElBQU1DLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQUMsTUFBTSxFQUFJO0FBQy9CLE1BQU1DLEdBQUcsR0FBR0QsTUFBTSxDQUFDRSxLQUFQLENBQWEsR0FB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Q2xCQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2Z4QixZQUFVLEVBQUUsb0JBQUFoQixJQUFJO0FBQUEsbUVBRXlCQSxJQUFJLENBQUN5QyxNQUY5QixtQ0FHQXpDLElBQUksQ0FBQ3VCLE1BSEwseUhBS1V2QixJQUFJLENBQUNVLEtBTGYsZ0NBTUpWLElBQUksQ0FBQzBDLElBTkQ7QUFBQSxHQUREO0FBWWZ0QyxpQkFBZSxFQUFFLHlCQUFBdUMsR0FBRztBQUFBLHdFQUdWQSxHQUhVO0FBQUEsR0FaTDtBQW1CZm5CLFlBQVUsRUFBRSxvQkFBQXhCLElBQUk7QUFBQSwrREFFcUJBLElBQUksQ0FBQ3lDLE1BRjFCLDZCQUVpRHpDLElBQUksQ0FBQ1UsS0FGdEQsbURBSUtWLElBQUksQ0FBQ1UsS0FKVixvRUFPS1YsSUFBSSxDQUFDNEMsS0FQVixzRUFVTzVDLElBQUksQ0FBQzZDLE9BVlosb0VBYUs3QyxJQUFJLENBQUM4QyxLQWJWLHFFQWdCTTlDLElBQUksQ0FBQytDLE1BaEJYLG1FQW1CSS9DLElBQUksQ0FBQ2dELElBbkJUO0FBQUEsR0FuQkQ7QUEyQ2Z0QixnQkFBYyxFQUFFLHdCQUFBdUIsS0FBSztBQUFBLDRmQVNSQSxLQVRRO0FBQUE7QUEzQ04sQ0FBakIsQyIsImZpbGUiOiJhc3NldHMvanMvZGFzaGJvYXJkQU0tOWQ2Zjc4OTVkNmMwOTAxNjJlNGEtYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcHVibGljL2pzL2FkZC1tb3ZpZS9mb3Jtcy5qc1wiKTtcbiIsImltcG9ydCByZW5kZXIgZnJvbSAnLi9yZW5kZXJQYXJ0aWFscyc7XG5pbXBvcnQgUGF0aExvYWRlciBmcm9tICcuL3BhdGhMb2FkZXInO1xuY29uc3QgYXBpS2V5ID0gJ2I4ZjMxZmM0JztcbmNvbnN0IGJhc2VVcmwgPSBgaHR0cDovL3d3dy5vbWRiYXBpLmNvbS8/YXBpa2V5PSR7YXBpS2V5fSZgO1xuXG5jb25zdCByZXNldEZpZWxkcyA9IHJlc3VsdHMgPT4ge1xuICAkKCcubGlzdC1ncm91cC1pdGVtJykucmVtb3ZlKCk7XG4gIHJlc3VsdHMuY2xlYXIoKTtcbn1cblxuY29uc3Qgc2V0Q3VzdG9tSW1hZ2UgPSBwb3N0ZXIgPT4ge1xuICBjb25zdCB1cmwgPSBwb3N0ZXIuc3BsaXQoJ18nKTtcbiAgdXJsWzJdID0gJ1NYNzAwLmpwZyc7XG4gIGNvbnN0IG5ld1VybCA9IHVybC5qb2luKCdfJyk7XG4gIHJldHVybiBuZXdVcmw7XG59XG5cbmNvbnN0IHByb21wdFN1Y2Nlc3MgPSAoKSA9PiB7XG4gIGxldCBzdmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaWNvbi1jaGVja21hcmsgcGF0aCcpO1xuICBzdmcgPSBuZXcgUGF0aExvYWRlcihzdmcpO1xuXG4gIGlmKCQoJy5kYXNoYm9hcmQnKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAkKCcuZGFzaGJvYXJkJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHN2Zy5zZXRQcm9ncmVzcygwKTtcbiAgICByZXR1cm47XG4gIH1cbiAgJCgnLmRhc2hib2FyZCcpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgc3ZnLnNldFByb2dyZXNzKDEpO1xufVxuXG4gIC8vIGNhbGwgdG8gb21kYmFwaSBtb3ZpZSBkYiBmb3IgaW5mbyBpZiB0aGVyZSBpcyBkaXNwbGF5cyBsaXN0IDogcHJvbXB0cyB1c2VyIHRvIG5vdGhpbmcgZm91bmRcbiQoJyNzZWFyY2hfaW5wdXQnKS5rZXl1cCgoKSA9PiB7XG4gIGxldCByZXN1bHRzID0gbmV3IFNldChbXSk7XG4vLyBhcnJheSB3aGljaCB3aWxsIGZlZWQgdGhlIHVsIGRhdGEgZnJvbSB0aGUgcmF3IHJlc3VsdHMgc2V0IGFycmF5IGFmdGVyIG9wdGltaXphdGlvblxuICBsZXQgb3B0aW1pemVkUmVzdWx0cyA9IFtdO1xuXG4gIGlmKCQoJyNzZWFyY2hfaW5wdXQnKS52YWwoKSA9PT0gJycpIHtcbiAgICAkKCcuc2VhcmNoX3N1ZycpLmFkZENsYXNzKCdoaWRlJyk7XG4gICAgcmVzZXRGaWVsZHMocmVzdWx0cyk7XG4gIH0gZWxzZSB7XG4gICAgJCgnLnNlYXJjaF9zdWcnKS5yZW1vdmVDbGFzcygnaGlkZScpO1xuXG4gICAgYXhpb3MuZ2V0KGAke2Jhc2VVcmx9cz0keyQoJyNzZWFyY2hfaW5wdXQnKS52YWwoKX1gKVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICBpZihyZXMuZGF0YS5FcnJvciA9PT0gJ01vdmllIG5vdCBmb3VuZCEnKSB7XG4gICAgICAgICQoJy5saXN0LWdyb3VwLWl0ZW0nKS5yZW1vdmUoKTtcbiAgICAgICAgJCgnLnNlYXJjaF9zdWcnKS5hcHBlbmQocmVuZGVyLm5vU2VhcmNoUmVzdWx0cyhgTm8gcmVzdWx0cyBmb3VuZCBmb3IgXCIkeyQoJyNzZWFyY2hfaW5wdXQnKS52YWwoKX1cImApKTtcbiAgICAgIH1lbHNlIHtcbiAgICAgICAgcmVzLmRhdGEuU2VhcmNoLm1hcChtb3YgPT4gcmVzdWx0cy5hZGQobW92KSk7XG4gICAgICAgIFxuICAgICAgICByZXN1bHRzLmZvckVhY2godmFsID0+IHtcbiAgICAgICAgICBpZih2YWwuVGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygkKCcjc2VhcmNoX2lucHV0JykudmFsKCkpKSB7XG4gICAgICAgICAgICBpZihvcHRpbWl6ZWRSZXN1bHRzLmxlbmd0aCA8IDUpIHtcbiAgICAgICAgICAgICAgICBvcHRpbWl6ZWRSZXN1bHRzLnB1c2godmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAvLyByZXNldHMgcHJldmlvdXMgcmVzdWx0cyBzZWFyY2ggc3RhdGUsIHJlbW92aW5nIGl0ZW1zIGZyb20gdGhlIHVsIGZvciBuZXh0IG1hdGNoaW5nIHZhbHVlc1xuICAgICAgICAkKCcubGlzdC1ncm91cC1pdGVtJykucmVtb3ZlKCk7XG4gICAgICAgIG9wdGltaXplZFJlc3VsdHMubWFwKChtb3YsIGkpID0+IHtcbiAgICAgICAgICAkKCcuc2VhcmNoX3N1ZycpLmFwcGVuZChyZW5kZXIuc2VhcmNoSXRlbShtb3YpKTtcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KVxuICB9XG59KTtcblxuLy8gbmV4dCBmdW5jdGlvbnMgdG9nZ2xlcyByZXN1bHRzIG9uIHRoZSBpbnB1dHMgZm9jdXNcbi8vIG1ha2UgaXQgaGFwcGVuIF5eXlxuXG4vLyBoYW5kbGVzIHRoZSB1c2VyIGNsaWNrIG9uIHRoZSBpdGVtIGZyb20gdGhlIHNlYXJjaCByZXN1bHRzXG4kKCcubGlzdC1ncm91cC5zZWFyY2hfc3VnJykub24oJ2NsaWNrJywgJy5saXN0LWdyb3VwLWl0ZW0nLCBmdW5jdGlvbigpIHtcbiAgJCgnLnNyaC1yZXN1bHRzJykucmVtb3ZlKCk7XG4gICQoJy5zZWFyY2hfc3VnJykuYWRkQ2xhc3MoJ2hpZGUnKTtcbiAgJCgnLmxvYWRlcicpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XG5cbiAgY29uc3QgbW92aWVJZCA9ICQodGhpcykuZGF0YSgnaWQnKTtcbiAgYXhpb3MuZ2V0KGAke2Jhc2VVcmx9aT0ke21vdmllSWR9JnBsb3Q9ZnVsbGApXG4gIC50aGVuKHJlcyA9PiB7XG4gICAgJCgnLmxvYWRlcicpLmFkZENsYXNzKCdoaWRlJyk7XG4gICAgXG4gICAgJCgnLmRiLXZpZXcgLnNyaC1mb3JtJykucmVtb3ZlQ2xhc3MoJ2VtcHR5Jyk7XG4gICAgJCgnLmltZy13cmFwcGVyJykucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcbiAgICAkKCcuYnRuLXByaW0nKS5yZW1vdmVDbGFzcygnaGlkZScpO1xuICAgICQoJy5pbWctd3JhcHBlciBpbWcnKS5hdHRyKCdzcmMnLCBzZXRDdXN0b21JbWFnZShyZXMuZGF0YS5Qb3N0ZXIpKTtcbiAgICAkKCcuaW5wdXQtaW5saW5lLmJvZHkgZGl2JykuYXBwZW5kKHJlbmRlci5zZWFyY2hEYXRhKHJlcy5kYXRhKSk7XG4gIH0pXG4gIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSk7XG59KTtcblxuJCgnLnNyaC1mb3JtIGJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLmxvZygkKCcjbXVsdGlUaGVhdHJlUm9vbVNlbGVjdCcpLnZhbCgpKTtcblxuICBheGlvc1xuICAucG9zdCgnL2FkbWluL2FkZCcsIHsgbW92aWVJZDogJCgnLnNyaC1yZXN1bHRzJykuZGF0YSgnaWQnKSB9KVxuICAudGhlbihyZXMgPT4ge1xuICAgICQoJy5kYXNoYm9hcmQnKS5hcHBlbmQocmVuZGVyLnN1Y2Nlc3NNZXNzYWdlKCQoJy5zcmgtcmVzdWx0cycpLmRhdGEoJ3RpdGxlJykpKTtcbiAgICAkKCcuc3JoLXJlc3VsdHMnKS5yZW1vdmUoKTtcbiAgICAkKCcuaW1nLXdyYXBwZXInKS5hZGRDbGFzcygnaGlkZScpO1xuICAgICQoJy5idG4tcHJpbScpLmFkZENsYXNzKCdoaWRlJyk7XG4gICAgJCgnI3NlYXJjaF9pbnB1dCcpLnZhbCgnJyk7XG4gICAgJCgnI211bHRpVGhlYXRyZVJvb21TZWxlY3QnKS52YWwoJycpO1xuICAgICAgcHJvbXB0U3VjY2VzcygpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHByb21wdFN1Y2Nlc3MoKTtcbiAgICAgICAgJCgnLnN1Y2Nlc3MtbWVzc2FnZScpLnJlbW92ZSgpO1xuICAgICAgICAkKCdzcmgtcmVzdWx0cycpLnJlbW92ZSgpO1xuICAgICAgICAkKCcuZGItdmlldyAuc3JoLWZvcm0nKS5hZGRDbGFzcygnZW1wdHknKTtcbiAgICAgIH0sIDIwMDApO1xuICAgIH0pXG4gIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9KVxufSkiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQYXRoTG9hZGVyKGVsKSB7XG5cdHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLnN0cm9rZUxlbmd0aCA9IGVsLmdldFRvdGFsTGVuZ3RoKCk7XG5cdFxuICAgIC8vIHNldCBkYXNoIG9mZnNldCB0byAwXG4gICAgdGhpcy5lbC5zdHlsZS5zdHJva2VEYXNoYXJyYXkgPVxuICAgIHRoaXMuZWwuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IHRoaXMuc3Ryb2tlTGVuZ3RoO1xufVxuXG5QYXRoTG9hZGVyLnByb3RvdHlwZS5fZHJhdyA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICB0aGlzLmVsLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSB0aGlzLnN0cm9rZUxlbmd0aCAqICgxIC0gdmFsKTtcbn1cblxuUGF0aExvYWRlci5wcm90b3R5cGUuc2V0UHJvZ3Jlc3MgPSBmdW5jdGlvbiAodmFsLCBjYikge1xuXHR0aGlzLl9kcmF3KHZhbCk7XG4gICAgaWYoY2IgJiYgdHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSBjYigpO1xufVxuXG5QYXRoTG9hZGVyLnByb3RvdHlwZS5zZXRQcm9ncmVzc0ZuID0gZnVuY3Rpb24gKGZuKSB7XG5cdGlmKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykgZm4odGhpcyk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2VhcmNoSXRlbTogZGF0YSA9PiAoXG4gICAgYFxuICAgIDxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiIGRhdGEtaWQ9XCIke2RhdGEuaW1kYklEfVwiPlxuICAgICAgPGltZyBzcmM9XCIke2RhdGEuUG9zdGVyfVwiIGFsdD1cIm1vdmllXCIgaGVpZ2h0PVwiNjBweFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbS1pbm5lclwiPlxuICAgICAgICA8aDYgY2xhc3M9XCJ0aXRsZVwiPiR7ZGF0YS5UaXRsZX08L2g2PlxuICAgICAgICA8aDY+JHtkYXRhLlllYXJ9PC9oNj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbGk+XG4gIGBcbiAgKSxcbiAgbm9TZWFyY2hSZXN1bHRzOiBzdHIgPT4gKFxuICAgIGBcbiAgICA8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gbmFcIj5cbiAgICAgIDxoNj4ke3N0cn08L2g2PlxuICAgIDwvbGk+XG4gIGBcbiAgKSxcbiAgc2VhcmNoRGF0YTogZGF0YSA9PiAoXG4gICAgYFxuICAgIDx1bCBjbGFzcz1cInNyaC1yZXN1bHRzXCIgZGF0YS1pZD1cIiR7ZGF0YS5pbWRiSUR9XCIgZGF0YS10aXRsZT1cIiR7ZGF0YS5UaXRsZX1cIj5cbiAgICAgIDxsaT5cbiAgICAgICAgVGl0bGU6IDxzcGFuPiR7ZGF0YS5UaXRsZX08L3NwYW4+XG4gICAgICA8L2xpPlxuICAgICAgPGxpPlxuICAgICAgICBSYXRlZDogPHNwYW4+JHtkYXRhLlJhdGVkfTwvc3Bhbj5cbiAgICAgIDwvbGk+XG4gICAgICA8bGk+XG4gICAgICAgIFJ1bnRpbWU6IDxzcGFuPiR7ZGF0YS5SdW50aW1lfTwvc3Bhbj5cbiAgICAgIDwvbGk+XG4gICAgICA8bGk+XG4gICAgICAgIEdlbnJlOiA8c3Bhbj4ke2RhdGEuR2VucmV9PC9zcGFuPlxuICAgICAgPC9saT5cbiAgICAgIDxsaT5cbiAgICAgICAgQWN0b3JzOiA8c3Bhbj4ke2RhdGEuQWN0b3JzfTwvc3Bhbj5cbiAgICAgIDwvbGk+XG4gICAgICA8bGk+XG4gICAgICAgIFBsb3Q6IDxzcGFuPiR7ZGF0YS5QbG90fTwvc3Bhbj5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgYFxuICApLFxuICBzdWNjZXNzTWVzc2FnZTogdGl0bGUgPT4gKFxuICAgIGBcbiAgICA8ZGl2IGNsYXNzPVwic3VjY2Vzcy1tZXNzYWdlXCI+XG4gICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgNzYgNzZcIiBjbGFzcz1cInN1Y2Nlc3MtbWVzc2FnZV9faWNvbiBpY29uLWNoZWNrbWFya1wiPlxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIzOFwiIGN5PVwiMzhcIiByPVwiMzZcIi8+XG4gICAgICAgICAgPHBhdGggZmlsbD1cIm5vbmVcIiBzdHJva2U9XCIjRkZGRkZGXCIgc3Ryb2tlLXdpZHRoPVwiNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMTBcIiBkPVwiTTE3LjcsNDAuOWwxMC45LDEwLjlsMjguNy0yOC43XCIvPlxuICAgICAgPC9zdmc+XG4gICAgICA8aDEgY2xhc3M9XCJzdWNjZXNzLW1lc3NhZ2VfX3RpdGxlXCI+U3VjY2VzczwvaDE+XG4gICAgICA8ZGl2IGNsYXNzPVwic3VjY2Vzcy1tZXNzYWdlX19jb250ZW50XCI+XG4gICAgICAgICAgPHA+JHt0aXRsZX0gaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IGFkZGVkPC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYFxuICApXG59Il0sInNvdXJjZVJvb3QiOiIifQ==