const HttpError = require("../errors/HttpError")
const loansModel = require("../middlewares/loans-model")

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
    }

    // POST /api/loans

    // POST /api/loans/:id/return
}


// PAREI NA PARTE FINAL NO MINUTO 20:44