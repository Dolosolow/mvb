//---------------------
// Axios header configs
export default {
  headers: {
    "X-CSRF-TOKEN": $('[name=_csrf]').val()
  }
}