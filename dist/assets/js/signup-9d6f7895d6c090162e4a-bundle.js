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
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/main/signup.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/main/signup.js":
/*!**********************************!*\
  !*** ./public/js/main/signup.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// *************
// toggles showing and not showing sections of the form. 
// checks to see if a section of the form is visible on a new event
// click. If it is, it will first close(hide) the section before
// opening(showing) the other section.
// *************
$('.form-container button').on('click', function () {
  var formSection = $("#".concat($(this).attr('id'), "-form"));
  var matchFound = false;
  $('.form-container button').each(function () {
    var currentSection = $("#".concat($(this).attr('id'), "-form"));

    if (currentSection.parent().hasClass('show')) {
      currentSection.parent().removeClass('show');
      currentSection.removeClass('show');
      matchFound = currentSection.html() === formSection.html();
    }
  });

  if (!matchFound) {
    formSection.parent().toggleClass('show');
    formSection.toggleClass('show');
  }
}); // *************
// for input type of radio, checks for change whether (not)checked. 
// adds style for the corresponding li.
// *************

$('.form-container li form').find(':input').change(function () {
  if ($(this).is(':checked')) {
    $(this).closest('li').addClass('complete');
  }
}); // *************
// same as function above but for all inputs except type radio, checks for change whether is equal to ''/blank. 
// *************

$('form').find(':input').not('[type=radio]').each(function () {
  $(this).keyup(function () {
    if ($(this).val() !== '') {
      $(this).closest('li').addClass('complete');
    } else {
      $(this).closest('li').removeClass('complete');
    }
  });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL21haW4vc2lnbnVwLmpzIl0sIm5hbWVzIjpbIiQiLCJvbiIsImZvcm1TZWN0aW9uIiwiYXR0ciIsIm1hdGNoRm91bmQiLCJlYWNoIiwiY3VycmVudFNlY3Rpb24iLCJwYXJlbnQiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiaHRtbCIsInRvZ2dsZUNsYXNzIiwiZmluZCIsImNoYW5nZSIsImlzIiwiY2xvc2VzdCIsImFkZENsYXNzIiwibm90Iiwia2V5dXAiLCJ2YWwiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsQ0FBQyxDQUFDLHdCQUFELENBQUQsQ0FBNEJDLEVBQTVCLENBQStCLE9BQS9CLEVBQXdDLFlBQVc7QUFDakQsTUFBSUMsV0FBVyxHQUFHRixDQUFDLFlBQUtBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUUcsSUFBUixDQUFhLElBQWIsQ0FBTCxXQUFuQjtBQUNBLE1BQUlDLFVBQVUsR0FBRyxLQUFqQjtBQUVBSixHQUFDLENBQUMsd0JBQUQsQ0FBRCxDQUE0QkssSUFBNUIsQ0FBaUMsWUFBVztBQUMxQyxRQUFJQyxjQUFjLEdBQUdOLENBQUMsWUFBS0EsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRRyxJQUFSLENBQWEsSUFBYixDQUFMLFdBQXRCOztBQUVBLFFBQUdHLGNBQWMsQ0FBQ0MsTUFBZixHQUF3QkMsUUFBeEIsQ0FBaUMsTUFBakMsQ0FBSCxFQUE2QztBQUMzQ0Ysb0JBQWMsQ0FBQ0MsTUFBZixHQUF3QkUsV0FBeEIsQ0FBb0MsTUFBcEM7QUFDQUgsb0JBQWMsQ0FBQ0csV0FBZixDQUEyQixNQUEzQjtBQUVBTCxnQkFBVSxHQUFHRSxjQUFjLENBQUNJLElBQWYsT0FBMEJSLFdBQVcsQ0FBQ1EsSUFBWixFQUF2QztBQUNEO0FBQ0YsR0FURDs7QUFXQSxNQUFHLENBQUNOLFVBQUosRUFBZ0I7QUFDZEYsZUFBVyxDQUFDSyxNQUFaLEdBQXFCSSxXQUFyQixDQUFpQyxNQUFqQztBQUNBVCxlQUFXLENBQUNTLFdBQVosQ0FBd0IsTUFBeEI7QUFDRDtBQUNGLENBbkJELEUsQ0FvQkE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FYLENBQUMsQ0FBQyx5QkFBRCxDQUFELENBQTZCWSxJQUE3QixDQUFrQyxRQUFsQyxFQUE0Q0MsTUFBNUMsQ0FBbUQsWUFBVztBQUM1RCxNQUFHYixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFjLEVBQVIsQ0FBVyxVQUFYLENBQUgsRUFBMkI7QUFDekJkLEtBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWUsT0FBUixDQUFnQixJQUFoQixFQUFzQkMsUUFBdEIsQ0FBK0IsVUFBL0I7QUFDRDtBQUNGLENBSkQsRSxDQUtBO0FBQ0E7QUFDQTs7QUFDQWhCLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVVksSUFBVixDQUFlLFFBQWYsRUFBeUJLLEdBQXpCLENBQTZCLGNBQTdCLEVBQTZDWixJQUE3QyxDQUFrRCxZQUFXO0FBQzNETCxHQUFDLENBQUMsSUFBRCxDQUFELENBQVFrQixLQUFSLENBQWMsWUFBVztBQUN2QixRQUFHbEIsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRbUIsR0FBUixPQUFrQixFQUFyQixFQUF5QjtBQUN2Qm5CLE9BQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWUsT0FBUixDQUFnQixJQUFoQixFQUFzQkMsUUFBdEIsQ0FBK0IsVUFBL0I7QUFDRCxLQUZELE1BRU87QUFDTGhCLE9BQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWUsT0FBUixDQUFnQixJQUFoQixFQUFzQk4sV0FBdEIsQ0FBa0MsVUFBbEM7QUFDRDtBQUNGLEdBTkQ7QUFPRCxDQVJELEUiLCJmaWxlIjoiYXNzZXRzL2pzL3NpZ251cC05ZDZmNzg5NWQ2YzA5MDE2MmU0YS1idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wdWJsaWMvanMvbWFpbi9zaWdudXAuanNcIik7XG4iLCIvLyAqKioqKioqKioqKioqXG4vLyB0b2dnbGVzIHNob3dpbmcgYW5kIG5vdCBzaG93aW5nIHNlY3Rpb25zIG9mIHRoZSBmb3JtLiBcbi8vIGNoZWNrcyB0byBzZWUgaWYgYSBzZWN0aW9uIG9mIHRoZSBmb3JtIGlzIHZpc2libGUgb24gYSBuZXcgZXZlbnRcbi8vIGNsaWNrLiBJZiBpdCBpcywgaXQgd2lsbCBmaXJzdCBjbG9zZShoaWRlKSB0aGUgc2VjdGlvbiBiZWZvcmVcbi8vIG9wZW5pbmcoc2hvd2luZykgdGhlIG90aGVyIHNlY3Rpb24uXG4vLyAqKioqKioqKioqKioqXG4kKCcuZm9ybS1jb250YWluZXIgYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGxldCBmb3JtU2VjdGlvbiA9ICQoYCMkeyQodGhpcykuYXR0cignaWQnKX0tZm9ybWApO1xuICBsZXQgbWF0Y2hGb3VuZCA9IGZhbHNlO1xuXG4gICQoJy5mb3JtLWNvbnRhaW5lciBidXR0b24nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGxldCBjdXJyZW50U2VjdGlvbiA9ICQoYCMkeyQodGhpcykuYXR0cignaWQnKX0tZm9ybWApO1xuXG4gICAgaWYoY3VycmVudFNlY3Rpb24ucGFyZW50KCkuaGFzQ2xhc3MoJ3Nob3cnKSkge1xuICAgICAgY3VycmVudFNlY3Rpb24ucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcbiAgICAgIGN1cnJlbnRTZWN0aW9uLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG5cbiAgICAgIG1hdGNoRm91bmQgPSBjdXJyZW50U2VjdGlvbi5odG1sKCkgPT09IGZvcm1TZWN0aW9uLmh0bWwoKTtcbiAgICB9XG4gIH0pXG5cbiAgaWYoIW1hdGNoRm91bmQpIHtcbiAgICBmb3JtU2VjdGlvbi5wYXJlbnQoKS50b2dnbGVDbGFzcygnc2hvdycpO1xuICAgIGZvcm1TZWN0aW9uLnRvZ2dsZUNsYXNzKCdzaG93Jyk7XG4gIH1cbn0pO1xuLy8gKioqKioqKioqKioqKlxuLy8gZm9yIGlucHV0IHR5cGUgb2YgcmFkaW8sIGNoZWNrcyBmb3IgY2hhbmdlIHdoZXRoZXIgKG5vdCljaGVja2VkLiBcbi8vIGFkZHMgc3R5bGUgZm9yIHRoZSBjb3JyZXNwb25kaW5nIGxpLlxuLy8gKioqKioqKioqKioqKlxuJCgnLmZvcm0tY29udGFpbmVyIGxpIGZvcm0nKS5maW5kKCc6aW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gIGlmKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcbiAgICAkKHRoaXMpLmNsb3Nlc3QoJ2xpJykuYWRkQ2xhc3MoJ2NvbXBsZXRlJyk7XG4gIH1cbn0pO1xuLy8gKioqKioqKioqKioqKlxuLy8gc2FtZSBhcyBmdW5jdGlvbiBhYm92ZSBidXQgZm9yIGFsbCBpbnB1dHMgZXhjZXB0IHR5cGUgcmFkaW8sIGNoZWNrcyBmb3IgY2hhbmdlIHdoZXRoZXIgaXMgZXF1YWwgdG8gJycvYmxhbmsuIFxuLy8gKioqKioqKioqKioqKlxuJCgnZm9ybScpLmZpbmQoJzppbnB1dCcpLm5vdCgnW3R5cGU9cmFkaW9dJykuZWFjaChmdW5jdGlvbigpIHtcbiAgJCh0aGlzKS5rZXl1cChmdW5jdGlvbigpIHtcbiAgICBpZigkKHRoaXMpLnZhbCgpICE9PSAnJykge1xuICAgICAgJCh0aGlzKS5jbG9zZXN0KCdsaScpLmFkZENsYXNzKCdjb21wbGV0ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKHRoaXMpLmNsb3Nlc3QoJ2xpJykucmVtb3ZlQ2xhc3MoJ2NvbXBsZXRlJyk7XG4gICAgfVxuICB9KVxufSkiXSwic291cmNlUm9vdCI6IiJ9