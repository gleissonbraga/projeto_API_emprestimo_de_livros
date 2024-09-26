const express = require('express')
const authController = require('./controller/auth-controller')
const authMiddleware = require('./middlewares/auth.-middleware')
const router = express.Router()


router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.post('/test', authMiddleware.ensureAuth, (req, res) => {res.json({message: 'teste'})})




module.exports = router