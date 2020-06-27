const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    _id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      field: "_id",
    },
    nomVille: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "nomVille",
    },
  };
  const options = {
    tableName: "villes",
    comment: "",
    indexes: [],
  };
  const VillesModel = sequelize.define("Ville_model", attributes, options);

  return VillesModel;
};
