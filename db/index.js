const { Pool } = require("pg");

/**
 * @todo need to find the HOST of the db
 */

const pool = new Pool({
  user: "postgres",
  // added the host to test
  host: "localhost",
  database: "postgres",
  password: "1234",
  port: 5432,
  max: 10,
});

const queryHandler = async (queryString, values) => {
  const result = { query: {}, error: 0, message: "" };
  console.log("queryString", queryString);
  try {
    const query = await pool.query(queryString, values);
    result.query = query;
    result.error = 0;
    result.message = "";
    return result;
  } catch (error) {
    const errorMessage = error.message;
    if (errorMessage.includes("does not exist")) {
      result.query = {};
      result.error = 1;
      result.message = errorMessage;
      return result;
    }
    if (errorMessage.includes("already exists")) {
      result.query = {};
      result.error = 2;
      result.message = errorMessage;
      return result;
    }
  }
};

module.exports = queryHandler;