import axios from 'axios';
import headerConfig from '@src/config/headers';
import validation from 'client_utils/validation';
// -------------------
// user input events
$('#login-form :input').focusout(function(evt) {
  validation.validateInput(evt.target);
})

$('#login-form :input').keyup(function(evt) {
  if($('.alert-error').length) $('.alert-error').remove();
  if($(this).hasClass('invalid')) validation.validateInput(evt.target);
})

// -------------------
// Login form submit
$('#login-form').submit(async function(evt) {
  evt.preventDefault();

  const loginCredentials = { 
    email: $('[name=email]').val(), 
    password: $('[name=password]').val()
  };

  try {
    await axios.post('/api/auth/login', { ...loginCredentials }, headerConfig);
    window.location.reload();
  } catch (err) {
    const error = err.response.data.msg;
    $('#si-password').val(null);
    $('#si-password').trigger('blur');
    $('<div class="alert-error" role="alert">').text(error).insertAfter('#fg-psw');
  }
});
// -------------------
// logout form submit
$('#logout-form__nav, #logout-form__nav-collapse').submit(async function(evt) {
  evt.preventDefault();
  
  try {
    const confirmation = await axios.post('/api/auth/logout', null, headerConfig);
    sessionStorage.messageAfterReload = confirmation.data.msg;
    window.location.reload();
  } catch (err) {
    console.log(`something went wrong: ${err.response}`);
  }
});