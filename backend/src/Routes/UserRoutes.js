import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

// Exported Components
import User from "../Models/User.js";
import ValidateUser from "../Auth/ValidateUser.js";

// Initializations
dotenv.config();
const router = express.Router();

// Logging in with Patreon

// REGISTER ROUTE
router.post("/register", async (req, res) => {
  // VALIDATING OUR USER
  const { error } = ValidateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // CHECKING IF OUR USER EXISTS
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email Already Exists.");

  // HASH PASSWORDS
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // CREATING OUR NEW USER
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
    membership: req.body.membership,
  });

  // Saving the User

  const savedUser = await user.save();
  console.log({ user: savedUser });
  res.json(savedUser);

  // Redirecting the User
  res.redirect("/login");
});

// Verifing the User

function VerificationToken (req, res, next){

  const token = req.headers['verification-token'];
  if(!token) return res.status(400).send("Invalid Access Token.");

  try{
      const verified = jwt.verify(token, process.env.SECRET_TOKEN)
      .catch(err => {
        if(err) return res.json({ auth: false, msg:
           'You Failed the Authentication Process' });
      });

      req.user = verified;
      req.userID = decoded.id;
      next();
  } 

  catch(err){
      res.status(400).send("Invalid Token:", err);
  }
}

router.get("/verify-account", VerificationToken, (req, res) => {
  console.log("Sucessfully Verified Account");
  res.json({ title: 'Completed Authentication Process', 
  message: 'Sucessfully Verified Account' });
  res.redirect("http://localhost:3000/login");
  // try {
  //   const token = req.header("auth-token");
  //   const decode = jwt.decode(token);
  //   return res.status(200).send(decode);
  // } catch (err) {
  //   res.status(400).send(err);
  // }
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    // CHECKING IF OUR USER'S EMAIL IS VALID
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid Email or Password.");

    // CHECKING IF OUR PASSWORD IS VALID
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword){
      console.log("Invalid Email or Password");
      return res.status(400).send("Invalid Email or Password.");
    }

    // CREATING AND ASSIGNING A JWT TOKEN
    const token = jwt.sign(
      { _id: user._id  }, 
      process.env.SECRET_TOKEN,
      { expiresIn: '7 days' },
      (err, token) => {
        res.json({ token: token });
      }    
      );

    res.header("verification-token", token);

    res.status(200).send("Welcome back, " + user.username);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Deleting the User
router.delete("/delete/user/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (!err) {
      res.json({ title: 'Deleted User', user: user });
    } else {
      res.json(err);
    }
  });
  res.send("Deleted User");
});

// Getting a Specific User

router.get("/user/:id", (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (!err) {
      res.json(user);
    } else {
      res.json(err);
    }
  });
});

// Updating User Account Details
router.put("/me/:id", (req, res) => {
  const user = User.findById(req.params.id);
  User.updateOne(user, req.body)
    .then(console.log("Updated Account."))
    .then(res.send("Updated Account."));
});

export default router;
