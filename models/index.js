const config = require('../config/db.config.js');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.link = require("./Link.model.js")(sequelize, Sequelize);
db.tag = require("./Tag.model.js")(sequelize, Sequelize);
db.user = require("./User.model.js")(sequelize, Sequelize);

db.tag.belongsToMany(db.link, {
    through: "link_tag",
    as: "links",
    foreignKey: "tag_id",
});
db.link.belongsToMany(db.tag, {
    through: "link_tag",
    as: "tags",
    foreignKey: "link_id",
});

db.user.hasMany(db.link);
db.link.belongsTo(db.user);

db.user.hasMany(db.tag);
db.tag.belongsTo(db.user);

module.exports = db;
