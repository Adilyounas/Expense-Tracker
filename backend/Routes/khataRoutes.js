const express = require("express");

const { parseId } = require("../middleware/parseId");
const { addCustomer, getAllKhatas, getSingleUserKhata, getSingleUserKhataOneTransaction, getSingleUserKhataOneTransaction_UPDATE, getSingleUserKhataOneTransaction_DELETE, deleteOneUserKhata, addTransactionInKhtata } = require("../Controller/KhataControllers");
const router = express.Router();

router.route("/addCustomer").post(parseId, addCustomer);
router.route("/getAllKhatas").get(parseId, getAllKhatas);
router.route("/getSingleUserKhata/:id").get(parseId, getSingleUserKhata);
router.route("/getSingleUserKhataOneTransaction/:khataId").get(parseId, getSingleUserKhataOneTransaction);
router.route("/getSingleUserKhataOneTransaction_update/:khataId").put(parseId, getSingleUserKhataOneTransaction_UPDATE);
router.route("/getSingleUserKhataOneTransaction_delete/:khataId").delete(parseId, getSingleUserKhataOneTransaction_DELETE);
router.route("/deleteSingleKhata/:khataId").delete(parseId, deleteOneUserKhata);
router.route("/addTransactionInKhtata/:khataId").post(parseId, addTransactionInKhtata);









module.exports = router;
