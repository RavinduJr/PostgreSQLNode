module.exports = {
    //CARS  QUERIES
    
    INSERT_CARS: "INSERT INTO cars(brand, model, year) VALUES($1, $2, $3)",
    CREATE_CARS_TABLE: "CREATE TABLE cars (brand VARCHAR(255), model VARCHAR(255), year INT)",
    GET_CARS: "SELECT * FROM cars",
    COUNT_CARS: "SELECT COUNT(*) FROM cars"
}