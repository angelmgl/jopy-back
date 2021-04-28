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

router.post("/", createTransaction);

router.get("/", getAllTransactions);

router.get("/latest", getLatestTransactions);

router.get("/:type", getTransactionsByType);

router.get("/:id", getTransactionById);

router.put("/:id", updateTransactionById);

router.delete("/:id", deleteTransactionById);

module.exports = router;