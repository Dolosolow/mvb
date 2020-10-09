class validate {
  static onlyDigits = (str) => {
    if(str.match(/[^a-zA-Z]+\/?$/)) {
      return true;
    }
    return false;
  }
  // -----------------------
  // 3 functions below receive a keycode, the current string input value as an array, and the element 
  // to manipulate. If match is made it makes its way to next regex, else it disables keydown event.
  static twoDigitMonth = (keycode, date, elmSelector)  => {
    if(date[0].match(/^0/)) {
      if(date[0].match(/^0[1-9]/)) {
        if(keycode !== 8) {
          $(elmSelector).val(`${date.join('/')}/`);
        }
      } else if(keycode === 48) {
        return false;
      }
    } else if(date[0].match(/^1/)) {
      if(date[0].match(/^1[0-2]/)) {
        if(keycode !== 8) {
          $(elmSelector).val(`${date.join('/')}/`);
        }
      } else if(keycode >= 51) {
        return false;
      }
    } else if(date[0].match(/^[2-9]/)) {
      if(keycode !== 8) {
        date[0] = `0${date[0]}`;
        $(elmSelector).val(`${date.join('/')}/`);
      }
    }
    return;
  }

  static twoDigitDay = (keycode, date, elmSelector)  => {
    if(date[1].match(/^0/)) {
      if(date[1].match(/^0[1-9]/)) {
        if(keycode !== 8) {
          $(elmSelector).val(`${date.join('/')}/`);
        }
      } else if(keycode === 48) {
        return false;
      }
    } else if(date[1].match(/^[123]/)) {
      if(date[1].match(/(^[12][0-9])|(^3[0-1])/)) {
        if(keycode !== 8) {
          $(elmSelector).val(`${date.join('/')}/`);
        }
      } else if(date[1].match(/^3/) && keycode >= 50) {
        return false;
      }
    } else if(date[1].match(/^[4-9]/)) {
      if(keycode !== 8) {
        date[1] = `0${date[1]}`;
        $(elmSelector).val(`${date.join('/')}/`);
      }
    }
    return;
  }

  static fourDigitYear = (keycode, date)  => {
    if(date[2] === '' && (keycode === 48 || keycode >= 51)) {
      return false;
    } else if(keycode === 8) {
      return;
    }
    if(date[2].match(/^1/)) {
      if(date[2].match(/^19/)) {
        return;
      } else if(keycode <= 56) {
        return false;
      }
    }
    if(date[2].match(/^2/)) {
      if(date[2].match(/^20/)) {
        if(date[2].match(/^20[012]/)) {
          if(date[2].match(/^20[012]0/)) {
            return;
          } else if(keycode > 48) {
            return false;
          }
        } else if(keycode >= 51) {
          return false;
        }
      } else if(keycode > 48){
        return false;
      }
    }
    return;
  }
}

module.exports = validate;