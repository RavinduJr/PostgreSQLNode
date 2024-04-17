const express = require("express");
const { getCars, updateACar } = require("../db/cars");

const router = express.Router();

router.get("/cars", async (req, res, next) => {
  const cars = await getCars();
  res.send(cars.rows)
});

router.get("/hello", async (req, res, next) => {
  updateACar(true, true, true, ["hi", "heello", "bitch"])
})



module.exports = router;
