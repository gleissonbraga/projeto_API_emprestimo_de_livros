const HttpError = require("../errors/HttpError")
const loansModel = require("../middlewares/loans-model")
const booksModel = require("../models/books-model")

module.exports = {
    // GET /api/loans
    index: (req, res) => {
        const loans = loansModel.getAllLoans()
        res.json(loans)
    },

    // GET /api/loans/:id
    show: (req, res) => {
        const { id } = req.params
        const loan = loansModel.getAllLoanById(id)
        if (!loan) throw new HttpError(404, 'Empréstimo não encontrado')
        res.json(loan)
    },

    // POST /api/loans
    save: (req, res) => {
        const user = req.user
        const { bookId } = req.body

        if(typeof bookId !== 'string') throw new HttpError(400, 'Id do livro inválido!')

        const book = booksModel.getAllLoanById(bookId)
        if(!book) throw new HttpError(404, 'Livro não encontrado!')

        const newLoan = loansModel.createLoan(user, book)
        res.status(201).json(newLoan)
    },

    // POST /api/loans/:id/return
    return: (req, res) => {
        const { id } = req.params

        const loan = loansModel.returnLoan(id)
        res.json(loan)
    }
}


// PAREI NA PARTE FINAL NO MINUTO 20:44