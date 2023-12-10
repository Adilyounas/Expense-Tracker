const express = require("express");
const {getAllIncomesAndExpense, getSingleTransaction, updateTransaction, deleteSingleTransaction, deleteAllUserData} = require("../Controller/getAll_IncomeAndExpense_Controller")
const { parseId } = require("../middleware/parseId");


const router = express.Router();

router.route("/getAll_IncomeAndExpense").get(parseId, getAllIncomesAndExpense);
router.route("/allTransitions/:id").get(parseId, getSingleTransaction);
router.route("/allTransitions/updateTransaction/:id").put(parseId, updateTransaction);
router.route("/allTransitions/deleteTransaction/:id").delete(parseId, deleteSingleTransaction);
router.route("/deleteAllUserData").delete(parseId, deleteAllUserData);





module.exports = router;
