const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = db.admin;
const Employee = db.employes
const Salary = db.salaries
const Attendance = db.attendance
const { Op } = require('sequelize');

const register = async (req, res) => {
    try {
        let user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            return res.status(501).json({ message: "user exists" });
        }
        const password = req.body.password;
        async function hashPassword() {
            const hash = await bcrypt.hash(password, 10);
            return hash;
        }
        var hashePassword = hashPassword().then(function (hashedPassword) {
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            });
            res.status(200).redirect("signin");
        });
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ where: { email } }).then((user) => {
            let users = user.dataValues;
            console.log(users)
            return users;
        });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const hash = user.password;
        bcrypt.compare(password, hash, function (err, result) {
            if (err) {
                console.error(err);
            }
            if (result === false) {
                console.log("Password is incorrect!");
            }
            const token = jwt.sign({ id: user.id }, "secretkey");
            res
                .cookie("accessToken", token, {
                    maxAge: 9990900000,
                    httpOnly: true,
                })
                .status(200)
                .redirect("home");
        });
    } catch (error) {
        console.log(error);
    }
};

const logout = (req, res) => {
    res
        .clearCookie("accessToken", {
            secure: true,
            sameSite: "none",
        })
        .status(200)
        .redirect("signin");
};

const deshboard = async (req, res) => {
    try {
        var temp = []
        var temp2 = []
        const data = await Attendance.findAll({ group: ['employ_id'], include: [{ model: Employee }] })
        await data.forEach(async (datas) => {
            const today = new Date();
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            const id = datas.employ_id;
            const attendance = await Attendance.findAll({
                where: {
                    employ_id: id,
                    date: { [Op.between]: [startOfMonth, endOfMonth] }
                },
                include: [{ model: Employee }]
            }).then((e) => {
                return e.length
            })
            const attt = attendance / 31 * 100

            temp.push(attt)
        })
        await data.forEach(async (datas) => {
            const today = new Date();
        const month = today.getMonth() - 1; 
        const year = today.getFullYear();
        if (month < 0) {
          year -= 1;
          month = 11; // December
        }
        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0);
            const id = datas.employ_id;
            const dance = await Attendance.findAll({
                where: {
                    employ_id: id,
                    date: { [Op.between]: [startOfMonth, endOfMonth] }
                },
                include: [{ model: Employee }]
            }).then((e) => {
                return e.length
            })
            const at = dance / 31 * 100
            temp2.push(at)
        })

        let salary = await Salary.findAll({});

        setTimeout(()=>{
            console.log(temp, "present")
            res.render('home', { attendance: data,present:temp, temp : temp2 })
        },500)

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }

}







module.exports = { register, login, logout, deshboard };