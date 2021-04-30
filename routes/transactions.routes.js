const express = require("express");
const router = express.Router();
const {
    createTransaction,
    getAllTransactions,
    getLatestTransactions,
    getTransactionsByType,
    getTransactionById,
    updateTransactionById,
    deleteTransactionById
} = require("../controllers/transactions.controller");
const verifyToken = require("../middlewares/auth");
const { validateTransaction } = require("../middlewares/transactions");

router.post("/", verifyToken, validateTransaction, createTransaction);

router.get("/", verifyToken, getAllTransactions);

router.get("/latest", verifyToken, getLatestTransactions);

router.get("/type/:type", verifyToken, getTransactionsByType);

router.get("/:id", verifyToken, getTransactionById);

router.put("/:id", verifyToken, validateTransaction, updateTransactionById);

router.delete("/:id", verifyToken, deleteTransactionById);

module.exports = router;