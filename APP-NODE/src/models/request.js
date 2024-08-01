const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Employee = require("./employee");

const Requests = sequelize.define("Request", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  summary: {
    type: DataTypes.INTEGER,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Employee,
      key: "id",
    },
    allowNull: false,
  },
});

Requests.belongsTo(Employee, { foreignKey: "employee_id" });

module.exports = Requests;
