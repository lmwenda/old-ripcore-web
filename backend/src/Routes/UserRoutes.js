import express from "express";
import jwt from "json-web-token";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

// Exported Components
import User from'../Models/User.js'
import Code from "../Models/Code.js";
import Transporter from "../Auth/Transporter.js";
import ValidateUser from '../Auth/ValidateUser.js';

// Initializations
dotenv.config();
const router = express.Router();

// REGISTER ROUTE
router.post('/register', async (req, res) => {

    // VALIDATING OUR USER
    const { error } = ValidateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // CHECKING IF OUR USER EXISTS
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send('Email Already Exists.');

    // HASH PASSWORDS
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // CREATING OUR NEW USER
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword
    });

   const savedUser = await user.save();
   res.json(savedUser);

});

// LOGIN ROUTE
router.post('/login', async(req, res) => {

    // CHECKING IF OUR USER'S EMAIL IS VALID
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid Email or Password.');

    // CHECKING IF OUR PASSWORD IS VALID
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid Email or Password.");

    // CREATING AND ASSIGNING A JWT TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
    res.header('auth-token', token).send(token);

    res.send("Welcome back " + user.username + " to our Services!")
});

router.post('/verify-account', async(req, res) => {
    
    const token = res.header('verification-token', pass)

    try{
        const savedUser = await user.save();
        res.send(JSON.stringify(savedUser));
    } catch(err){
        res.status(400).send(err);
    }
})

export default router;