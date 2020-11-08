import headerConfig from "@src/config/headers";
import validation from "client_utils/validation";

import lang from "@src/lang/en.json";
// --------------------
// Messageboard for displaying form/submittion/general feedback to user
import Messenger from "client_utils/messenger";

$("#cart-btn").click(async function (evt) {
  evt.preventDefault();
  const formSelector =
    ".section-layout form:not(#act-quick-login__form) input:not(#streetAddress2, .select-dropdown)";

  const validations = validation.preSubmitValidations(formSelector);

  if (validations.errors.length === 0) {
    try {
      const confirmation = await axios.post(
        "/checkout",
        { data: { ...validations.inputValues } },
        headerConfig
      );
      Messenger.setNewMessage(confirmation.data.msg, confirmation.data.status);
      window.location.href = "/";
    } catch (err) {
      Messenger.setNewMessage(lang.email.sendTicketMail.fail, true);
    }
  }
});
