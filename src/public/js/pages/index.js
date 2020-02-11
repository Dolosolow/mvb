require.context("../../images", true, /\.(png|svg|jpg)$/);
import "regenerator-runtime/runtime";
import "core-js/stable";

import { successMessage } from "client_utils/markup/messages";
import materialize from "client_utils/materialize-components";

import "src/public/scss/styles.scss";
// ----------------------
// Using sessionStorage, if obj messageAfterReload is stored after an event. On
// reload a one time message will displayed coming from connect-flash afterwards
// deleting/clearing that sessionstorage object.
function displayMessages() {
  if (sessionStorage.messageAfterReload) {
    const msg = sessionStorage.messageAfterReload;
    $(successMessage(msg)).insertAfter("#modal-login");

    materialize.init.modals("#modal-msg");
    $("#modal-msg").modal("open");

    delete sessionStorage.messageAfterReload;
  }
}

$(function () {
  // ----------------------
  // materialize... Initialization of materialize components
  materialize.init.dropDowns("#user-menu-btn");
  materialize.init.modals("#modal-login");

  displayMessages();
  // ----------------------
  // removes scrolling while the collpased navigation is opened/checked
  $("#navigation-toggle").on("click", function () {
    if ($(this).is(":checked")) {
      $("html").addClass("no-scroll");
    } else {
      $("html").removeClass("no-scroll");
    }
  });
  // ----------------------
  // Displays the change/new password modal when query is found in url
  if (window.location.href.includes("reset?token=")) {
    console.log("found something in the href");
    materialize.init.modals("#modal-newPwd");
    $("#modal-newPwd").modal("open");
  }
  // ----------------------
  // Waits for the animation classes, if added previously, to finish 1before removing them.
  // ** This is important as if not removed the materialize modal will not close on button click.
  $(".modal-content").on("animationend", function () {
    $(this).removeClass("fade-in--d fade-out");
  });
});
