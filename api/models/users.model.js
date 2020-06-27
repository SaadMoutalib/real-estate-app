const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      field: "_id",
    },
    firstname: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "firstname",
    },
    lastname: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "lastname",
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "email",
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "password",
    },
    role: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "role",
    },
    date_creation: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      field: "date_creation",
    },
  };
  const options = {
    tableName: "users",
    comment: "",
    indexes: [],
  };

  const UsersModel = sequelize.define("users_model", attributes, options);

  return UsersModel;
};
