const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('student', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});


sequelize.authenticate()
    .then(() => {
        console.log('Connected');
    }).catch((err) => {
        console.log(err);
    });

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require('./admin')(sequelize, DataTypes);
db.employes = require('./employes')(sequelize, DataTypes);
db.salaries = require('./salary')(sequelize, DataTypes);
db.leave = require('./leave')(sequelize, DataTypes);
db.attendance = require('./attendance ')(sequelize, DataTypes);


db.sequelize.sync({ force: false })
    .then(() => {
        console.log('Drop and re-sync db.');
    });

db.employes.hasOne(db.salaries, { foreignKey: "employee_id" })
db.salaries.belongsTo(db.employes, { foreignKey: "employee_id" })
db.salaries.hasMany(db.leave, { foreignKey: "date" })
db.leave.belongsTo(db.salaries, { foreignKey: "date" })
db.employes.hasMany(db.attendance, { foreignKey: "employ_id" })
db.attendance.belongsTo(db.employes, { foreignKey: "employ_id" })


module.exports = db;
