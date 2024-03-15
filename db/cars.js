const { INSERT_CARS, CREATE_CARS_TABLE, GET_CARS, COUNT_CARS } = require("../config/constants");
const queryHandler = require("./index");

const createCarsTable = async () => {
  const addedCarsTable = await queryHandler(
    CREATE_CARS_TABLE
  );
  if (addedCarsTable.error === 0) {
    return addedCarsTable;
  } else {
    console.log(addedCarsTable.message);
  }
};

const insertACar = async (values) => {
  const carInserted = await queryHandler(
    INSERT_CARS,
    values
  );
  console.log(carInserted);
  if (carInserted.error === 0) {
    return;
  } else {
    const error = carInserted.error;
    if (error === 1) {
      const tableCreated = await createCarsTable();
      console.log("tableCreated", tableCreated);
      if (tableCreated.error === 0) {
        await insertACar();
      } else {
        console.log(tableCreated);
      }
    } else {
      console.log("carInserted error", carInserted);
    }
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

module.exports = { insertACar, getCars };
