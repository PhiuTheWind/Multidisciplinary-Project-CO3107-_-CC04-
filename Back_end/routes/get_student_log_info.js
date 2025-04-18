const express = require("express");
const router = express.Router();
const studentLogController = require("../controllers/studentLogController");
const authenticate = require("../middlewares/authenticate");

router.post("/log", authenticate, studentLogController.GetStudentLog);
router.post("/park", authenticate, studentLogController.GetStudentParkLog);

module.exports = router;
