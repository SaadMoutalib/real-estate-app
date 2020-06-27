const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
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
    tableName: "favoris",
    comment: "",
    indexes: [],
  };
  const FavorisModel = sequelize.define("favoris_model", attributes, options);

  return FavorisModel;
};
