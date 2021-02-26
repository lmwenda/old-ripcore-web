import express from "express";

// Components
import User from "../Models/User.js";

// Initializations

const router = express.Router();

router.get('/register', async(req, res) => {
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    const newUser = await user.save();
    res.send(newUser);
})

export default router;