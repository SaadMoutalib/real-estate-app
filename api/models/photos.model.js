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
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "url",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "name",
    },
  };
  const options = {
    tableName: "photos",
    comment: "",
    indexes: [],
  };

  const PhotosModel = sequelize.define("photos_model", attributes, options);

  return PhotosModel;
};
