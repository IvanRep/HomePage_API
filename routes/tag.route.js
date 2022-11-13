const express = require('express');
const router = express.Router();

const TagController = require("../controllers/tag.controller");

//Return all user's Tags
router.get('/', async (req, res) => {

    const name = req.body.name;
    const password = req.body.password;

    const tags = await TagController.findAll({
        name: name,
        password: password,
    });

    if (tags) {
        res.status(200).json(tags);
    } else {
        res.status(404).json({ message: "Tags not found"})
    }
});

//Find a Tag for a given Tag id
router.get('/:id', async (req, res) => {

    const id = req.params.id
    
    const name = req.body.name;
    const password = req.body.password;

    const tag = await TagController.findById({
        name: name,
        password: password,
    }, id);

    if (tag) {
        res.status(200).json(tag);
    } else {
        res.status(404).json({ message: "Tag not found"})
    }
});

//Create and save new Tag
router.post('/', async (req, res) => {

    const reqTag = {
        name: req.body.tag.name,
        selectedByDefault: req.body.tag.selectedByDefault,
        creationDate: req.body.tag.creationDate,
    }

    const reqUser = {
        name: req.body.user.name,
        password: req.body.user.password,
    }

    const tag = await TagController.create(reqTag, reqUser);

    if (tag) {
        res.status(200).json(tag);
    } else {
        res.status(500).json({ message: "Internal Server Error"})
    }

});



//Update a Tag
router.put('/', async (req, res) => {

    const reqTag = {
        name: req.body.tag.name,
        selectedByDefault: req.body.tag.selectedByDefault,
        creationDate: req.body.tag.creationDate,
    }

    const reqUser = {
        name: req.body.user.name,
        password: req.body.user.password,
    }

    const tag = await TagController.update(reqTag, reqUser);

    if (tag) {
        res.status(200).json(tag);
    } else {
        res.status(500).json({ message: "Internal Server Error"})
    }

});


//Delete a tag
router.delete('/', async (req, res) => {
    const reqTag = {
        id: req.body.tag.id,
        name: req.body.tag.name,
        selectedByDefault: req.body.tag.selectedByDefault,
        creationDate: req.body.tag.creationDate,
    }

    const reqUser = {
        name: req.body.user.name,
        password: req.body.user.password,
    }

    const tag = await TagController.destroy(reqUser, reqTag);

    if (tag) {
        res.status(200).json(tag);
    } else {
        res.status(500).json({message: "Internal Server Error"});
    }
});
