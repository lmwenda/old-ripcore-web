import User from "../Models/User.js";
import jwt from "jsonwebtoken";

export default function checkAdmin(req, res, next) {
  try {
    const token = req.header("verification-token");
    const user = User.findById(jwt.decode(token).id);
    if (user.isAdmin) {
      next();
    } else {
      res.status(400).send("No Admin Privilege");
    }
  } catch (err) {}
}
