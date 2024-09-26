const usersModel = require("../models/users-model")
const jwt = require("jsonwebtoken")

module.exports = {
    // POST /auth/register
    register: (req, res) => {
        const { name, email, password } = req.body
        if(typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
        }

        const existingUser = usersModel.getUserByEmail(email)
        if(existingUser){
            return res.status(400).json({ message: 'E-mail já cadastrado!'})
        }

        const newUser = usersModel.createUser(name, email, password)
        res.status(201).json(newUser)
    },

    // POST /auth/login
    login: (req, res) => {
        const { email, password } = req.body

        if(typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
        }

        const user = usersModel.getUserByEmail(email)
        
        if(!user){
            return res.status(404).json({ message: 'Usuário não encontrado'})
        }

        const isValidPassword = user.password === password
        if(!isValidPassword){
            return res.status(401).json({ message: 'Senha incorretas'})
        }

        const payload = { id: user.id, email: user.email }
        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1'})

        res.json({ token })

    }
}