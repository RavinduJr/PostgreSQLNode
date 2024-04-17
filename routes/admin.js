const express = require("express");
const path = require("path");
const fs = require("fs");
const rootDir = require("../util/path");
const { insertACar, getCars } = require("../db/cars");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "../uploads/" });

router.get("/add-product", (req, res, next) => {
  res.render("add-product");
});

router.post("/add-product", upload.single("myImage"), async (req, res) => {

  const cBrand = req.body.cBrand;
  const cName = req.body.cName;
  const cYear = req.body.cYear;

  const image = req.file;
  console.log("image", image);
  const targetPath = `public/images/${image.originalname}`;
  fs.rename(image.path, targetPath, (err) => {
    if (err) {
      if (err.message.includes("no such file or directory")) {
        fs.mkdir(`public/${image.mimetype}/`);
      }
    } else {
      console.log("File uploaded successfully");
    }
  });
  const fileName = image.originalname;
  const imageUrl = `http://localhost:3000/image/${fileName}`
  const result = await insertACar(cBrand, cName, cYear, imageUrl);
  res.status(200).send(result)
  // save the filepath in the db
});

router.get("/image/:filename", (req, res, next) => {
  const fileName = (req.params.filename)
  const filePath = path.join(rootDir, "public", "images", fileName)
  res.sendFile(filePath, (err) => {
  })
  // for (const r in req.params) {
  // }
});

module.exports = router;
