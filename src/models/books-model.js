//  criador de ID automático
const uuid = require('uuid').v4

let books = [
    { id: '1', title: 'Book One', author: 'Author One', quantityAvailble: 4},
    { id: '2', title: 'Book Two', author: 'Author Two', quantityAvailble: 3}
]

module.exports = {
    getAllBooks: () => books,

    getBookById: (id) => books.find(book => book.id === id),

    createBook: (title, author, quantityAvailble) => {
        const newBook = {
            id: uuid(),
            title,
            author,
            quantityAvailble
        }
        books.push(newBook)
        return newBook
    },

    updateBook: (id, updatedBook) => {
        const bookIndex = books.findIndex(book => book.id === id)
        if(bookIndex === -1) throw new Error('Livro não encontrado')
        books[bookIndex] = {...books[bookIndex], ...updatedBook}
        return books[bookIndex]
    },

    deleteBook: (id) => {
        const bookIndex = books.findIndex(book => book.id === id)
        if(bookIndex === -1) throw new Error('Livro não encontrado')
        const deletedBook = books[bookIndex]
        books = books.filter(book => book.id !== id)
        return deletedBook
    }
}