const queryHandler = require("./index");

const createUserTable = async () => {
  const createTable = await queryHandler(`CREATE TABLE users (
	username VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
	password VARCHAR(255)
);`);
  return createTable
};

const createUser = async (username, password) => {
    if (username && password){
        const insertUser = await queryHandler(`INSERT INTO users VALUES ('${username}', '${password}')`)
        if (insertUser.error === 0){
            return true
        } else{
            console.log("insertUser", insertUser)
            if (insertUser.error === 1){
                const createTable = await createUserTable()
                if (createTable.error === 0){
                    await createUser(username, password)
                } else {
                    console.log("Error in creating the table")
                }
            }
        }
    } else {
        console.log("missing values")
        return false
    }
};
const userExistHandler = async(username) => {
    const usernameExists = await queryHandler('select * from users where username = $1', [username])
    if (usernameExists.error === 0){
        return true
    } else {
        return false
    }
}
const checkUser = async (username, password) => {
    const result = {validUser: false, canLogin: false}
    const exists = await userExistHandler(username)
    if (exists === true){
        const alreadyUser = await queryHandler('select * from users where username = $1 and password = $2', [username, password])
        if (alreadyUser.error === 0) {
            const resultLength = alreadyUser.query.rows.length
            if (resultLength > 0 ){
                result.validUser = true
                result.canLogin = true
                return result
            } else {
                result.validUser = true
                result.canLogin = false
                return result
            }
        } else {
            result.validUser = true
            result.canLogin = false
            return result
        }
    } else {
        return result
    }
};


module.exports = {createUser, checkUser}