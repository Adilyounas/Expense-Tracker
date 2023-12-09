const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const userRoutes = require("./Routes/userRoutes")
const incomeRoutes = require("./Routes/incomeRoutes")
const expenseRoutes = require("./Routes/expenseRoutes")
const getAll_IncomeAndExpense_Routes = require("./Routes/getAll_IncomeAndExpense_Routes")



//todo <--   I SEND DATA FROM POST MAN BUT THERE IS MONGODB ERROR THAT NAME,EMAIL,PASSWORD REQUIRED SO ----->
app.use(express.json())
app.use(cookieParser())




// import routes
app.use("/api/v1",userRoutes)
app.use("/api/v1",incomeRoutes)
app.use("/api/v1",expenseRoutes)
app.use("/api/v1",getAll_IncomeAndExpense_Routes)






module.exports = app;
