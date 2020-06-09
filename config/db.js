const Sequelize = require("sequelize");

const sequelize = new Sequelize("immobilierpfa", "root", "naruto$@1996", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../api/models/user.model")(sequelize);
db.annonces = require("../api/models/annonces.model")(sequelize);
db.adresses = require("../api/models/adresses.model")(sequelize);

db.users.hasMany(db.annonces, {
  as: "annonces",
  foreignKey: {
    name: "userid",
  },
});

db.annonces.belongsTo(db.users, {
  as: "user",
  foreignKey: {
    name: "userid",
  },
});

db.annonces.belongsTo(db.adresses, {
  as: "adresse",
  foreignKey: {
    name: "idadresse",
  },
});

db.adresses.hasOne(db.annonces, {
  as: "annonce",
  foreignKey: {
    name: "idadresse",
  },
});

module.exports = db;
global.db = db;
