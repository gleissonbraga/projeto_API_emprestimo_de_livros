const uuid = require('uuid').v4

const users = [
    { id: '1', name: 'Gleisson', email: 'gleisson@email.com', password: '123456'},
    { id: '2', name: 'Teste', email: 'teste@email.com', password: '654321'},
]

module.exports = {
    getAllUsers: () => users,

    getUserById: (id) => users.find(user => user.id === id),

    getUserByEmail: (id) => users.find(user => user.email === email),

    createUser: (name, email, password) => {
        const newUser = { id: uuid(), name, email, password }
        users.push(newUser)
        return newUser
    }
}