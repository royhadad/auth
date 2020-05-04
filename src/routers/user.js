const express = require('express')
const {
    addUser,
    findUserByCredentials,
    findUserById,
    findUserByIdAndToken,
    generateAuthToken,
    removeAuthToken
} = require('../models/user');
const { isValidEmail, isValidPassword } = require('../utils/validators');
const auth = require('../middleware/auth');
const router = new express.Router()

router.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!(isValidEmail(email) && isValidPassword(password))) {
            return res.status(400).send();
        }
        const token = await findUserByCredentials(email, password);
        if (!token) {
            throw new Error();
        }
        res.status(200).send({ token });
    } catch (e) {
        res.status(401).send();
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        await removeAuthToken(req.user.id);
        res.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
})

router.get('/me', auth, async (req, res) => {
    try {
        const user = await findUserById(req.user.id);
        res.status(200).send(user);
    } catch (e) {
        res.status(404).send();
    }
})

router.post('/signup', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!(isValidEmail(email) && isValidPassword(password))) {
            return res.status(400).send();
        }
        const token = await addUser(email, password);
        res.status(201).send({ token });
    } catch (e) {
        console.log(e);

        res.status(409).send();
    }
})

module.exports = router;