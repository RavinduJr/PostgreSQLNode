const express = require("express");
const path = require("path");
const fs = require("fs");
const rootDir = require("../util/path");
const { insertACar, getCars } = require("../db/cars");
const multer = require("multer");

const router = express.Router();
const upload = multer({dest: '../uploads/'});

router.get("/add-product", (req, res, next) => {
  res.render("add-product");
});

router.post("/add-product", upload.single("myImage"), (req, res) => {
  // const values = [];
  // const carName = req.body.cname;
  // const carPrice = req.body.cprice;
  // const carYear = req.body.cyear;
  // values.push(carName ? carName : "");
  // values.push(carPrice ? carPrice : "");
  // values.push(carYear ? carYear : 0);
  // insertACar(values);
  // res.redirect("/");
  // fs.readFile()

  const image = req.file;
  console.log("image", image);
  const targetPath = `public/images/${image.originalname}`;
  fs.rename(image.path, targetPath, (err) => {
    if (err) {
      console.log(err.message);
    }
    console.log("File uploaded successfully");
  });
});

module.exports = router;
