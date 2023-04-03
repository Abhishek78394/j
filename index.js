const path = require('path')
const cors = require('cors');
const moment = require('moment')
const cron = require('node-cron');
const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const { Op } = require('sequelize');
const nodemailer = require("nodemailer");


const db = require('./models/index')
const Employee = db.employes
const Attendance = db.attendance
const Leave = db.leave
const salaries = db.salaries



const app = express();
const authRoute = require('./routes/auth')
const authEmployRoute = require('./routes/user')
const employeeRoute = require('./routes/employee')
const salarieeRoute = require('./routes/salarie');
const { myfun } = require('./controller/user');

const corsOptions = { origin: 'http://localhost:8081' };
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
const PORT = 8080;


app.use("/auth", authRoute)
app.use("/", authEmployRoute)
app.use("/", employeeRoute)
app.use("/", salarieeRoute)

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))



const myFunction = async () => {
  try {
    const datesArray = [];
    const currentMonth = moment().format('YYYY-MM');
    for (let date = 1; date <= moment(currentMonth).daysInMonth(); date++) {
      datesArray.push(moment(`${currentMonth}-${date}`, 'YYYY-MM-DD'));
    }
    const sundaysArray = datesArray.filter(date => date.day() == 0);
    const Working_Days = moment(currentMonth).daysInMonth() - sundaysArray.length;
    setTimeout(async () => {
      const data = await Attendance.findAll({ group: ['employ_id'], include: [{ model: Employee }] })
      data.map(async (e) => {
        const today = new Date();
        const month = today.getMonth() - 1;
        const year = today.getFullYear();
        if (month < 0) {
          year -= 1;
          month = 11; // December
        }
        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0);
        const id = e.employ_id;
        var email  =e.employee.email 
        const attendance = await Attendance.findAll({
          where: {
            employ_id: id,
            date: { [Op.between]: [startOfMonth, endOfMonth] }
          },
          include: [{ model: Employee }]
        })
        const base_salary = attendance.map((atten) => {
          const salary = atten.employee.base_salary
          return salary
        }) 
        const time = attendance.map((atten) => {
          const salary = atten.total_working_hours
          return salary
        }) 
        // console.log(time)
        let total_Time = 0;
        for (let i = 0; i < time.length; i++) {
          total_Time += time[i];
        }
             const total_working_time   = Working_Days*8   
           
        const salary = [...new Map(base_salary.map((m) => [m.id, m])).values()];
   const working = attendance.length;
  //  console.log(working*8 , total_Time)
   if(total_Time > (working*8)){
      var over  =  total_Time- (working * 8)
   }else{
    var over = 0
   }
      const per_days_salary = salary / Working_Days 
 const leave  = Working_Days- working
      const total_salary = (per_days_salary* (Working_Days- leave+ over/8))
     const employee_id = id;
     const date  = today
     const total_working_days=Working_Days;
     const total_leave_taken =  leave;
     const overtime = over
  const total_salary_made = total_salary;
const Is_salary_calculated  = 1
   salaries.findAll({}).then( async(e)=>{
    const task = await salaries.create({ employee_id, date,total_working_days ,total_leave_taken,   overtime , total_salary_made, Is_salary_calculated});
   })  
  let testAccount = await nodemailer.createTestAccount();

   const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "abhi78394@gmail.com",
        pass: "zfszvxoihsmhzayz",
    },
});

let mailOptions = {
  from: '"aj 👻" <abhi78394@gmail.com>',
  to: email,
  subject: 'Salary processed successfully  ✔',
  text: "Salary processed successfully?", // plain text body
  html: "<b>Salary processed successfully?</b>",
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
      console.log(error);
  } else {
      console.log('Email sent: ' + info.response);
  }
});

      })
    }, 1000);
  } catch (error) {
    console.log(error)
  }
}
const job = cron.schedule('*/15 * * * * *', () => {
  // myFunction()
});
job.start();

