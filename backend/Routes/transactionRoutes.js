const express = require("express")
const {createOrUpdateTransaction, getAllTransactions, getSingleTransaction, updateTransaction, deleteSingleTransaction, deleteAllUserData} = require("../Controller/transactionController")

const { parseId } = require("../middleware/parseId")


const router = express.Router()



router.route("/createTransaction").post(parseId,createOrUpdateTransaction)
router.route("/getAllTransactions").get(parseId,getAllTransactions)

router.route("/allTransitions/:id").get(parseId, getSingleTransaction);
router.route("/allTransitions/updateTransaction/:id").put(parseId, updateTransaction);
router.route("/allTransitions/deleteTransaction/:id").delete(parseId, deleteSingleTransaction);
router.route("/deleteAllUserData").delete(parseId, deleteAllUserData);



module.exports = router
