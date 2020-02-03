/**
|--------------------------------------------------
| Used for showing messages to the user, whether their request
| has been successful or not. Depending on the status of the request
| User would receive feedback "confirmation" on success or "Error" on 
| a failed attempt. User should be prompted on next step nonetheless.
|
| This utilizes sessionStorage for storing both one time message and status.
|--------------------------------------------------
*/
import materialize from "client_utils/materialize-components";
import { errorMessage, successMessage } from "client_utils/markup/messages";

export default class Messenger {
  static clearMessageBoard = () => {
    delete sessionStorage.messageAfterReload;
    delete sessionStorage.messageStatus;
  };

  static displayMessage = (msgModal, insertAfterElm) => {
    if (sessionStorage.messageAfterReload && sessionStorage.messageStatus) {
      const msg = sessionStorage.messageAfterReload;

      if (sessionStorage.messageStatus === "true") {
        $(successMessage(msg)).insertAfter(insertAfterElm);
      } else {
        $(errorMessage(msg)).insertAfter(insertAfterElm);
      }

      materialize.init.modals(msgModal);
      $(msgModal).modal("open");

      this.clearMessageBoard();
    }
  };

  static setNewMessage = (msg, status) => {
    sessionStorage.messageAfterReload = msg;
    sessionStorage.messageStatus = status;
  };

  static promptWarningMessage = (url) => {
    $(
      render.promptMessage("Are you sure you want to cancel your order? Your items will be lost.")
    ).insertAfter("#modal-login");

    materialize.init.modals("#modal-msg--prompt");

    $("#modal-msg--prompt").modal("open");
    $("#btn-prompt-yes").attr("data-url", url);
  };

  static removePromptMessage = () => {
    $("#modal-msg--prompt").modal("close");

    setTimeout(() => {
      $("#modal-msg--prompt").remove();
    }, 1000);
  };
}
