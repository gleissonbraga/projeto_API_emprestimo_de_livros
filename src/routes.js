const express = require('express')
const authController = require('./controller/auth-controller')
const router = express.Router()


router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)





module.exports = router