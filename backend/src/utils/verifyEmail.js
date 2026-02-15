import User from "../../models/userModel.js"; // Note the .js extension

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        message: "no token passed",
      });
    }

    const user = await User.findOne({ where: { verificationToken: token } });

    if (!user) {
      return res.status(400).json({
        message: "invalid token",
      });
    }

    // check token expire
    if (user.verificationTokenExpires < new Date()) {
      return res.status(400).json({
        message: "token expired",
      });
    }

    // modify row data
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;

    await user.save();

    return res.status(200).json({
      // Changed 201 to 200 as it's an update, not a creation
      message: "woah! email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      // Added 500 status code
      message: "server side error",
      error: error.message,
    });
  }
};

export default verifyEmail;
