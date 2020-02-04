import validator from "validator";

function validationError(elm, errorMsg) {
  $(elm).siblings(`.helper-text`).attr("data-error", `${errorMsg}`);

  $(elm).removeClass("valid");
  $(elm).addClass("invalid");
}

function validationSuccess(elm, options) {
  const defaultOptions = {
    min_length: null,
  };
  const userOptions = Object.assign({}, defaultOptions, options);

  if (userOptions.min_length !== null && $(elm).val().length < userOptions.min_length) {
    $(elm)
      .siblings(`.helper-text`)
      .attr("data-error", `This field must be at least ${userOptions.min_length} characters`);
    $(elm).removeClass("valid");
    $(elm).addClass("invalid");

    return;
  }

  $(elm).removeClass("invalid");
  $(elm).addClass("valid");
}

export default class validation {
  static getFormValues = (selector) => {
    let inputValues = {};

    $(selector).each((i, input) => (inputValues[$(input).attr("name")] = $(input).val()));

    return inputValues;
  };

  static preSubmitValidations = (selector) => {
    let hasErrors = false;

    $(selector).each((i, field) => {
      if ($(field).val().trim() === "") {
        $(field).removeClass("valid");
        $(field).addClass("invalid");
        hasErrors = true;
      } else {
        $(field).removeClass("invalid");
        $(field).addClass("valid");
      }
    });

    return { hasErrors };
  };

  static validateInput = (elm) => {
    if (validator.isEmpty($(elm).val())) {
      validationError(elm, `This field is required.`);
    } else {
      switch ($(elm).attr("name")) {
        case "fName":
        case "lName":
        case "streetAddress":
        case "city":
          const formattedText = $(elm).val().replace(/\s|-/gi, "");

          if (!validator.isAlpha(formattedText, ["en-US"])) {
            validationError(elm, `Allowed characters are A-Z, a-z, '-', ' ', ''' .`);
          } else {
            validationSuccess(elm);
          }
          return;
        case "email":
          if (!validator.isEmail($(elm).val())) {
            validationError(elm, `Email is incorrect.`);
          } else {
            validationSuccess(elm);
          }
          return;
        case "phone":
          const formattedPhone = $(elm).val().replace(/\+/gi, "");

          if (!validator.isNumeric(formattedPhone, { no_symbols: true })) {
            validationError(elm, `Allowed characters are 0-9, +.`, { min_length: 10 });
          } else {
            validationSuccess(elm, { min_length: 10 });
          }
          return;
        case "dob":
          if (!validator.isNumeric(elm, { no_symbols: true })) {
            validationError(elm, `Allowed characters are 0-9, +.`, { min_length: 8 });
          } else {
            validationSuccess(elm, { min_length: 8 });
          }
          return;
        case "zipcode":
          if (!validator.isNumeric(elm, { no_symbols: true })) {
            validationError(elm, `Allowed characters are 0-9, +.`, { min_length: 5 });
          } else {
            validationSuccess(elm, { min_length: 5 });
          }
          return;
        case "password":
          const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-\.]).{8,}$/;

          if ($(elm).is("#si-password")) return;

          if (!validator.matches($(elm).val(), passwordRegex)) {
            validationError(
              elm,
              `Password should contain atleast one uppercase letter, one number, and one symbol.`
            );
            $(elm).siblings(".helper-text").css("margin-bottom", "2.2rem");
          } else {
            validationSuccess(elm, { min_length: 8 });
          }
          return;
        case "confirmPassword":
          const password = $('input[name="password"]').val();

          if ($(elm).val() !== password) {
            validationError(
              elm,
              `Values entered in 'Password' and 'Confirm Password' don't match.`
            );
          } else {
            validationSuccess(elm);
          }
        default:
          return;
      }
    }
  };
  // -----------------------
  // using regex returns true if a match is found indicating str contains only digits.
  // otherwise returns false.
  static onlyDigits = (str) => {
    if (str.match(/[^a-zA-Z]+\/?$/)) {
      return true;
    }
    return false;
  };
  // -----------------------
  // 3 functions below receive a keycode, the current string input value as an array, and the element
  // to manipulate. If match is made it makes its way to next regex, else it disables keydown event.
  static twoDigitMonth = (keycode, date, elmSelector) => {
    if (date[0].match(/^0/)) {
      if (date[0].match(/^0[1-9]/)) {
        if (keycode !== 8) {
          $(elmSelector).val(`${date.join("/")}/`);
        }
      } else if (keycode === 48) {
        return false;
      }
    } else if (date[0].match(/^1/)) {
      if (date[0].match(/^1[0-2]/)) {
        if (keycode !== 8) {
          $(elmSelector).val(`${date.join("/")}/`);
        }
      } else if (keycode >= 51) {
        return false;
      }
    } else if (date[0].match(/^[2-9]/)) {
      if (keycode !== 8) {
        date[0] = `0${date[0]}`;
        $(elmSelector).val(`${date.join("/")}/`);
      }
    }
    return;
  };

  static twoDigitDay = (keycode, date, elmSelector) => {
    if (date[1].match(/^0/)) {
      if (date[1].match(/^0[1-9]/)) {
        if (keycode !== 8) {
          $(elmSelector).val(`${date.join("/")}/`);
        }
      } else if (keycode === 48) {
        return false;
      }
    } else if (date[1].match(/^[123]/)) {
      if (date[1].match(/(^[12][0-9])|(^3[0-1])/)) {
        if (keycode !== 8) {
          $(elmSelector).val(`${date.join("/")}/`);
        }
      } else if (date[1].match(/^3/) && keycode >= 50) {
        return false;
      }
    } else if (date[1].match(/^[4-9]/)) {
      if (keycode !== 8) {
        date[1] = `0${date[1]}`;
        $(elmSelector).val(`${date.join("/")}/`);
      }
    }
    return;
  };

  static fourDigitYear = (keycode, date) => {
    if (date[2] === "" && (keycode === 48 || keycode >= 51)) {
      return false;
    } else if (keycode === 8) {
      return;
    }
    if (date[2].match(/^1/)) {
      if (date[2].match(/^19/)) {
        return;
      } else if (keycode <= 56) {
        return false;
      }
    }
    if (date[2].match(/^2/)) {
      if (date[2].match(/^20/)) {
        if (date[2].match(/^20[012]/)) {
          if (date[2].match(/^20[012]0/)) {
            return;
          } else if (keycode > 48) {
            return false;
          }
        } else if (keycode >= 51) {
          return false;
        }
      } else if (keycode > 48) {
        return false;
      }
    }
    return;
  };
}
