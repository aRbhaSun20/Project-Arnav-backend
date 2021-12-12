const { Router } = require("express");
const { checkUser } = require("../middlewares/userAuth");
// const Users = require("../models/Users");

const login = Router();

login.post("/", checkUser);

module.exports = login;
