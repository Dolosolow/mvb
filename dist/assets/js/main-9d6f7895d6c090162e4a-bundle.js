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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../scss/style.scss */ "./public/scss/style.scss");

$(document).ready(function () {
  $('.t-nav').css('width', '100%'); // *************
  // owl-carousel is used to display the movies now playing cards.
  // *************

  $('.owl-carousel').owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    navSpeed: 900,
    margin: 6,
    center: false,
    autoWidth: true,
    autoHeight: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        center: true
      },
      700: {
        items: 2
      },
      2000: {
        items: 4
      }
    }
  });
}); // *************
// responsible for the navigation hamburger animation and
// the black wrapper when navigation sidebar is open/showing.
// *************

$('.hamburger').click(function () {
  $(this).toggleClass('show');
  $('.navigation-collapse').toggleClass('show');
  $('.navigation-bg-wrapper').toggleClass('show');
  $('body').toggleClass('show');

  if ($(window).width() <= 1200) {
    $('.navigation-collapse .col').toggleClass('hide');
  }
});
$('.navigation-bg-wrapper').click(function () {
  $(this).toggleClass('show');
  $('.hamburger').toggleClass('show');
  $('.navigation-collapse').toggleClass('show');
  $('body').toggleClass('show');
}); // *************
// few conditions for transition effects on inputs with the type
// that is not radio.
// *************

$('form').find(':input').not('[type=radio]').each(function () {
  $(this).focus(function () {
    $("label[for=".concat($(this).attr('id'), "]")).addClass('focus-visible');
  });
  $(this).focusout(function () {
    $("label[for=".concat($(this).attr('id'), "]")).removeClass('focus-visible');
  });
  $(this).keyup(function () {
    if ($(this).val() !== '') {
      $("label[for=".concat($(this).attr('id'), "]")).addClass('complete');
    } else {
      $("label[for=".concat($(this).attr('id'), "]")).removeClass('complete');
    }
  });
}); // *************
// signin buttons >> pop-up modal
// *************

$('#signin-btn').on('click', function () {
  $('body').toggleClass('show');
  $('.si-modal').css('visibility', 'visible');
  $('.modal-form').removeClass('slide-out-top');
  $('.modal-form').addClass('slide-in-top');
  $('.modal-form #email').focus();
});
$('#close-modal').on('click', function () {
  $('body').toggleClass('show');
  $('.modal-form').addClass('slide-out-top');
  setTimeout(function () {
    $('.si-modal').css('visibility', 'hidden');
    $('.modal-form').removeClass('slide-in-top');
  }, 400);
});

/***/ }),

