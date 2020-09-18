const express = require("express");
const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");
const {
  requireSignin,
  categoryCerateAccess,
} = require("../controllers/adminController");
const router = express.Router();

// define differnt page route
router.post(
  "/category/create",
  requireSignin,
  categoryCerateAccess,
  createCategory
);
router.get("/category/getcategory", getCategories);

module.exports = router;
