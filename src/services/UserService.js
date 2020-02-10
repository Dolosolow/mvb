import crypto from "crypto";

import User from "@src/models/user";
import AuthToken from "@src/models/authToken";

import EmailService from "@src/services/EmailService";

const clearAuthTokens = async (user) => {
  const token = user.authToken;

  user.authToken = undefined;
  await user.save();
  await AuthToken.findOneAndRemove({ token });
};

const createRandomBytes = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        const error = new Error("Random bytes was not created");
        console.log(error);
        reject(error);
      }
      const bytes = buffer.toString("hex");
      resolve(bytes);
    });
  });
};

export default class UserService {
  static login = async (userData) => {
    const { email, password } = userData;

    try {
      const user = await User.findOne({ email });
      const passwordMatch = await user.comparePasswords(password);

      return { user, passwordMatch };
    } catch (err) {
      throw {
        statusCode: 401,
        msg: err.response.body.errors[0].message,
      };
    }
  };

  static signup = async (userData) => {
    const token = await createRandomBytes();
    const newUser = new User({ ...userData, verified: false });

    await newUser.applyAuthToken(token);
    await newUser.save();

    try {
      await EmailService.sendSignupMail(newUser.email, token);
    } catch (err) {
      throw err;
    }
  };

  static resetAccountPwd = async (email) => {
    const token = await createRandomBytes();
    const user = await User.findOne({ email });

    await user.applyAuthToken(token);
    await user.save();

    console.log("sending reset account");

    try {
      await EmailService.sendResetPwdMail(user.email, token);
    } catch (err) {
      throw err;
    }
  };

  static updateAccountPwd = async (userData) => {
    const { email, nwPassword } = userData;
    const user = await User.findOne({ email });

    user.password = nwPassword;
    await clearAuthTokens(user);

    return user;
  };

  static verifyEmailAccount = async (token) => {
    const user = await User.findOne({ authToken: token });

    user.verified = true;
    await clearAuthTokens(user);

    return user;
  };

  static completePurchase = async () => {};
}
