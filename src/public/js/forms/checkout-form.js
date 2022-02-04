import axios from "axios";

import headerConfig from "@src/config/headers";
import validation from "@src/public/js/utils/validation";
// --------------------
// Messageboard for displaying form/submittion/general feedback to user
import Messenger from "client_utils/messenger";

import lang from "@src/lang/en.json";

// ---------------------
// socket initial handshake with server
let socket = io("localhost:5001", {
  query: `screenId=${$("#screen-avl__times-list .time").eq(0).data("id")}`,
});

$(function () {
  $("#cart-btn, #mobi-cart-btn").on("click", async function (evt) {
    evt.preventDefault();
    const formSelector =
      ".section-layout form:not(#act-quick-login__form) input:not(#streetAddress2, .select-dropdown)";

    const validations = validation.preSubmitValidations(formSelector);

    if (!validations.hasErrors) {
      const inputValues = validation.getFormValues(
        ".section-layout form:not(#act-quick-login__form) input"
      );

      try {
        const confirmation = await axios.post(
          "/checkout",
          { data: { ...inputValues } },
          headerConfig
        );
        Messenger.setNewMessage(confirmation.data.msg, confirmation.data.status);
        window.location.href = "/";
      } catch (err) {
        Messenger.setNewMessage(lang.email.sendTicketMail.fail, false);
      }
    }
  });

  $("#guest-co-btn").on("click", function () {
    $("#act-quick-login").closest("button.btn-transparent").trigger("click");
    $(this).closest("ul").find("li:nth-child(2) button.btn-transparent").trigger("click");
  });

  $("#cart-cancel-btn").on("click", async function () {
    const { cart } = await (await axios.get("/api/cart")).data;
    const { seatIds } = await (await axios.get("/api/cart/seats-ids")).data;

    await axios.delete(`/api/cart/${seatIds.join("+")}`, headerConfig);
    socket.emit("clear reservation", { cartId: cart._id, screenId: cart.items[0].screenId });

    const url = localStorage.getItem("murl");

    localStorage.removeItem("murl");
    window.location.href = `${url}`;
  });
});
