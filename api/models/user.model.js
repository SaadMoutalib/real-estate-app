const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idusers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "idusers"
    },
    firstname: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "firstname"
    },
    lastname: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "lastname"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "email"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "password"
    },
    type: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "role"
    }
  };
  const options = {
    tableName: "users",
    comment: "",
    indexes: []
  };

  const UsersModel = sequelize.define("users_model", attributes, options);
  
  return UsersModel;
};