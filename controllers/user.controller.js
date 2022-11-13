const db = require("../models");
const Link = db.link;
const Tag = db.tag;
const User = db.user;

//Create and save new Tag
exports.create = (user) => {
    return User.findOne({
        where: {
            name: user.name,
        }
    })
    .then((oldUser) => {
        if (oldUser) {
            console.error(">> User already exists");
            return null;
        }
        return User.create({
            name: tag.name,
            password: user.password,
        })
        .then((user) => {
            console.log(">> Created User: " + JSON.stringify(user, null, 2));
            return user;
        })
        .catch((err) => {
            console.error(">> Error while creating User: ", err);
        });
    })
    .catch((err) => {
        console.error(">> Error while finding User: ", err);
    })
    
};

//Find a User for a given User name
exports.findByName = (user) => {
    return User.findOne({
        where: {
            name: user.name,
            password: user.password
        },
    })
    .then((user) => {
        if (!user) {
            console.error(">> Error, User not found");
            return null;
        }
        return user;
    })
    .catch((err) => {
        console.error(">> Error while finding User: ", err);
    });
};

//Update and Save a User
exports.update = (oldUser,changedUser) => {
    return User.findOne({
        where: {
            name: oldUser.name,
            password: oldUser.password,
        }
    })
    .then((user) => {
        if (!user) {
            console.error(">> Error, User not found");
            return null;
        }
        
        user.password = changedUser.password;

        user.save()
        .then((newUser) => {
            return newUser;
        })
        .catch((err) => {
            console.error(">> Error while saving User: ", err);
        })
    })
    .catch((err) => {
        console.error(">> Error, User not found: ", err);
    })
}

//Delete a User
exports.destroy = (user) => {
    return User.findOne({
        where: {
            name: user.name,
            password: user.password,
        }
    })
    .then((oldUser) => {
        if (!oldUser) {
            console.error(">> Error, User not found: ");
            return null
        }
        return oldUser.destroy()
        .then(() => {
            return oldUser; 
        })
        .catch((err) => {
            console.error(">> Error while deleting User: ", err);
        })
    })
    .catch((err) => {
        console.error(">> Error while finding User: ", err);
    });
};