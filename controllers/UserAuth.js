const Users = require("../models/Users");
const { sign } = require("jsonwebtoken");

const LoginMiddleWare = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (user.password === password) {
      const token = await returnSignedToken({ _id: user._id, password, email });
      res.status(200).json({
        user,
        token,
      });
    } else {
      res.status(400).json({ error: "password doesn't match" });
    }
  } catch {
    res.status(400).json({ error: "user doesn't exist" });
  }
};

const SignUpMiddleWare = async (req, res) => {
  const { email, password } = req.body;
  try {
    const alreadyUser = await Users.findOne({ email });
    if (!alreadyUser) {
      const user = await new Users({ ...req.body }).save();
      const token = await returnSignedToken({ _id: user._id, password, email });
      res.status(200).json({
        user,
        token,
      });
    } else {
      res.status(400).json({ error: "User with email already exist" });
    }
  } catch {
    res.status(400).json({ error: "Error in user creation" });
  }
};

const returnSignedToken = async (data) => {
  return await sign(data, process.env.ACCESS_TOKEN_SECRET);
};

module.exports = { LoginMiddleWare, SignUpMiddleWare };
