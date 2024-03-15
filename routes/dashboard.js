const express = require("express");
const { createUser, checkUser } = require("../db/users");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("dashboard");
});

router.get("/login", (req, res, next) => {
  res.render("login", { message: "" });
});

router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/add-user", async (req, res, next) => {
  const reqbody = req.body;
  const username = reqbody.username;
  const password = reqbody.password;
  const userAdded = await createUser(username, password);
  if (userAdded === true) {
    res.redirect("/cars");
  }
});

router.post("/user-login", async (req, res) => {
  const reqbody = req.body;
  const username = reqbody.username;
  const password = reqbody.password;
  const login = await checkUser(username, password);
  if (login.canLogin === true) {
    if (username === "ad") {
        res.status(200).redirect('/add-product')
    } else {
      res.status(200).redirect("/cars");
    }
  } else {
    res.render("login", { message: "Couldn't login" });
  }
});

module.exports = router;
