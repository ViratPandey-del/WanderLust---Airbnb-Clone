const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");    

const usersController = require("../controllers/users.js");

const passport = require("passport");

router.route("/signup")
.get(usersController.renderSignupForm)
.post(wrapAsync(usersController.signup));

router.route("/login")
.get((req,res) => {
    res.render("users/login.ejs");
})
.post(saveRedirectUrl ,  passport.authenticate("local" , { failureRedirect: "/users/login" , failureFlash: true}), usersController.login);

router.get("/logout" , usersController.logout);

module.exports = router;    