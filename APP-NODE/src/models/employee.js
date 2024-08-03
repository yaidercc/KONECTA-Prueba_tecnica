const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Role = require("./roles");

const Employee = sequelize.define("Employee", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  join_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: "id",
    },
    onDelete: "CASCADE",
    allowNull: false,
  },
});

Employee.associate = (models) => {
  Employee.belongsTo(models.Role, {
      foreignKey: "userID"
  });
}



module.exports = Employee;
