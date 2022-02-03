import User from '@src/models/user';
import langTranslations from '@src/lang/en.json';

export default async (req, res, next) => {
  const context = langTranslations;

  const { email } = req.body.data;
  const foundUser = await User.findOne({ email });

  if(foundUser) {
    return res.status(409).send({ status: false, msg: context.account.error.signup_taken });
  }

  next();
}