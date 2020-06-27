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
    adr: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "adr",
    },
  };
  const options = {
    tableName: "adresses",
    comment: "",
    indexes: [],
  };
  const AdressesModel = sequelize.define("adresses_model", attributes, options);

  return AdressesModel;
};
