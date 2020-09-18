const express = require("express");
const { signup, signin } = require("../controllers/authController");
const {
  signUpValidateRequest,
  signInValidateRequest,
  isRequestValidated,
} = require("../validator/authValidator");
const router = express.Router();

// define differnt page route
router.post("/signin", signInValidateRequest, isRequestValidated, signin);
router.post("/signup", signUpValidateRequest, isRequestValidated, signup);

module.exports = router;
