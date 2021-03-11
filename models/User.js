const { Schema, model, Types } = require("mongoose");

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true },
  roles: [{ type: Types.ObjectId, ref: "Role" }],
  // roles: [{ type:String, ref: "Role" }],
});

module.exports = model("User", User);
