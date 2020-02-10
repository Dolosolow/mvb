import axios from "axios";
import headerConfig from "@src/config/headers";
import validation from "client_utils/validation";
import Messenger from "client_utils/messenger";

// reset-pwd-form

$(function () {
  // -------------------
  // user input events
  $("#reset-pwd-form :input").on("focusout", function (evt) {
    validation.validateInput(evt.target);
  });

  $("#reset-pwd-form :input").on("keyup", function (evt) {
    if ($(".alert-error").length) $(".alert-error").remove();
    if ($(this).hasClass("invalid")) validation.validateInput(evt.target);
  });
  // -------------------
  // Password reset form
  $("#reset-pwd-form").on("submit", async function (evt) {
    evt.preventDefault();

    const email = $("#rpwd-email").val().toLowerCase();

    try {
      const confirmation = await axios.post("/api/auth/reset-pwd", { email }, headerConfig);
      Messenger.setNewMessage(confirmation.data.msg, confirmation.data.status);
    } catch (err) {
      Messenger.setNewMessage(confirmation.data.msg, confirmation.data.status);
    }
    window.location.reload();
  });
  // -------------------
  // Update password form
  $("#update-pwd-form").submit(async function (evt) {
    evt.preventDefault();

    const nwPassword = $(this).find("[name=password]").val();
    const email = $(this).find('[name="_email"]').val();
    const token = $(this).find('[name="_rstt"]').val();

    const validations = validation.preSubmitValidations("#update-pwd-form :input");

    if (validations.errors.length === 0) {
      try {
        const confirmation = await axios.post(
          "/api/auth/new-pwd",
          { email, nwPassword, token },
          headerConfig
        );
        Messenger.setNewMessage(confirmation.data.msg, confirmation.data.status);
      } catch (err) {
        Messenger.setNewMessage(err.response.data.msg, err.response.data.status);
      }

      window.location.href = "/";
    }
  });
});
