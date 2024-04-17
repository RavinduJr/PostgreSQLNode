module.exports = {
    //CARS  QUERIES
    
    INSERT_CARS: "INSERT INTO cars VALUES($1, $2, $3, $4)",
    CREATE_CARS_TABLE: "CREATE TABLE cars (brand VARCHAR(255), name VARCHAR(255), year INT, image VARCHAR(255))",
    GET_CARS: "SELECT * FROM cars",
    COUNT_CARS: "SELECT COUNT(*) FROM cars",
    UPDATE_CARS: `UPDATE cars SET $1 WHERE id = $2`
}