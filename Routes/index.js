const { Router } = require("express");
const router = Router();
const login = require("./login");

router.use("/login", login);

module.exports = router;
