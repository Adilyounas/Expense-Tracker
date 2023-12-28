const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const userRoutes = require("./Routes/userRoutes")
const transactionRouter = require("./Routes/transactionRoutes")
const userKhataRouter = require("./Routes/khataRoutes")


//todo <--   I SEND DATA FROM POST MAN BUT THERE IS MONGODB ERROR THAT NAME,EMAIL,PASSWORD REQUIRED SO ----->
app.use(express.json())
app.use(cookieParser())




// import routes
app.use("/api/v1",userRoutes)
app.use("/api/v1",transactionRouter)
app.use("/api/v1",userKhataRouter)








module.exports = app;
