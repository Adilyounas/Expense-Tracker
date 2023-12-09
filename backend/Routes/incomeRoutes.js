const express = require("express")
const addIncome = require("../Controller/incomeController")
const { parseId } = require("../middleware/parseId")


const router = express.Router()



router.route("/addIncome").post(parseId,addIncome)

// router.route("/login").post(login)


module.exports = router
