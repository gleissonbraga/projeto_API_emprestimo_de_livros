const express = require('express')
const authController = require('../controller/auth-controller')
const authMiddleware = require('../middlewares/auth.-middleware')
const authRouter = express.Router()


authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)

authRouter.post('/test', authMiddleware.ensureAuth, (req, res) => {res.json({message: 'teste'})})




module.exports = authRouter