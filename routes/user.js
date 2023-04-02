const express = require("express");
const router = express.Router();
const {    employLogin, employAttendance,lastmonth, leaveApply, leaveget, EmployAttendancePost, thisMonth,  } = require("../controller/user.js");

router.get("/", (req, res) => { res.render("login") })
router.get("/attendance/:id", employAttendance)
router.post("/attendance/:id", EmployAttendancePost)
router.get("/leave/:id",leaveget )
router.post("/leave/:id", leaveApply )
router.post("/login", employLogin)
router.get('/detail/:id', thisMonth)
router.get("/lastmonthDetail/:id", lastmonth)



module.exports = router