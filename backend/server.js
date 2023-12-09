// server.js or any other file
const app = require("./app.js");
const connectToDataBase = require("./database.js");

const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

connectToDataBase();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
