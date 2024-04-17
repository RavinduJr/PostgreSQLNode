const {
  INSERT_CARS,
  CREATE_CARS_TABLE,
  GET_CARS,
  COUNT_CARS,
  UPDATE_CARS,
} = require("../config/constants");
const queryHandler = require("./index");

const createCarsTable = async () => {
  const addedCarsTable = await queryHandler(CREATE_CARS_TABLE);
  if (addedCarsTable.error === 0) {
    return addedCarsTable;
  } else {
    console.log(addedCarsTable.message);
  }
};

const insertACar = async (brand, name, year, image) => {
  const result = { success: false };
  const values = [brand, name, year, image];
  const carInserted = await queryHandler(INSERT_CARS, values);
  console.log(carInserted);
  if (carInserted) {
    if (carInserted.error === 0) {
      result.success = true;
      return result;
    } else {
      const error = carInserted.error;
      if (error === 1) {
        const tableCreated = await createCarsTable();
        console.log("tableCreated", tableCreated);
        if (tableCreated.error === 0) {
          await insertACar(brand, name, year, image);
          result.success = true;
          return result;
        } else {
          console.log(tableCreated);
          result.success = false;
          return result;
        }
      } else {
        result.success = false;
        return result;
      }
    }
  } else {
    result.success = false;
    return result;
  }
};

const numberOfRowsInCars = async () => {
  const numberOfRows = await queryHandler(COUNT_CARS);
  if (numberOfRows.error === 0) {
    return numberOfRows;
  } else {
    console.log("numberOfRows error", numberOfRows);
    return numberOfRows;
  }
};

const getCars = async () => {
  const numberOfRows = await numberOfRowsInCars();
  const result = { rows: [], numberOfRows: 0 };
  if (numberOfRows.error === 0) {
    console.log(numberOfRows.query.rows[0].count);
    console.log(UPDATE_CARS);
    if (numberOfRows.query.rows[0].count > 0) {
      const cars = await queryHandler(GET_CARS);
      if (cars.error === 0) {
        result.rows = cars.query.rows;
        result.numberOfRows = numberOfRows.query.rows[0].count;
        return result;
      } else {
        console.log("fetch cars error", cars);
      }
    } else {
      return result;
    }
  } else {
    console.log(numberOfRows);
  }
};

const updateACar = async (isBrand, isName, isYear, carValues) => {
  const updateString = UPDATE_CARS;
  let setString = "";
  if (isBrand) {
    setString = setString.concat("brand = ", carValues[0], ",")
  }
  if (isName) {
    setString = setString.concat("name = ", carValues[1], ",")
  }
  if (isYear) {
    setString = setString.concat("year = ", carValues[2], ",")
  }
  console.log("setString", setString)
  const updateCar = await queryHandler(UPDATE_CARS, [setString, "1"]);
  console.log(updateCar)
};

module.exports = { insertACar, getCars, updateACar };
