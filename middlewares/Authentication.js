const { verify } = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

const Authentication = (req, res, next) => {
  const bearerHeader = req.headers["Authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    // req.token = bearerToken;

    verify(
      bearerToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) {
          res.status(401).json({ error: "jwt invalid" });
        } else {
          let user = await User.findById(decodedToken.id);
          if (user) {
            req.user = user;
            next();
          } else {
            res.status(401).json({ error: "user not found" });
          }
        }
      }
    );
  } else {
    res.status(401).json({ error: "token missing" });
  }
};

module.exports = Authentication;
