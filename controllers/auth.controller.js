const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");
const { roleType } = require("../models/role.types");
const config = require("config");

const getTokenFromHeaders = (authorization) => authorization.split(" ")[1];

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
    const role = await Role.findOne({ value: userRole });

    if (!role) {
      return res
        .status(400)
        .json({ message: "Registration error. Wrong user role." });
    }

    const user = new User({
      name,
      email,
      password: hashedPassword,
      roles: [role._id],
    });

    await user.save();

    const jwtToken = jwt.sign(
      { userId: user._id, userRoles: user.roles },
      config.get("jwtSecret"),
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "You have successfully registered.",
      token: jwtToken,
      userId: user._id,
      userName: user.name,
      roles: [userRole],
    });
  } catch (err) {
    return res.status(400).json({ message: "Registration error." });
  }
};

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Login error. Incorrect email or password.",
      });
    }

    const { email, password } = req.body;

    const candidate = await User.findOne({ email });
    if (!candidate) {
      return res
        .status(400)
        .json({ message: `Login error. User ${email} not found.` });
    }

    const matchPassword = bcrypt.compareSync(password, candidate.password);
    if (!matchPassword) {
      return res.status(400).json({ message: `Login error. Wrong password.` });
    }

    const jwtToken = jwt.sign(
      { userId: candidate._id, userRoles: candidate.roles },
      config.get("jwtSecret"),
      { expiresIn: "1h" }
    );

    const getRoleNames = async () =>
      Promise.all(
        candidate.roles.map(async (role) => {
          const result = await Role.findById(role);
          return result.value;
        })
      );

    return res.status(201).json({
      message: "You have successfully logged.",
      token: jwtToken,
      userId: candidate._id,
      userName: candidate.name,
      roles: await getRoleNames(),
    });
  } catch (err) {
    console.log(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const token = getTokenFromHeaders(req.headers.authorization);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Error. No authorization token." });
    }

    const { userId, userRoles } = jwt.decode(token);

    const user = await User.findById(userId);
    const adminRole = await Role.findOne({ value: roleType.ADMIN });

    if (!user.roles.includes(adminRole._id)) {
      return res.status(401).json({ message: "Permission denied." });
    }

    const users = await User.find();
    res.json({ users });
    /*const userRole = new Role();
    const adminRole = new Role({ value: roleType.ADMIN });
    await userRole.save();
    await adminRole.save();*/
  } catch (err) {
    console.log(err);
  }
};

const getRoles = async (req, res, next) => {
  try {
    const token = getTokenFromHeaders(req.headers.authorization);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Error. No authorization token." });
    }

    const { userId, userRoles } = jwt.decode(token);

    const user = await User.findById(userId);
    const adminRole = await Role.findOne({ value: roleType.ADMIN });

    if (!user.roles.includes(adminRole._id)) {
      return res.status(401).json({ message: "Permission denied." });
    }

    const roles = await Role.find();
    res.json({ roles });
    /*const userRole = new Role();
    const adminRole = new Role({ value: roleType.ADMIN });
    await userRole.save();
    await adminRole.save();*/
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registration, login, getUsers, getRoles };
