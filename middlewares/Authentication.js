const { verify } = require("jsonwebtoken");
require("dotenv").config();

const Authentication = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    verify(
      bearerToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) {
          res.status(401).json({ error: "token invalid" });
        } else {
          next();
        }
      }
    );
  } else {
    // if (process.env.DEVELOPMENT)
    next();
    // else res.status(401).json({ error: "token missing" });
  }
};

module.exports = { Authentication };
