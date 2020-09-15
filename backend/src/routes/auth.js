const express = require('express')
const { signup, signin } = require('../controllers/authController')
const router = express.Router()

// define differnt page route
router.post('/signin', signin)
router.post('/signup', signup)

module.exports = router