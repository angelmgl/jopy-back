module.exports = {
    createTransaction: (req, res) => {
        // create a new transaction
        res.json("creating a new transaction");
    },

    getAllTransactions: (req, res) => {
        // get all transactions
        res.json("get all transactions");
    },

    getLatestTransactions: (req, res) => {
        // get 10 last transactions for home page
        res.json("get latest 10 transactions");
    },

    getTransactionsByType: (req, res) => {
        // get a transaction by its type
        res.json("get all transactions by its type");
    },

    getTransactionById: (req, res) => {
        // get a transaction by its id
        res.json("get a transaction");
    },

    updateTransactionById: (req, res) => {
        // update a transaction by its id
        res.json("updating");
    },

    deleteTransactionById: (req, res) => {
        // delete a transaction by its id
        res.json("deleting");
    },
}