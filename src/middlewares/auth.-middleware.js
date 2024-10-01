const jwt = require("jsonwebtoken")
const usersModel = require("../models/users-model")

module.exports = {
    ensureAuth: (req, res) => {
        const authHeader = req.headers.authorization

        if(!authHeader) return res.status(401).json({ message: "Não autorizado!"})

        const token = authHeader.split(' ')[1]

        try {
            const { id } = jwt.verify(token, process.env.JWT_KEY)
            const user = usersModel.getUserById(id)

            if(!user) return res.status(404).json({ message: 'Usuário não encontrado!'})
            req.user = user
            next()
        } catch (error) {
            return res.status(401).json( { message: 'Token Inválido' } )
        }
    }
}

// PAREI NO VIDEO PARTE 2 NO MINUTO 7:25