const jwt = require("jsonwebtoken");

const Users = require("../models/Users");
require("dotenv").config();

const checkUser = async (req, res, next) => {
  const { user, password } = req.body;
  if (user && password) {
    const query = await Users.findOne({ name: user });
    if (query) {
      jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
        const { _doc } = query;
        if (_doc.password === password) res.json({ ..._doc, token });
        res.status(401).json({ error: "wrong password" });
        next();
      });
    } else {
      res.status(401).json({ error: "user not found" });
    }
  }
  // const bearerHeader = req.headers["authorization"];

  // if (bearerHeader) {
  //   const bearerToken = bearerHeader.split(" ")[1];
  //   if (bearerToken) {
  //     jwt.verify(
  //       bearerToken,
  //       process.env.ACCESS_TOKEN_SECRET,
  //       async (err, decodedToken) => {
  //         // if (err) res.status(401).json({ error: "jwt invalid" });
  //         let user = await Users.findById(req.body._id);
  //         if (user) {
  //           req.user = user;
  //           res.json(user);
  //           next();
  //         } else {
  //         }
  //       }
  //     );
  //   }
  // }
};

module.exports = { checkUser };
