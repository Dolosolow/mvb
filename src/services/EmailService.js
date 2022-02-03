import PonyExpress from "@src/utils/lib/ponyExpress";
import langTranslations from "@src/lang/en.json";

// -------------------
// json file containing text that will populate the ui content. Great as all user feedback will be found in the file.
const context = langTranslations;

export default class EmailService {
  // ------------------
  // Can be used for the inital user signup and in the case the email with token is deleted or
  // token has expired.
  static sendSignupMail = async (email, token) => {
    try {
      PonyExpress.setRecipient(email);
      await PonyExpress.verifyEmailAddress(context.email.verifyMail.subject, token);
    } catch (err) {
      throw err;
    }
  };

  static sendResetPwdMail = async (email, token) => {
    try {
      PonyExpress.setRecipient(email);
      await PonyExpress.resetPassword(context.email.resetPwdMail.subject, token);
    } catch (err) {
      throw err;
    }
  };

  static sendConfirmationMail = async (email, data) => {
    try {
      PonyExpress.setRecipient(email);
      await PonyExpress.sendMovieTicketReceipt(context.email.sendTicketMail.subject, data);
    } catch (err) {
      throw err;
    }
  };
}
