const {roleType} = require("./role.types");
const {Schema, model} = require('mongoose');

const Role = new Schema({
  value: {type: String, unique: true, default: roleType.USER}
})

module.exports = model("Role", Role)