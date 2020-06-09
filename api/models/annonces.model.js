const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    idannonces: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "idannonces",
    },
    titre: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "titre",
    },
    prix: {
      type: DataTypes.STRING(45),
      allowNull: true,
      primaryKey: false,
      autoIncrement: false,
      field: "prix",
    },
    tel: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "tel",
    },
    type: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "type",
    },
    etat: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "etat",
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: true,
      primaryKey: false,
      autoIncrement: false,
      field: "description",
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
    tableName: "annonces",
    comment: "",
    indexes: [],
  };
  const AnnoncesModel = sequelize.define("annonces_model", attributes, options);

  return AnnoncesModel;
};
