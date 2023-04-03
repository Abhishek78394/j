const db = require("../models");
const { Op } = require('sequelize');
const User = db.admin;
const Employee = db.employes
const Salary = db.salaries
const Leave = db.leave
const Attendance = db.attendance
const moment = require('moment');

const employLogin = async (req, res) => {
    const { email, password } = req.body;
    let employ = await Employee.findOne({ where: { email } }).then((ewmploy) => {
        let employ = ewmploy.dataValues;
        return employ;
    });
    if (!employ) {
        return res.status(404).json({ message: "employ not found" });
    }
    if (!employ.password == password) {
        return res.status(404).json({ message: "wroun password" });
    }
    res.redirect(`/attendance/${employ.id}`)
}

const employAttendance = async (req, res) => {
    id = req.params.id
    res.render("attendance", { id })
}
const leaveget = async (req, res) => {
    id = req.params.id;


    res.render("leave", { id })
}
const leaveApply = async (req, res) => {
    id = req.params.id
    console.log(req.body)
    await Leave.create({
        employ_id: id,
        date: req.body.date,
        reason: req.body.reason,
    });
    res.redirect(`/attendance/${id}`)
}
const EmployAttendancePost = async (req, res) => {
    id = req.params.id
    console.log(id)
    console.log(req.body, "hg")

    await Attendance.create({
        employ_id: id,
        date: req.body.date,
        total_working_hours: req.body.total_working_hours,
    });
    console.log("object")
    res.redirect(`/attendance/${id}`)
}
const thisMonth = (req, res) => {

    try {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const id = req.params.id
        Attendance.findAll({ where: { employ_id: id, date: { [Op.between]: [startOfMonth, endOfMonth] } }, include: [{ model: Employee }] }).then((data) => {
           
            data.map((e)=>{
                // console.log(e)
            })
            res.render('detail', { attendance: data})
        })
    } catch (error) {
        console.log(error)
    }
}
const lastmonth = (req, res) => {
    try {
        const today = new Date();
        const month = today.getMonth() - 1; 
        const year = today.getFullYear();
        if (month < 0) {
          year -= 1;
          month = 11; // December
        }
        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0);
        const id = req.params.id;
        Attendance.findAll({
          where: {
            employ_id: id,
            date: {
              [Op.between]: [startOfMonth, endOfMonth]
            }
          },
          include: [{ model: Employee }]
        }).then((data) => {
          res.render('lastMonthDetail', { attendance: data });
        });
    } catch (error) {
        console.log(error)
    }
}





const myfun  = ()=>{
    const currentMonth = moment().format('YYYY-MM');
    const datesArray = [];
    for (let date = 1; date <= moment(currentMonth).daysInMonth(); date++) {
      datesArray.push(moment(`${currentMonth}-${date}`, 'YYYY-MM-DD'));
    }
    const remainingDays = moment(currentMonth).daysInMonth() - sundaysArray.length;
    console.log(`Remaining days of the month: ${remainingDays}`);   
}

module.exports = { employLogin, lastmonth, myfun,  employAttendance, EmployAttendancePost, leaveApply, leaveget, thisMonth }