/***/ "./public/scss/style.scss":
/*!********************************!*\
  !*** ./public/scss/style.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!*************************!*\
  !*** multi ./public/js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./public/js */"./public/js/index.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9zY3NzL3N0eWxlLnNjc3M/NzY1ZiJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiJCIsImRvY3VtZW50IiwicmVhZHkiLCJjc3MiLCJvd2xDYXJvdXNlbCIsImxvb3AiLCJuYXYiLCJkb3RzIiwibmF2U3BlZWQiLCJtYXJnaW4iLCJjZW50ZXIiLCJhdXRvV2lkdGgiLCJhdXRvSGVpZ2h0IiwicmVzcG9uc2l2ZUNsYXNzIiwicmVzcG9uc2l2ZSIsIml0ZW1zIiwiY2xpY2siLCJ0b2dnbGVDbGFzcyIsIndpbmRvdyIsIndpZHRoIiwiZmluZCIsIm5vdCIsImVhY2giLCJmb2N1cyIsImF0dHIiLCJhZGRDbGFzcyIsImZvY3Vzb3V0IiwicmVtb3ZlQ2xhc3MiLCJrZXl1cCIsInZhbCIsIm9uIiwic2V0VGltZW91dCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FB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WUFBbkIsRUFBaUMsUUFBakM7QUFDQUgsS0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQjJCLFdBQWpCLENBQTZCLGNBQTdCO0FBQ0QsR0FIUyxFQUdQLEdBSE8sQ0FBVjtBQUlELENBUkQsRTs7Ozs7Ozs7Ozs7QUNwRkEsdUMiLCJmaWxlIjoiYXNzZXRzL2pzL21haW4tOWQ2Zjc4OTVkNmMwOTAxNjJlNGEtYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsInJlcXVpcmUoJy4uL3Njc3Mvc3R5bGUuc2NzcycpO1xuXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG4gICQoJy50LW5hdicpLmNzcygnd2lkdGgnLCAnMTAwJScpO1xuICAvLyAqKioqKioqKioqKioqXG4gIC8vIG93bC1jYXJvdXNlbCBpcyB1c2VkIHRvIGRpc3BsYXkgdGhlIG1vdmllcyBub3cgcGxheWluZyBjYXJkcy5cbiAgLy8gKioqKioqKioqKioqKlxuICAkKCcub3dsLWNhcm91c2VsJykub3dsQ2Fyb3VzZWwoe1xuICAgIGxvb3A6IHRydWUsXG4gICAgbmF2OiB0cnVlLFxuICAgIGRvdHM6IGZhbHNlLFxuICAgIG5hdlNwZWVkOiA5MDAsXG4gICAgbWFyZ2luOiA2LFxuICAgIGNlbnRlcjogZmFsc2UsXG4gICAgYXV0b1dpZHRoOiB0cnVlLFxuICAgIGF1dG9IZWlnaHQ6IHRydWUsXG4gICAgcmVzcG9uc2l2ZUNsYXNzOiB0cnVlLFxuICAgIHJlc3BvbnNpdmU6IHtcbiAgICAgIDA6IHtcbiAgICAgICAgaXRlbXM6IDEsXG4gICAgICAgIGNlbnRlcjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICA3MDA6IHtcbiAgICAgICAgaXRlbXM6IDIsXG4gICAgICB9LFxuICAgICAgMjAwMDoge1xuICAgICAgICBpdGVtczogNCxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSk7XG59KTtcbi8vICoqKioqKioqKioqKipcbi8vIHJlc3BvbnNpYmxlIGZvciB0aGUgbmF2aWdhdGlvbiBoYW1idXJnZXIgYW5pbWF0aW9uIGFuZFxuLy8gdGhlIGJsYWNrIHdyYXBwZXIgd2hlbiBuYXZpZ2F0aW9uIHNpZGViYXIgaXMgb3Blbi9zaG93aW5nLlxuLy8gKioqKioqKioqKioqKlxuJCgnLmhhbWJ1cmdlcicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdzaG93Jyk7XG4gICQoJy5uYXZpZ2F0aW9uLWNvbGxhcHNlJykudG9nZ2xlQ2xhc3MoJ3Nob3cnKTtcbiAgJCgnLm5hdmlnYXRpb24tYmctd3JhcHBlcicpLnRvZ2dsZUNsYXNzKCdzaG93Jyk7XG4gICQoJ2JvZHknKS50b2dnbGVDbGFzcygnc2hvdycpO1xuXG4gIGlmKCQod2luZG93KS53aWR0aCgpIDw9IDEyMDApIHtcbiAgICAkKCcubmF2aWdhdGlvbi1jb2xsYXBzZSAuY29sJykudG9nZ2xlQ2xhc3MoJ2hpZGUnKTtcbiAgfVxufSk7XG5cbiQoJy5uYXZpZ2F0aW9uLWJnLXdyYXBwZXInKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJCh0aGlzKS50b2dnbGVDbGFzcygnc2hvdycpO1xuICAkKCcuaGFtYnVyZ2VyJykudG9nZ2xlQ2xhc3MoJ3Nob3cnKTtcbiAgJCgnLm5hdmlnYXRpb24tY29sbGFwc2UnKS50b2dnbGVDbGFzcygnc2hvdycpO1xuICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ3Nob3cnKTtcbn0pO1xuLy8gKioqKioqKioqKioqKlxuLy8gZmV3IGNvbmRpdGlvbnMgZm9yIHRyYW5zaXRpb24gZWZmZWN0cyBvbiBpbnB1dHMgd2l0aCB0aGUgdHlwZVxuLy8gdGhhdCBpcyBub3QgcmFkaW8uXG4vLyAqKioqKioqKioqKioqXG4kKCdmb3JtJykuZmluZCgnOmlucHV0Jykubm90KCdbdHlwZT1yYWRpb10nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAkKHRoaXMpLmZvY3VzKGZ1bmN0aW9uKCkge1xuICAgICQoYGxhYmVsW2Zvcj0keyQodGhpcykuYXR0cignaWQnKX1dYCkuYWRkQ2xhc3MoJ2ZvY3VzLXZpc2libGUnKTtcbiAgfSlcbiAgXG4gICQodGhpcykuZm9jdXNvdXQoZnVuY3Rpb24oKSB7XG4gICAgJChgbGFiZWxbZm9yPSR7JCh0aGlzKS5hdHRyKCdpZCcpfV1gKS5yZW1vdmVDbGFzcygnZm9jdXMtdmlzaWJsZScpO1xuICB9KVxuXG4gICQodGhpcykua2V5dXAoZnVuY3Rpb24oKSB7XG4gICAgaWYoJCh0aGlzKS52YWwoKSAhPT0gJycpIHtcbiAgICAgICQoYGxhYmVsW2Zvcj0keyQodGhpcykuYXR0cignaWQnKX1dYCkuYWRkQ2xhc3MoJ2NvbXBsZXRlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoYGxhYmVsW2Zvcj0keyQodGhpcykuYXR0cignaWQnKX1dYCkucmVtb3ZlQ2xhc3MoJ2NvbXBsZXRlJyk7XG4gICAgfVxuICB9KVxufSlcbi8vICoqKioqKioqKioqKipcbi8vIHNpZ25pbiBidXR0b25zID4+IHBvcC11cCBtb2RhbFxuLy8gKioqKioqKioqKioqKlxuJCgnI3NpZ25pbi1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdzaG93Jyk7XG4gICQoJy5zaS1tb2RhbCcpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG4gICQoJy5tb2RhbC1mb3JtJykucmVtb3ZlQ2xhc3MoJ3NsaWRlLW91dC10b3AnKTtcbiAgJCgnLm1vZGFsLWZvcm0nKS5hZGRDbGFzcygnc2xpZGUtaW4tdG9wJyk7XG4gICQoJy5tb2RhbC1mb3JtICNlbWFpbCcpLmZvY3VzKCk7XG59KVxuXG4kKCcjY2xvc2UtbW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdzaG93Jyk7XG4gICQoJy5tb2RhbC1mb3JtJykuYWRkQ2xhc3MoJ3NsaWRlLW91dC10b3AnKTtcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAkKCcuc2ktbW9kYWwnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgJCgnLm1vZGFsLWZvcm0nKS5yZW1vdmVDbGFzcygnc2xpZGUtaW4tdG9wJyk7XG4gIH0sIDQwMCk7XG59KSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=