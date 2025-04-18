const database = require("../database/database");

const getStudentByUsername = async (username) => {
  try {
    const [result] = await database.query("SELECT * FROM student WHERE username = ?", [username]);

    return result;
  } catch (err) {
    throw err;
  }
};

async function getPageBalance(username) {
  try {
    const [result] = await database.query(`SELECT page_num FROM student WHERE username = ?`, [
      username,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
}

async function updatePageBalance(username, addedPage) {
  try {
    const cur_balance = await getPageBalance(username);

    const updatedBalance = cur_balance + Number(addedPage);

    const [result] = await db.query("UPDATE student SET page = ? WHERE username = ?", [
      updatedBalance,
      username,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
}

const getInfo_Printer = async () => {
  try {
    const [result] = await database.query("SELECT * FROM printer");
    return result;
  } catch (err) {
    throw err;
  }
};

async function getStudentLogInfo(username) {
  console.log("uuuuuuuuuuuuuuu");
  try {
    const [result] = await database.query(`SELECT * FROM student WHERE username = ?`, [username]);

    return result;
  } catch (err) {
    throw err;
  }
}

async function getStudentLogParkInfo(username) {
  try {
    // First, get the student's ID (MSSV/stu_id) using their username
    const [studentResult] = await database.query("SELECT stu_id FROM student WHERE username = ?", [
      username,
    ]);

    if (!studentResult || studentResult.length === 0) {
      return []; // Return empty array if student not found
    }

    const MSSV = studentResult[0].MSSV;

    // Then fetch all parking history for this student using their MSSV
    const [historyResult] = await database.query(
      "SELECT * FROM History WHERE MSSV = ? ORDER BY parking_date DESC",
      [MSSV]
    );
    console.log("History Result:", historyResult);
    return historyResult;
  } catch (err) {
    console.error("Error fetching parking history:", err);
    throw err;
  }
}

module.exports = {
  getStudentByUsername,
  getPageBalance,
  updatePageBalance,
  getStudentLogInfo,
  getInfo_Printer,
  getStudentLogParkInfo,
};
