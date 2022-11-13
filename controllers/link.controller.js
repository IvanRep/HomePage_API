const db = require("../models");
const Link = db.link;
const Tag = db.tag;
const User = db.user;

//Create and save new Link
exports.create = (link, user) => {
    return User.findOne({
        where: {
            name: user.name,
            password: user.password,
        }
    })
    .then((user) => {
        return Link.create({
            name: link.name,
            url: link.url,
            imageUrl: link.imageUrl,
            creationDate: link.creationDate,
            userId: user.id,
        })
        .then((link) => {
            console.log(">> Created Link: " + JSON.stringify(link, null, 2));
            return link;
        })
        .catch((err) => {
            console.error(">> Error while creating Link: ", err);
        });
    })
    .catch((err) => {
        console.error(">> Error while finding User: ", err);
    });
    
    
};

//Return all user's Links
exports.findAll = (user) => {
    return User.findOne({
        where: {
            name: user.name,
            password: user.password,
        }
    })
    .then((user) => {
        return Link.findAll({
            include: [
                {
                    model: Tag,
                    as: "tags",
                    attributes: ["id","name","selectedByDefault","creationDate"],
                    through: {
                        attributes: [],
                    }
                },
            ],
            where: {
                userId: user.id
            },
            order: ['name', 'DESC']
        })
        .then((links) => {
            return links;
        })
        .catch((err) => {
            console.error(">> Error while retrieving Links: ", err);
        });
    })
    .catch((err) => {
        console.error(">> Error while finding User: ", err);
    });
};

//Find a Link for a given Link id
exports.findById = (user, id) => {
    return User.findOne({
        where: {
            name: user.name,
            password: user.password,
        }
    })
    .then((user) => {
        return Link.findByPk(id, {
            include: [
                {
                    model: Tag,
                    as: "tags",
                    attributes: ["id","name","selectedByDefault","creationDate"],
                    through: {
                        attributes: [],
                    }
                },
            ],
            where: {
                userId: user.id
            },
        })
        .then((link) => {
            if (!link) {
                console.error(">> Error, Link not found");
                return null;
            }
            return link;
        })
        .catch((err) => {
            console.error(">> Error while finding Link: ", err);
        });
    })
    .catch((err) => {
        console.error(">> Error while finding User: ", err);
    });
};

//Find a Link for a given Link name
exports.findByName = (user, name) => {
    return User.findOne({
        where: {
            name: user.name,
            password: user.password,
        }
    })
    .then((user) => {
        return Link.findOne({
            include: [
                {
                    model: Tag,
                    as: "tags",
                    attributes: ["id","name","selectedByDefault","creationDate"],
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
        .then((link) => {
            if (!link) {
                console.error(">> Error, Link not found");
                return null;
            }
            return link;
        })
        .catch((err) => {
            console.error(">> Error while finding Link: ", err);
        });
    })
    .catch((err) => {
        console.error(">> Error while finding User: ", err);
    });
};

//Add a Tag to a Link
exports.addTagById = (user, linkId, tagId) => {
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
            link.addTag(tag);
            console.log(`>> Added Tag id=${tag.id} to Link id=${link.id}`);
            return link;
        })
        .catch((err) => {
            console.error(">> Error while adding Tag to Link: ", err);
        });
    })
    .catch((err) => {
        console.error(">> Error while adding Tag to Link: ", err);
    });
};

//Add a Tag to a Link by name
exports.addTagByName = (user, linkName, tagName) => {
    return User.findOne({
        where: {
            name: user.name,
            password: user.password,
        }
    })
    .then((user) => {
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
                link.addTag(tag);
                console.log(`>> Added Tag id=${tag.id} to Link id=${link.id}`);
                return link;
            })
            .catch((err) => {
                console.error(">> Error while adding Tag to Link: ", err);
            });
        })
        .catch((err) => {
            console.error(">> Error while adding Tag to Link: ", err);
        });
    })
    
};
//Set some Tag to a Link by name
exports.setSomeTagsByName = (user, linkName, tagsNames) => {
    return User.findOne({
        where: {
            name: user.name,
            password: user.password,
        }
    })
    .then((user) => {
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
            return Tag.findAll({
                where: {
                    name: tagsNames,
                    userId: user.id
                },
            })
            .then((tags) => {
                if (!tags) {
                    console.error(">> Error, Tags not found");
                    return null;
                }
                link.setTags(tags);
                console.log(`>> Added ${tags.length} Tags to Link name=${link.name}`);
                return link;
            })
            .catch((err) => {
                console.error(">> Error while adding Tag to Link: ", err);
            });
        })
        .catch((err) => {
            console.error(">> Error while adding Tag to Link: ", err);
        });
    })
    .catch((err) => {
        console.error(">> Error while finding User: ", err);
    })
};

//Update and Save a Link
exports.update = (user, link) => {
    return User.findOne({
        where: {
            name: user.name,
            password: password.name,
        }
    })
    .then((user) => {
        return Link.findOne({
            where: {
                userId: user.id,
                id: link.id,
            }
        })
        .then((oldLink) =>  {
            if (!oldLink) {
                console.error(">> Error, Link not found");
                return null;
            }
            oldLink.name = link.name;
            oldLink.url = link.url;
            oldLink.imageUrl = link.imageUrl;
            oldLink.creationDate = link.creationDate;

            oldLink.save()
            .then((newLink) => {
                return newLink;
            })
            .catch((err) => {
                console.error(">> Error while saving Link: ", err);
            })
        })
        .catch((err) => {
            console.error(">> Error, Link not found: ", err);
        })
    })
    .catch((err) => {
        console.error(">> Error, User not found: ", err);
    })
}

exports.destroy = (user, link) => {
    return User.findOne({
        where: {
            name: user.name,
            password: user.password,
        }
    })
    .then((user) => {
        return Link.findOne({
            where: {
                name: link.name,
                url: link.url,
                userId: user.id
            }
        })
        .then((oldLink) => {
            if (!oldLink) {
                console.error(">> Error, Link not found: ");
                return null
            }
            return oldLink.destroy()
            .then(() => {
                return oldLink; 
            })
            .catch((err) => {
                console.error(">> Error while deleting Link: ", err);
            })
        })
        .catch((err) => {
            console.error(">> Error while finding Link: ", err);
        })
    })
    .catch((err) => {
        console.error(">> Error while finding User: ", err);
    })
}
