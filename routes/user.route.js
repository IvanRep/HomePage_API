const express = require('express');
const router = express.Router();

const UserController = require("../controllers/user.controller");

//Return the user with name and password
router.get('/', async (req, res) => {

    const name = req.body.name;
    const password = req.body.password;

    const user = await UserController.findByName({
        name: name,
        password: password,
    });

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "User not found"})
    }
});

//Create and save new User
router.post('/', async (req, res) => {

    const reqUser = {
        name: req.body.name,
        password: req.body.password,
    }

    const user = await UserController.create(reqUser);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(500).json({ message: "Internal Server Error"})
    }

});

//Update an User
router.put('/', async (req, res) => {

    const oldUser = {
        name: req.body.old.name,
        password: req.body.old.password,
    }

    const changedUser = {
        password: req.body.new.password,
    }

    const user = await UserController.update(oldUser, changedUser);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(500).json({ message: "Internal Server Error"})
    }

});


//Delete a user
router.delete('/', async (req, res) => {

    const reqUser = {
        name: req.body.name,
        password: req.body.password,
    }

    const user = await UserController.destroy(reqUser);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(500).json({message: "Internal Server Error"});
    }
});
