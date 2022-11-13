module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define("tag", {
        
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        selectedByDefault: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        creationDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });

    return Tag;
};