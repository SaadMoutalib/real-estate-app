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
    titre: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "titre",
    },
    prix: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      field: "prix",
    },
    surface: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "surface",
    },
    nbrChambres: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      field: "nbrChambres",
    },
    nbrSallesDeBain: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      field: "nbrSallesDeBain",
    },
    nbrPieces: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      field: "nbrPieces",
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
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: false,
      autoIncrement: false,
      field: "description",
    },
    favoris: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "favoris",
    },
    date_creation: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      field: "date_creation",
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "En cours",
      field: "status",
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
