import axios from "axios";
import headerConfig from "@src/config/headers";
import validation from "client_utils/validation";

// -------------------
// Verify email address
const checkToVerifyEmail = async () => {
  if (window.location.href.includes("/verify?token")) {
    const token = window.location.search.split("=")[1];

    try {
      const confirmation = await axios.post("/api/auth/verify-email", { token }, headerConfig);
      Messenger.setNewMessage(confirmation.data.msg, confirmation.data.status);
    } catch (err) {
      Messenger.setNewMessage(err.response.data.msg, err.response.data.status);
    }
    window.location.href = "/";
  }
};

$(function () {
  checkToVerifyEmail();
  // -------------------
  // user input events
  $("#login-form :input").on("focusout", function (evt) {
    validation.validateInput(evt.target);
  });

  $("#login-form :input").on("keyup", function (evt) {
    if ($(".alert-error").length) $(".alert-error").remove();
    if ($(this).hasClass("invalid")) validation.validateInput(evt.target);
  });

  // -------------------
  // Login form submit
  $("#login-form, #act-quick-login__form").on("submit", async function (evt) {
    evt.preventDefault();

    const loginCredentials = {
      email: $("[name=email]").val(),
      password: $("[name=password]").val(),
    };

    try {
      await axios.post("/api/auth/login", { ...loginCredentials }, headerConfig);
      window.location.reload();
    } catch (err) {
      const error = err.response.data.msg;
      $("#si-password").val(null);
      $("#si-password").trigger("blur");
      $('<div class="alert-error" role="alert">').text(error).insertAfter("#fg-psw");
    }
  });
  // -------------------
  // logout form submit
  $("#logout-form__nav, #logout-form__nav-collapse").on("submit", async function (evt) {
    evt.preventDefault();

    try {
      const confirmation = await axios.post("/api/auth/logout", null, headerConfig);
      sessionStorage.messageAfterReload = confirmation.data.msg;
      window.location.reload();
    } catch (err) {
      console.log(`something went wrong: ${err.response}`);
    }
  });
  // -------------------
  // controls/toggles the content being shown in the login-modal
  $("#fg-pwd, #bck-si").click(function () {
    const elemId = $(this).attr("id");
    const loginModal = $("#modal-content--login");
    const pwdResetModal = $("#modal-content--pwdReset");

    $("input[type='email']").val("");
    $("input[type='password']").val("");

    $("#modal-content--login, #modal-content--pwdReset").removeClass("fade-out fade-in--d");

    $(loginModal).addClass(elemId === "fg-pwd" ? "fade-out" : "fade-in--d");
    $(pwdResetModal).addClass(elemId === "fg-pwd" ? "fade-in--d" : "fade-out");

    $(loginModal).css("display", elemId === "fg-pwd" ? "none" : "block");
    $(pwdResetModal).css("display", elemId === "fg-pwd" ? "block" : "none");
  });
});
