module.exports = (sequelize, DataTypes) => {
    const Salaries = sequelize.define("Salaries", {
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
      },
      date : {
        type: DataTypes.DATE,
        allowNull: false,
      },
      total_working_days : {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_leave_taken : {
        type: DataTypes.INTEGER,
      },
      overtime : {
        type: DataTypes.INTEGER,
      },
      total_salary_made  : {
        type: DataTypes.INTEGER,
        default:0
      },
      Is_salary_calculated :{
        type: DataTypes.INTEGER,
        default:0
      }
    });
    return Salaries;
  };
  