const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    idadresse: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "idannonces",
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "adresse",
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "region",
    },
    ville: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "ville",
    },
    quartier: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: false,
      autoIncrement: false,
      field: "quartier",
    },
  };
  const options = {
    tableName: "adresses",
    comment: "",
    indexes: [],
  };
  const AdressesModel = sequelize.define("adresse_model", attributes, options);

  return AdressesModel;
};
