const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const { check, validationResult } = require("express-validator");

const router = Router();

router.post(
  "/registration",
  [
    check("name", "User name is required.").notEmpty(),
    check("name", "Incorrect user name. Min length 4 symbols.").isLength({
      min: 4,
    }),
    check("email", "Email is required.").notEmpty(),
    check("email", "Incorrect email.").isEmail(),
    check("password", "Incorrect password. Min length 6 symbols")
      .notEmpty()
      .isLength({ min: 6 }),
    check("userRole", "Incorrect user role.").notEmpty(),
  ],
  authController.registration
);

router.post(
  "/login",
  [
    check("email", "Email is required.").notEmpty(),
    check("email", "Incorrect email.").isEmail(),
    check("password", "Incorrect password. Min length 6 symbols")
      .notEmpty()
      .isLength({ min: 6 }),
  ],
  authController.login
);

router.get("/users", authController.getUsers);

router.get("/roles", authController.getRoles);

module.exports = router;
