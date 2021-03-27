import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

// Exported Components
import User from "../Models/User.js";
import ValidateUser from "../Auth/ValidateUser.js";
import ValidateUpdatedUser from "../Auth/ValidateUpdatedUser.js";

// Initializations
dotenv.config();
const router = express.Router();

// Logging in with Discord

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
    password: hashedPassword,
    username: req.body.username,
    membership: req.body.membership,
    isAdmin: false,
  });

  // Saving the User

  const savedUser = await user.save();
  res.json(savedUser);
});

// Verifing the User

router.post("/verify", (req, res) => {
  try {
    const token = req.header("verification-token");
    const decode = jwt.verify(token, process.env.SECRET_TOKEN);
    return res.status(200).send(decode);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/setadmin/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    await User.updateOne(user, {
      isAdmin: req.body.isAdmin,
    })
      .then(res.status(200).send({ status: "Success", user: user.name }));
  } catch (err) {
    res.status(400).send(err);
  }
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
    if (!validPassword) {
      console.log("Invalid Email or Password");
      return res.status(400).send("Invalid Email or Password.");
    }

    // CREATING AND ASSIGNING A JWT TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: "7 days",
    });

    res.header("user-id", user._id);
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
      res.json({ title: "Deleted User", user: user });
    } else {
      res.json(err);
    }
  });
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
router.put("/me/:id", async (req, res) => {
  const user = User.findById(req.params.id);

  // VALIDATING OUR USER

  const { error } = ValidateUpdatedUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // CHECKING IF OUR USER EXISTS

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email Already Exists.");

  // HASHING PASSWORD 

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

 // UPDATING THE USER

  User.updateOne(user, {
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
  })
    .then(console.log("Updated Account."))
    .then(res.status(200).send("Updated Account."))
    .catch(err => res.status(400).send(err));

});

router.post("/seed", async (req, res) => {
  const pw = req.header("admin");
  if (pw === "ripcoreadmin") {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("ripcoreadmin", salt);
    const admin = new User({
      email: "admin@ripcore.com",
      password: hashedPassword,
      username: "admin",
      membership: "free",
      isAdmin: true,
    });
    await admin.save();
    res.status(200).send("Seeder created");
  } else {
    res.status(401).send("Unauthorized Access");
  }
});

export default router;
