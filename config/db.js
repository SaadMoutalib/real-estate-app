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

db.fonctionalites = require("../api/models/fonctionalites.model")(sequelize);
db.adresses = require("../api/models/adresses.model")(sequelize);
db.photos = require("../api/models/photos.model")(sequelize);
db.villes = require("../api/models/villes.model")(sequelize);
db.regions = require("../api/models/regions.model")(sequelize);
db.annonces = require("../api/models/annonces.model")(sequelize);
db.users = require("../api/models/users.model")(sequelize);
db.favoris = require("../api/models/favoris.model")(sequelize);

db.users.belongsToMany(db.annonces, { through: db.favoris });
db.annonces.belongsToMany(db.users, { through: db.favoris });
db.users.hasMany(db.favoris);
db.favoris.belongsTo(db.users);
db.annonces.hasMany(db.favoris);
db.favoris.belongsTo(db.annonces);

db.regions.hasMany(db.villes, {
  as: "villes",
  foreignKey: "idregion",
});

db.villes.belongsTo(db.regions, {
  as: "region",
  foreignKey: "idregion",
});

db.villes.hasMany(db.adresses, {
  as: "adresses",
  foreignKey: "idville",
});

db.adresses.belongsTo(db.villes, {
  as: "ville",
  foreignKey: "idville",
});

db.annonces.hasMany(db.photos, {
  as: "photos",
  foreignKey: {
    name: "annonceid",
  },
});

db.photos.belongsTo(db.annonces, {
  as: "photos",
  foreignKey: {
    name: "annonceid",
  },
});

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

db.annonces.belongsTo(db.fonctionalites, {
  as: "fonctionalite",
  foreignKey: {
    name: "idfonctionalite",
  },
});

db.fonctionalites.hasOne(db.annonces, {
  as: "annonce",
  foreignKey: {
    name: "idfonctionalite",
  },
});

module.exports = db;
global.db = db;
