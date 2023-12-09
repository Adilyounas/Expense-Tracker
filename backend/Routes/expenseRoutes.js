const express = require("express");
const addExpense = require("../Controller/expenseController");
const { parseId } = require("../middleware/parseId");

const router = express.Router();

router.route("/addExpense").post(parseId, addExpense);

module.exports = router;
