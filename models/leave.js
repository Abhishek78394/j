module.exports = (sequelize, DataTypes) => {
    const Leave = sequelize.define("Leave", {
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employ_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date : {
        type: DataTypes.DATE,
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
       
      }
    });
    return Leave;
  };
  