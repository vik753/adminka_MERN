const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Role = require("../models/Role");
const { roleType } = require("../models/role.types");

const registration = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Registration error. Incorrect email or password.",
      });
    }

    const { name, email, password, userRole } = req.body;

    const candidate = await User.findOne({ email });
    if (candidate) {
      return res
        .status(400)
        .json({ message: "Registration error. That user is already exist." });
    }

    const hashedPassword = bcrypt.hashSync(password, 12);
    const role = await Role.findOne({value: userRole})

    if(!role) {
      return res
        .status(400)
        .json({ message: "Registration error. Wrong user role." });
    }

    const user = new User({
      name,
      email,
      roles: [role._id],
    });

    console.log("user: ", user);

    return res
      .status(201)
      .json({ message: "You have successfully registered." });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Registration error." });
  }
};

const login = async (req, res, next) => {
  try {
    console.log("Login controller body: ", req.body);
    res.json({ message: "success" });
  } catch (err) {
    console.log(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    console.log("Users controller body: ", req.body);
    /*const userRole = new Role();
    const adminRole = new Role({ value: roleType.ADMIN });
    await userRole.save();
    await adminRole.save();*/
    res.json({ message: "success" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registration, login, getUsers };
