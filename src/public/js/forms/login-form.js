$('#login-form').submit(async function(evt) {
  evt.preventDefault();
  await axios.post('/api/auth/login');
  window.location.reload();
  window.location.href = '/';
});

$('#logout-form__nav, #logout-form__nav-collapse').submit(async function(evt) {
  evt.preventDefault();
  await axios.post('/api/auth/logout');
  sessionStorage.messageAfterReload = true;
  window.location.reload();
});