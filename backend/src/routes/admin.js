const express = require('express')
const { signup, signin } = require('../controllers/adminController')
const router = express.Router()

// define differnt page route
router.post('/admin/signin', signin)
router.post('/admin/signup', signup)

module.exports = router