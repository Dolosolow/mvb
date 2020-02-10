import mongoose from "mongoose";

const authTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

authTokenSchema.index({ createdAt: 1 }, { expires: "60m" });

authTokenSchema.statics.getUserEmailByToken = function (token) {
  return new Promise(async (resolve, reject) => {
    try {
      await this.findOne({ token })
        .populate({
          path: "user",
          select: "email",
          model: "User",
        })
        .exec((err, token) => {
          if (err) {
            throw "Error: Something occured while retreiving user data";
          }
          resolve(token.user.email);
        });
    } catch (err) {
      reject(`Error No user found`);
    }
  });
};

export default mongoose.model("AuthToken", authTokenSchema);
