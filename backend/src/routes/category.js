const express = require("express");
const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");
const {
  requireSignin,
  categoryCreateAccess,
} = require("../controllers/adminController");
const router = express.Router();

// define differnt page route
router.post(
  "/category/create",
  requireSignin,
  categoryCreateAccess,
  createCategory
);
router.get("/category/getcategory", getCategories);

module.exports = router;
