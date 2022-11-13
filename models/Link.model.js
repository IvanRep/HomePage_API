module.exports = (sequelize, DataTypes) => {
    const Link = sequelize.define("link", {
        
        name: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING
        },
        imageUrl: {
            type: DataTypes.STRING
        },
        creationDate: {
            type: DataTypes.DATE
        }
    });

    return Link;
};