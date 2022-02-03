/**
|--------------------------------------------------
| Pony Express is the email delivering system for this website. Under the hood it uses
| Sendgrid for transporting email across to visitors. Serves sending email verifications,
| password resets, and customer purchase receipt.
|
| For sake of cleanliness the contents(view) of the emails, although files are in js, they are kept along with the other views 
| under templates/email.
|--------------------------------------------------
*/
import dotenv from "dotenv";
dotenv.config();

import sgMail from "@sendgrid/mail";
// -------------------
// Email Templates
import passwordReset from "@src/views/templates/email/reset-password.template";
import verifyEmail from "@src/views/templates/email/email-verification.template";
import purchaseReceipt from "@src/views/templates/email/customer-receipt.template";
// -------------------
// Sendgrid API key setup
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const formatMail = (recipient, subject, template) => {
  const sender = process.env.TEMP_SENDER_EMAIL;

  if (sender === undefined || sender === null) {
    throw new Error(`Sender cannot be null. Must be set as its null by default`);
  } else {
    return {
      to: { email: recipient },
      from: { email: sender, name: "FLIX | Dine in Theater" },
      subject: subject,
      html: template,
    };
  }
};

const sendMail = async (msg) => {
  try {
    await sgMail.send(msg);
  } catch (err) {
    throw {
      statusCode: err.code,
      msg: err.response.body.errors[0].message,
    };
  }
};

export default class PonyExpress {
  constructor() {
    this.recipient = null;
  }

  static setRecipient = (recipient) => {
    this.recipient = recipient;
  };

  static testMail = async () => {
    if (this.recipient === null) {
      throw new Error(`Receipient cannot be null. Must be set as its null by default`);
    } else {
      const msg = formatMail(
        this.recipient,
        "Email transport test",
        `<h1 style="text-align: center;">If you are seeing this, 👌🏼👍🏽 everthing is going noice.</h1>`
      );

      try {
        await sendMail(msg);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  };

  static resetPassword = async (subject, token) => {
    const msg = formatMail(this.recipient, subject, passwordReset(token));

    try {
      await sendMail(msg);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  static verifyEmailAddress = async (subject, token) => {
    const msg = formatMail(this.recipient, subject, verifyEmail(token));

    try {
      await sendMail(msg);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  static sendMovieTicketReceipt = async (subject, data) => {
    const msg = formatMail(this.recipient, subject, purchaseReceipt(data));

    try {
      await sendMail(msg);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}
