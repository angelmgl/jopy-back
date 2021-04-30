const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
const db = require("../database");

const controllers = {
    createTransaction: async (req, res) => {
        const token = req.headers["x-access-token"];
        const decoded = jwt.verify(token, SECRET);
        const {
            ammount,
            type,
            spends_category,
            income_category,
            created_at,
        } = req.body;

        const newTransaction = {
            ammount,
            type,
            spends_category,
            income_category,
            user_id: decoded.id,
            created_at,
        };

        try {
            await db.query("INSERT INTO transactions set ?", [newTransaction]);
            res.status(201).json({
                message: "Transaction successfully created!",
                transaction: newTransaction,
            });
        } catch (error) {
            res.status(400).json(error);
        }
    },

    getAllTransactions: async (req, res) => {
        const token = req.headers["x-access-token"];
        const decoded = jwt.verify(token, SECRET);

        try {
            const transactions = await db.query(
                "SELECT * FROM transactions WHERE user_id = ?",
                [decoded.id]
            );
            res.status(200).json(transactions);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    getLatestTransactions: async (req, res) => {
        // get 10 last transactions for home page
        const token = req.headers["x-access-token"];
        const decoded = jwt.verify(token, SECRET);

        try {
            const transactions = await db.query(
                "SELECT * FROM transactions WHERE user_id = ? ORDER BY id DESC LIMIT 10",
                [decoded.id]
            );
            res.status(200).json(transactions);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    getTransactionsByType: async (req, res) => {
        // get a transaction by its type
        const token = req.headers["x-access-token"];
        const decoded = jwt.verify(token, SECRET);
        const { type } = req.params;

        try {
            const transactions = await db.query(
                "SELECT * FROM transactions WHERE user_id = ? AND type = ?",
                [decoded.id, type]
            );
            res.status(200).json(transactions);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    getTransactionById: async (req, res) => {
        // get a transaction by its id
        const token = req.headers["x-access-token"];
        const decoded = jwt.verify(token, SECRET);
        const { id } = req.params;

        try {
            const transaction = await db.query(
                "SELECT * FROM transactions WHERE user_id = ? AND id = ?",
                [decoded.id, id]
            );
            res.status(200).json(transaction);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    updateTransactionById: async (req, res) => {
        const token = req.headers["x-access-token"];
        const decoded = jwt.verify(token, SECRET);
        const {
            ammount,
            spends_category,
            income_category,
            created_at,
        } = req.body;

        const { id } = req.params;

        const transaction = {
            ammount,
            spends_category,
            income_category,
            created_at,
        };

        try {
            await db.query(
                "UPDATE transactions SET ? WHERE user_id = ? AND id = ?",
                [transaction, decoded.id, id]
            );
            res.status(200).json({
                message: "Transaction successfully updated!",
                transaction
            });
        } catch (error) {
            res.status(400).json(error);
        }
    },

    deleteTransactionById: async (req, res) => {
        const token = req.headers["x-access-token"];
        const decoded = jwt.verify(token, SECRET);
        const { id } = req.params;

        try {
            const transactionDeleted = await db.query(
                "DELETE FROM transactions WHERE user_id = ? AND id = ?",
                [decoded.id, id]
            );
            res.status(200).json({
                message: "Transaction succesfully deleted!",
                transaction: transactionDeleted,
            });
        } catch (error) {
            res.status(400).json(error);
        }
    },
};

module.exports = controllers;
