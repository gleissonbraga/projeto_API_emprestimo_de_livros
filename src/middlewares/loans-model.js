const HttpError = require('../errors/HttpError')
const booksModel = require('../models/books-model')

const uuid = require('uuid').v4

const loans = [
    { id: '1', UserId: '1', bookId: '1', loanDate: new Date('2024-01-01'), returnDate: null, isReturned: false, isLate: true }
]

module.exports = {
    getAllLoans: () => loans,

    getAllLoanById: (id) => loans.find(loan => loan.id === id),

    createLoan: (user, book) => {
        if(book.quantityAvalable < 1) throw new HttpError(400, 'Não há exemplares disponíveis')
        
        const today = new Date()
        const returnDate = new Date()
        returnDate.setDate(today.getDate() + 14)

        const newLoan = {
            id: uuid(),
            UserId: user.id,
            bookId: book.id,
            loanDate: today,
            returnDate: returnDate,
            isReturned: false,
            isLate: false
        }

        loans.push(newLoan)
        booksModel.takeBook(book.id)

        return newLoan
    },

    returnLoan: (id) => {
        const loanIndex = loans.findIndex(loan => loan.id === id)
        if(loanIndex === -1) throw new HttpError(404, 'Empréstimo não encontrado')

        const loan = loans[loanIndex]
        if(loans.isReturned) return null

        loan.isReturned = true

        const today = new Date()
        // loan.returnDate = today
        const limitDate = new Date(loan.returnDate())

        loan.isLate = today > limitDate
        loan.returnDate = today

        const book = booksModel.returnBook(loan.bookId)
        return loan
    }
}