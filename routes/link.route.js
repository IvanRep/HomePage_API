const express = require('express');
const router = express.Router();

const LinkController = require("../controllers/link.controller");

//Return all user's Links
router.get('/', async (req, res) => {

    const name = req.body.name;
    const password = req.body.password;

    const links = await LinkController.findAll({
        name: name,
        password: password,
    });

    if (links) {
        res.status(200).json(links);
    } else {
        res.status(404).json({ message: "Links not found"})
    }
});

//Find a Link for a given Link id
router.get('/:id', async (req, res) => {

    const id = req.params.id
    
    const name = req.body.name;
    const password = req.body.password;

    const link = await LinkController.findById({
        name: name,
        password: password,
    }, id);

    if (link) {
        res.status(200).json(link);
    } else {
        res.status(404).json({ message: "Link not found"})
    }
});

//Create and save new Link
router.post('/', async (req, res) => {

    const reqLink = {
        name: req.body.link.name,
        url: req.body.link.url,
        imageUrl: req.body.link.imageUrl,
        creationDate: req.body.link.creationDate,
    }

    const reqUser = {
        name: req.body.user.name,
        password: req.body.user.password,
    }

    const tagsNames = [];
    for (let tag of req.body.link.tags) {
        tagsNames.push(tag.name);
    }

    const link = await LinkController.create(reqLink, reqUser);
    await LinkController.setSomeTagsByName(reqUser, reqLink.name, tagsNames);

    if (link) {
        res.status(200).json(link);
    } else {
        res.status(500).json({ message: "Internal Server Error"})
    }

});



//Update a Link
router.put('/', async (req, res) => {

    const reqLink = {
        name: req.body.link.name,
        url: req.body.link.url,
        imageUrl: req.body.link.imageUrl,
        creationDate: req.body.link.creationDate,
    }

    const reqUser = {
        name: req.body.user.name,
        password: req.body.user.password,
    }

    const tagsNames = [];
    for (let tag of req.body.link.tags) {
        tagsNames.push(tag.name);
    }

    const link = await LinkController.create(reqLink, reqUser);
    await LinkController.setSomeTagsByName(reqUser, reqLink.name, tagsNames);

    if (link) {
        res.status(200).json(link);
    } else {
        res.status(500).json({ message: "Internal Server Error"});
    }

});

//Delete a link
router.delete('/', async (req, res) => {
    const reqLink = {
        id: req.body.link.id,
        name: req.body.link.name,
        url: req.body.link.url,
        imageUrl: req.body.link.imageUrl,
    }

    const reqUser = {
        name: req.body.user.name,
        password: req.body.user.password,
    }

    const link = await LinkController.destroy(reqUser,reqLink);

    if (link) {
        res.status(200).json(link);
    } else {
        res.status(500).json({message: "Internal Server Error"});
    }
});
