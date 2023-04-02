const express = require("express");
const router = express.Router();
const {  register, login, logout, deshboard } = require("../controller/auth");
const { isAuth } = require("../controller/isAuthnticate");
// const { isAuth } = require("../controller/isAuthnticate.js");

router.post("/register", register,)
router.get("/", (req, res) => { res.render("signup") })
router.post("/signin", login)
router.get("/signin", (req, res) => { res.render("signin") })
router.get("/logout",  logout)
router.get("/home",isAuth,  deshboard)

module.exports = router