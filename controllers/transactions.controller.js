const db = require("../database");

const controllers = {
    createTransaction: async (req, res) => {
        const newTransaction = req.body;

        try {
            await db.query("INSERT INTO transactions set ?", [newTransaction]);
            res.status(201).json(newTransaction);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    getAllTransactions: async (req, res) => {
        const { user_id } = req.body;

        if(user_id) {
            try {
                const transactions = await db.query("SELECT * FROM transactions WHERE user_id = ?", [user_id]);
                res.status(201).json(transactions);
            } catch (error) {
                res.status(400).json(error);
            }
        } else {
            res.status(400).json("Request must have a user_id.");
        }
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
};

module.exports = controllers;
