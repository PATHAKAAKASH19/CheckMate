const express = require("express");
const router = express.Router();
const {showLogInPage , showSignUpPage , handleLogIn , handleSignUp, logout} = require("../controllers/auth.controller")
const passport = require("passport")


router.get("/signup" , showSignUpPage)

router.get("/login",  showLogInPage)

router.post("/signup", handleSignUp)

router.post("/login", passport.authenticate("local" , {failureRedirect: "/auth/login"}),handleLogIn)

router.get("/logout" , logout)

module.exports = router;