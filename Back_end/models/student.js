const database = require('../database/database');

const getStudentByUsername = async (username) => {

    try {
        const [result] = await database.query('SELECT * FROM student WHERE username = ?', [username]);

        return result;

    } catch (err) {
        throw err;
    }
}

async function getPageBalance(username) {
    try {
        const [result] = await database.query(`SELECT page_num FROM student WHERE username = ?`, [username]);
        return result;
    } catch (err) {
        throw err;
    }
}

async function updatePageBalance(username, addedPage) {
    try {
        const cur_balance = await getPageBalance(username);
        
        const updatedBalance = cur_balance + Number(addedPage);
        
        const [result, ] = await db.query(
            "UPDATE student SET page = ? WHERE username = ?",
            [updatedBalance, username]
        );
        return result;
    } catch (err) {
        throw err;
    }
  }

const getInfo_Printer = async () => {
    try {
        const [result] = await database.query('SELECT * FROM printer');
        return result;
    } catch (err) {
        throw err;
    }
}

async function getStudentLogInfo(username) {
    console.log("uuuuuuuuuuuuuuu")
    try {

        const [result] = await database.query(`SELECT * FROM Student WHERE username = ?`, [username]);
        
        return result;
    } catch (err) {
        throw err;
    }
}



module.exports = {
    getStudentByUsername,
    getPageBalance,
    updatePageBalance,
    getStudentLogInfo,
    getInfo_Printer
};