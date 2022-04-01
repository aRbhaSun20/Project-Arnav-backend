const { Router } = require("express");
const {
  LoginMiddleWare,
  SignUpMiddleWare,
} = require("../controllers/UserAuth");

const loginRouter = Router();

loginRouter.post("/login", LoginMiddleWare);
loginRouter.post("/signup", SignUpMiddleWare);

module.exports = loginRouter;
