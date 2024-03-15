const express = require("express");
const { getCars } = require("../db/cars");

const router = express.Router();

router.get("/cars", async (req, res, next) => {
  const cars = await getCars();
  console.log(cars);
  res.render("shop", { cars: cars.rows });
});

module.exports = router;
