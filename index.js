const path = require('path')
const cors = require('cors');
const moment =  require('moment')
const cron = require('node-cron');
const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');


const db = require('./models/index')
const Employee = db.employes
const Attendance = db.attendance
const Leave = db.leave
const Salaries = db.salaries



const app = express();
const authRoute = require('./routes/auth')
const authEmployRoute = require('./routes/user')
const employeeRoute = require('./routes/employee')
const salarieeRoute = require('./routes/salarie');
const { myfun } = require('./controller/user');

const corsOptions = {origin: 'http://localhost:8081'};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
const PORT = 8080;


app.use("/auth", authRoute)
app.use("/", authEmployRoute)
app.use("/", employeeRoute)
app.use("/", salarieeRoute)

app.listen(PORT, () =>console.log(`Server is running on ${PORT}`))



const myFunction = async()=> {
    try {  
        const datesArray = [];
    const currentMonth = moment().format('YYYY-MM');
    for (let date = 1; date <= moment(currentMonth).daysInMonth(); date++) {
      datesArray.push(moment(`${currentMonth}-${date}`, 'YYYY-MM-DD'));
    }
    const sundaysArray = datesArray.filter(date => date.day() == 0);
    const Working_Days = moment(currentMonth).daysInMonth() - sundaysArray.length;
    // console.log(`Remaining days of the month: ${Working_Days}`);

   setTimeout( async() => {
    const data = await Attendance.findAll({ group: ['employ_id'], include: [{ model: Employee }] })
    console.log(data)
   }, 1100000);

   
    

} catch (error) {
    console.log(error)
}



  }
const job = cron.schedule('* * * * * *', () => {
    myFunction()
});
job.start();

