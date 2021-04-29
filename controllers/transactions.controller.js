const db = require("../database");

// TODO: change "cathegory" to "category"

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

        if (user_id) {
            try {
                const transactions = await db.query(
                    "SELECT * FROM transactions WHERE user_id = ?",
                    [user_id]
                );
                res.status(200).json(transactions);
            } catch (error) {
                res.status(400).json(error);
            }
        } else {
            res.status(400).json("Request must have a user_id.");
        }
    },

    getLatestTransactions: async (req, res) => {
        // get 10 last transactions for home page
        const { user_id } = req.body;

        if (user_id) {
            try {
                const transactions = await db.query(
                    "SELECT * FROM transactions WHERE user_id = ? ORDER BY id DESC LIMIT 10",
                    [user_id]
                );
                res.status(200).json(transactions);
            } catch (error) {
                res.status(400).json(error);
            }
        } else {
            res.status(400).json("Request must have a user_id.");
        }
    },

    getTransactionsByType: async (req, res) => {
        // get a transaction by its type
        const { user_id } = req.body;
        const { type } = req.params;

        if (user_id) {
            if(type === "income" || type === "spends") {
                try {
                    const transactions = await db.query(
                        "SELECT * FROM transactions WHERE user_id = ? AND type = ?",
                        [user_id, type]
                    );
                    res.status(200).json(transactions);
                } catch (error) {
                    res.status(400).json(error);
                }
            } else {
                res.status(404).json("This page does'nt exist!");
            }
        } else {
            res.status(400).json("Request must have a user_id.");
        }
    },

    getTransactionById: async (req, res) => {
        // get a transaction by its id
        const { user_id } = req.body;
        const { id } = req.params;

        if (user_id) {
            try {
                const transaction = await db.query(
                    "SELECT * FROM transactions WHERE user_id = ? AND id = ?",
                    [user_id, id]
                );
                res.status(200).json(transaction);
            } catch (error) {
                res.status(400).json(error);
            }
        } else {
            res.status(400).json("Request must have a user_id.");
        }
    },

    updateTransactionById: async (req, res) => {
        const { 
            ammount,
            spends_cathegory,
            income_cathegory,
            user_id,
            created_at
        } = req.body;

        const { id } = req.params;

        const transaction = {
            ammount,
            spends_cathegory,
            income_cathegory,
            created_at
        };

        if (user_id) {
            try {
                const transactionUpdated = await db.query(
                    "UPDATE transactions SET ? WHERE user_id = ? AND id = ?",
                    [transaction, user_id, id]
                );
                res.status(200).json(transactionUpdated);
            } catch (error) {
                res.status(400).json(error);
            }
        } else {
            res.status(400).json("Request must have a user_id.");
        }
    },

    deleteTransactionById: async (req, res) => {
        const { user_id } = req.body;
        const { id } = req.params;

        if (user_id) {
            try {
                const transactionDeleted = await db.query(
                    "DELETE FROM transactions WHERE user_id = ? AND id = ?",
                    [user_id, id]
                );
                res.status(200).json(transactionDeleted);
            } catch (error) {
                res.status(400).json(error);
            }
        } else {
            res.status(400).json("Request must have a user_id.");
        }
    },
};

module.exports = controllers;
