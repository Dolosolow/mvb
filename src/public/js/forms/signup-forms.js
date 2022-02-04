import validation from "client_utils/validation";

$(function () {
  $("#act-silver-forms form :input, #email-silver-form :input")
    .not('[name="referralCode"]')
    .on("focusout", function (evt) {
      validation.validateInput(evt.target);
    });

  $("#act-silver-forms form :input, #email-silver-form :input")
    .not('[name="referralCode"]')
    .on("keyup", function (evt) {
      if ($(this).hasClass("invalid")) validation.validateInput(evt.target);
    });
  // -------------------
  // memebership email submit for quick banner silver signup
  $("#email-silver-form").on("submit", function (evt) {
    evt.preventDefault();
    const email = $("#email-silver-form :input");

    if (!email.hasClass("invalid")) {
      sessionStorage.silverEmail = email.val();
      email.val("");
      window.location = "/membership/silver";
    }
  });
  // -------------------
  // silver + gold signup post
  $("#submit-silver, #submit-gold").on("click", async function (evt) {
    evt.preventDefault();
    let newAccount = {};
    let errors = [];

    $(
      "#act-silver-forms form :input, #act-silver-forms form :input, #act-gold-forms form :input, #act-gold-forms form :input"
    )
      .not('[name="referralCode"], button')
      .each(function (idx) {
        let currentElem = $(this);

        if (currentElem.val() === "" || currentElem.hasClass("invalid")) {
          currentElem.addClass("invalid");
          errors.push(currentElem);
        } else {
          if (currentElem.attr("type") === "checkbox") {
            currentElem.val(currentElem.is(":checked"));
          }
          newAccount[currentElem.attr("name")] = currentElem.val().trim();
        }
      });

    if (errors.length === 0) {
      // ----------------
      // once reached to this point. confirmation of the user's password has been validated.
      // It is removed as it is no longer needed for the post call.
      delete newAccount.confirmPassword;

      if (evt.target.id === "submit-silver") {
        await axios.post("/api/auth/sivler-signup", { data: { ...newAccount } });
      } else {
        await axios.post("/api/auth/gold-signup", { data: { ...newAccount } });
      }
    }
  });
});
