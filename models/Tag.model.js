module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define("tag", {
        
        name: {
            type: DataTypes.STRING
        },
        selectedByDefault: {
            type: DataTypes.BOOLEAN
        },
        creationDate: {
            type: DataTypes.DATE
        }
    });

    return Tag;
};