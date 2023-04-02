module.exports = (sequelize, DataTypes) => {
    const Employees = sequelize.define("employees", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        UNIQUE: true
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
      },
      base_salary:{
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
    return Employees ;
  };
  