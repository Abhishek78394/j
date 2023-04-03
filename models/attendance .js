module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define("Attendance", {
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATE,
        primaryKey: true,
        allowNull:false,
      },
      employ_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_working_hours : {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
    return Attendance;
  };
  