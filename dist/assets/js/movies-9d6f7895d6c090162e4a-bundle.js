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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/main/movies.js":
/*!**********************************!*\
  !*** ./public/js/main/movies.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function shouldLoop(size) {
  if ($(window).width() < 800 || $(window).width() < 1100 && size === 4) {
    return true;
  }

  return size > 4;
}

$(document).ready(function () {
  // *************
  // owl-carousel is used to display the movies now playing cards.
  // *************
  $('#showtimes.owl-carousel').owlCarousel({
    loop: shouldLoop($('#showtimes').data('ct')),
    nav: true,
    dots: false,
    navSpeed: 700,
    margin: 7,
    center: $(window).width() < 800,
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
  $('#classics.owl-carousel').owlCarousel({
    loop: shouldLoop($('#classics').data('ct')),
    nav: true,
    dots: false,
    navSpeed: 700,
    margin: 7,
    center: $(window).width() < 800,
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
});

/***/ }),

/***/ 1:
/*!****************************************!*\
  !*** multi ./public/js/main/movies.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./public/js/main/movies.js */"./public/js/main/movies.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL21haW4vbW92aWVzLmpzIl0sIm5hbWVzIjpbInNob3VsZExvb3AiLCJzaXplIiwiJCIsIndpbmRvdyIsIndpZHRoIiwiZG9jdW1lbnQiLCJyZWFkeSIsIm93bENhcm91c2VsIiwibG9vcCIsImRhdGEiLCJuYXYiLCJkb3RzIiwibmF2U3BlZWQiLCJtYXJnaW4iLCJjZW50ZXIiLCJhdXRvV2lkdGgiLCJhdXRvSGVpZ2h0IiwicmVzcG9uc2l2ZUNsYXNzIiwicmVzcG9uc2l2ZSIsIml0ZW1zIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsU0FBU0EsVUFBVCxDQUFvQkMsSUFBcEIsRUFBMEI7QUFDeEIsTUFBR0MsQ0FBQyxDQUFDQyxNQUFELENBQUQsQ0FBVUMsS0FBVixLQUFvQixHQUFwQixJQUEyQkYsQ0FBQyxDQUFDQyxNQUFELENBQUQsQ0FBVUMsS0FBVixLQUFvQixJQUFwQixJQUE0QkgsSUFBSSxLQUFLLENBQW5FLEVBQXNFO0FBQ3BFLFdBQU8sSUFBUDtBQUNEOztBQUNELFNBQU9BLElBQUksR0FBRyxDQUFkO0FBQ0Q7O0FBRURDLENBQUMsQ0FBQ0csUUFBRCxDQUFELENBQVlDLEtBQVosQ0FBa0IsWUFBTTtBQUN0QjtBQUNBO0FBQ0E7QUFDQUosR0FBQyxDQUFDLHlCQUFELENBQUQsQ0FBNkJLLFdBQTdCLENBQXlDO0FBQ3ZDQyxRQUFJLEVBQUVSLFVBQVUsQ0FBQ0UsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQk8sSUFBaEIsQ0FBcUIsSUFBckIsQ0FBRCxDQUR1QjtBQUV2Q0MsT0FBRyxFQUFFLElBRmtDO0FBR3ZDQyxRQUFJLEVBQUUsS0FIaUM7QUFJdkNDLFlBQVEsRUFBRSxHQUo2QjtBQUt2Q0MsVUFBTSxFQUFFLENBTCtCO0FBTXZDQyxVQUFNLEVBQUVaLENBQUMsQ0FBQ0MsTUFBRCxDQUFELENBQVVDLEtBQVYsS0FBb0IsR0FOVztBQU92Q1csYUFBUyxFQUFFLElBUDRCO0FBUXZDQyxjQUFVLEVBQUUsSUFSMkI7QUFTdkNDLG1CQUFlLEVBQUUsSUFUc0I7QUFVdkNDLGNBQVUsRUFBRTtBQUNWLFNBQUc7QUFDREMsYUFBSyxFQUFFLENBRE47QUFFREwsY0FBTSxFQUFFO0FBRlAsT0FETztBQUtWLFdBQUs7QUFDSEssYUFBSyxFQUFFO0FBREosT0FMSztBQVFWLFlBQU07QUFDSkEsYUFBSyxFQUFFO0FBREg7QUFSSTtBQVYyQixHQUF6QztBQXdCQWpCLEdBQUMsQ0FBQyx3QkFBRCxDQUFELENBQTRCSyxXQUE1QixDQUF3QztBQUN0Q0MsUUFBSSxFQUFFUixVQUFVLENBQUNFLENBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZU8sSUFBZixDQUFvQixJQUFwQixDQUFELENBRHNCO0FBRXRDQyxPQUFHLEVBQUUsSUFGaUM7QUFHdENDLFFBQUksRUFBRSxLQUhnQztBQUl0Q0MsWUFBUSxFQUFFLEdBSjRCO0FBS3RDQyxVQUFNLEVBQUUsQ0FMOEI7QUFNdENDLFVBQU0sRUFBRVosQ0FBQyxDQUFDQyxNQUFELENBQUQsQ0FBVUMsS0FBVixLQUFvQixHQU5VO0FBT3RDVyxhQUFTLEVBQUUsSUFQMkI7QUFRdENDLGNBQVUsRUFBRSxJQVIwQjtBQVN0Q0MsbUJBQWUsRUFBRSxJQVRxQjtBQVV0Q0MsY0FBVSxFQUFFO0FBQ1YsU0FBRztBQUNEQyxhQUFLLEVBQUUsQ0FETjtBQUVETCxjQUFNLEVBQUU7QUFGUCxPQURPO0FBS1YsV0FBSztBQUNISyxhQUFLLEVBQUU7QUFESixPQUxLO0FBUVYsWUFBTTtBQUNKQSxhQUFLLEVBQUU7QUFESDtBQVJJO0FBVjBCLEdBQXhDO0FBdUJELENBbkRELEUiLCJmaWxlIjoiYXNzZXRzL2pzL21vdmllcy05ZDZmNzg5NWQ2YzA5MDE2MmU0YS1idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuIiwiZnVuY3Rpb24gc2hvdWxkTG9vcChzaXplKSB7XG4gIGlmKCQod2luZG93KS53aWR0aCgpIDwgODAwIHx8ICQod2luZG93KS53aWR0aCgpIDwgMTEwMCAmJiBzaXplID09PSA0KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIHNpemUgPiA0O1xufVxuXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG4gIC8vICoqKioqKioqKioqKipcbiAgLy8gb3dsLWNhcm91c2VsIGlzIHVzZWQgdG8gZGlzcGxheSB0aGUgbW92aWVzIG5vdyBwbGF5aW5nIGNhcmRzLlxuICAvLyAqKioqKioqKioqKioqXG4gICQoJyNzaG93dGltZXMub3dsLWNhcm91c2VsJykub3dsQ2Fyb3VzZWwoe1xuICAgIGxvb3A6IHNob3VsZExvb3AoJCgnI3Nob3d0aW1lcycpLmRhdGEoJ2N0JykpLFxuICAgIG5hdjogdHJ1ZSxcbiAgICBkb3RzOiBmYWxzZSxcbiAgICBuYXZTcGVlZDogNzAwLFxuICAgIG1hcmdpbjogNyxcbiAgICBjZW50ZXI6ICQod2luZG93KS53aWR0aCgpIDwgODAwLFxuICAgIGF1dG9XaWR0aDogdHJ1ZSxcbiAgICBhdXRvSGVpZ2h0OiB0cnVlLFxuICAgIHJlc3BvbnNpdmVDbGFzczogdHJ1ZSxcbiAgICByZXNwb25zaXZlOiB7XG4gICAgICAwOiB7XG4gICAgICAgIGl0ZW1zOiAxLFxuICAgICAgICBjZW50ZXI6IHRydWUsXG4gICAgICB9LFxuICAgICAgNzAwOiB7XG4gICAgICAgIGl0ZW1zOiAyLFxuICAgICAgfSxcbiAgICAgIDIwMDA6IHtcbiAgICAgICAgaXRlbXM6IDQsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuXG4gICQoJyNjbGFzc2ljcy5vd2wtY2Fyb3VzZWwnKS5vd2xDYXJvdXNlbCh7XG4gICAgbG9vcDogc2hvdWxkTG9vcCgkKCcjY2xhc3NpY3MnKS5kYXRhKCdjdCcpKSxcbiAgICBuYXY6IHRydWUsXG4gICAgZG90czogZmFsc2UsXG4gICAgbmF2U3BlZWQ6IDcwMCxcbiAgICBtYXJnaW46IDcsXG4gICAgY2VudGVyOiAkKHdpbmRvdykud2lkdGgoKSA8IDgwMCxcbiAgICBhdXRvV2lkdGg6IHRydWUsXG4gICAgYXV0b0hlaWdodDogdHJ1ZSxcbiAgICByZXNwb25zaXZlQ2xhc3M6IHRydWUsXG4gICAgcmVzcG9uc2l2ZToge1xuICAgICAgMDoge1xuICAgICAgICBpdGVtczogMSxcbiAgICAgICAgY2VudGVyOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIDcwMDoge1xuICAgICAgICBpdGVtczogMixcbiAgICAgIH0sXG4gICAgICAyMDAwOiB7XG4gICAgICAgIGl0ZW1zOiA0LFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=