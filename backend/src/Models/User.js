import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  // User Account Details

  email: {
    type: String,
  },

  username: {
    type: String,
    min: 3,
    max: 30,
  },

  password: {
    type: String,
    min: 6,
    max: 1024,
  },

  // Admin Fiels

  isAdmin: { type: Boolean },

  // Subscription/Membership Fields

  subscribed: { type: Boolean },
  membership: { type: String },

  // Date Field
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
