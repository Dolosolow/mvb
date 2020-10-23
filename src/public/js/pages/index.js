require.context("../../images", true, /\.(png|svg|jpg)$/);
import "regenerator-runtime/runtime";
import "core-js/stable";
import 'src/public/scss/styles.scss';
import materialize from 'client_utils/materialize-components';

// ----------------------
// removes scrolling while the collpased navigation is opened/checked
$('#navigation-toggle').click(function() {
  if($(this).is(':checked')) {
    $('html').addClass('no-scroll');
  } else {
    $('html').removeClass('no-scroll');
  }
})
// ----------------------
// Using sessionStorage, if obj messageAfterReload is stored after an event. On
// reload a one time message will displayed coming from connect-flash afterwards
// deleting/clearing that sessionstorage object.
function displayMessages() {
  if(sessionStorage.messageAfterReload) {
    $('#modal-msg').modal('open');
    delete sessionStorage.messageAfterReload;
  }
}

$(document).ready(function() {
  // ----------------------
  // materialize... Initialization of materialize components
  materialize.dropDowns.userMenu;

  materialize.modals.messageModal;

  materialize.modals.loginModal;

  displayMessages();
})