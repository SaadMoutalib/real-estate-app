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
    nomRegion: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "nomRegion",
    },
  };
  const options = {
    tableName: "regions",
    comment: "",
    indexes: [],
  };
  const RegionsModel = sequelize.define("region_model", attributes, options);

  return RegionsModel;
};
