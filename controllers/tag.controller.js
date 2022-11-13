const db = require("../models");
const Link = db.link;
const Tag = db.tag;
const User = db.user;

//Create and save new Tag
exports.create = (tag, user) => {
    return User.findOne({
        where: {
            name: user.name,
            password: user.password
        }
    })
    .then((user) => {
        return Tag.create({
            name: tag.name,
            selectedByDefault: tag.selectedByDefault,
            creationDate: tag.creationDate,
            userId: user.id,
        })
        .then((tag) => {
            console.log(">> Created Tag: " + JSON.stringify(tag, null, 2));
            return tag;
        })
        .catch((err) => {
            console.error(">> Error while creating Tag: ", err);
        });
    })
    .catch((err) => {
        console.error(">> Error while finding User: ", err);
    })
    
};

//Return all user's Tags
exports.findAll = (user) => {
    return User.findOne({
        where: {
            name: user.name,
            password: user.password,
        }
    })
    .then((user) => {
        return Tag.findAll({
            where: {
                userId: user.id
            },
            order: ['name', 'DESC']
        })
        .then((tags) => {
            return tags;
        })
        .catch((err) => {
            console.error(">> Error while retrieving Tags: ", err);
        });
    })
    .catch((err) => {
        console.error(">> Error while finding User: ", err);
    })
};

//Find a Tag for a given Tag id
exports.findById = (user, id) => {
    return Tag.findByPk(id, {
        include: [
            {
                model: Link,
                as: "links",
                attributes: ["id","name","url","imageUrl","creationDate"],
                through: {
                    attributes: [],
                }
            },
        ],
        where: {
            userId: user.id
        },
    })
    .then((tag) => {
        if (!tag) {
            console.error(">> Error, Tag not found");
            return null;
        }
        return tag;
    })
    .catch((err) => {
        console.error(">> Error while finding Tag: ", err);
    });
};

//Find a Tag for a given Tag name
exports.findByName = (user, name) => {
    return Tag.findOne({
        include: [
            {
                model: Link,
                as: "links",
                attributes: ["id","name","url","imageUrl","creationDate"],
                through: {
                    attributes: [],
                }
            },
        ],
        where: {
            name: name,
            userId: user.id
        },
    })
    .then((tag) => {
        if (!tag) {
            console.error(">> Error, Tag not found");
            return null;
        }
        return tag;
    })
    .catch((err) => {
        console.error(">> Error while finding Tag: ", err);
    });
};

//Add a Link to a Tag by id
exports.addLinkById = (user, tagId, linkId) => {
    return Tag.findByPk(tagId, {
        where: {
            userId: user.id
        },
    })
    .then((tag) => {
        if (!tag) {
            console.error(">> Error, Tag not found");
            return null;
        }
        return Link.findByPk(linkId, {
            where: {
                userId: user.id
            },
        })
        .then((link) => {
            if (!link) {
                console.error(">> Error, Link not found");
                return null;
            }
            tag.addLink(link);
            console.log(`>> Added Link id=${link.id} to Tag id=${tag.id}`);
            return tag;
        })
        .catch((err) => {
            console.error(">> Error while adding Link to Tag: ", err);
        });
    })
    .catch((err) => {
        console.error(">> Error while adding Link to Tag: ", err);
    });
};

//Add a Link to a Tag by name
exports.addLinkByName = (user, tagName, linkName) => {
    return Tag.findOne({
        where: {
            name: tagName,
            userId: user.id
        },
    })
    .then((tag) => {
        if (!tag) {
            console.error(">> Error, Tag not found");
            return null;
        }
        return Link.findOne({
            where: {
                name: linkName,
                userId: user.id
            },
        })
        .then((link) => {
            if (!link) {
                console.error(">> Error, Link not found");
                return null;
            }
            tag.addLink(link);
            console.log(`>> Added Link name=${link.name} to Tag name=${tag.name}`);
            return tag;
        })
        .catch((err) => {
            console.error(">> Error while adding Link to Tag: ", err);
        });
    })
    .catch((err) => {
        console.error(">> Error while adding Link to Tag: ", err);
    });
};


//Update and Save a Tag
exports.update = (user, tag) => {
    return User.findOne({
        where: {
            name: user.name,
            password: password.name,
        }
    })
    .then((user) => {
        return Tag.findOne({
            where: {
                userId: user.id,
                id: tag.id,
            }
        })
        .then((oldTag) =>  {
            if (!oldTag) {
                console.error(">> Error, Tag not found");
                return null;
            }
            oldTag.name = tag.name;
            oldTag.url = tag.url;
            oldTag.imageUrl = tag.imageUrl;
            oldTag.creationDate = tag.creationDate;

            oldTag.save()
            .then((newTag) => {
                return newTag;
            })
            .catch((err) => {
                console.error(">> Error while saving Tag: ", err);
            })
        })
        .catch((err) => {
            console.error(">> Error, Tag not found: ", err);
        })
    })
    .catch((err) => {
        console.error(">> Error, User not found: ", err);
    })
}

//Delete a Tag
exports.destroy = (user, tag) => {
    return User.findOne({
        where: {
            name: user.name,
            password: user.password,
        }
    })
    .then((user) => {
        return Tag.findOne({
            where: {
                name: tag.name,
                url: tag.url,
                userId: user.id
            }
        })
        .then((oldTag) => {
            if (!oldTag) {
                console.error(">> Error, Tag not found: ");
                return null
            }
            return oldTag.destroy()
            .then(() => {
                return oldTag; 
            })
            .catch((err) => {
                console.error(">> Error while deleting Tag: ", err);
            })
        })
        .catch((err) => {
            console.error(">> Error while finding Tag: ", err);
        })
    })
    .catch((err) => {
        console.error(">> Error while finding User: ", err);
    })
}