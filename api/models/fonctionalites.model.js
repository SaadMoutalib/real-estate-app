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
    jardin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "jardin",
    },
    piscine: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "piscine",
    },
    terasse: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "terasse",
    },
    garage: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "garage",
    },
    ascenseur: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "ascenseur",
    },
    concierge: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "concierge",
    },
  };
  const options = {
    tableName: "fonctionalites",
    comment: "",
    indexes: [],
  };

  const FonctionaliteModel = sequelize.define(
    "fonctionalite_model",
    attributes,
    options
  );

  return FonctionaliteModel;
};
