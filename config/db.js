const mysql = require("mysql");
const Sequelize = require("sequelize");

const sequelize = new Sequelize('immobilierpfa','root','naruto$@1996',{
    host : 'localhost',
    dialect : 'mysql',
    define: {
        timestamps: false
    }
})

const db ={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("../api/models/user.model")(sequelize);
db.annonces = require("../api/models/annonces.model")(sequelize);

db.users.hasMany(db.annonces, {
    as: 'annonces',
    foreignKey: {
        name: 'userid'
    }
});

db.annonces.belongsTo(db.users, {
    as : 'user',
    foreignKey: {
        name: 'userid'
    }
});

module.exports = db;
global.db = db;