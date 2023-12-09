const mongoose = require("mongoose");


const connectToDataBase = ()=>{

    mongoose
      .connect(process.env.URI)
      .then((data) => {
        console.log(`MongoDB connect with Server ${data.connection.host}`);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
}

module.exports = connectToDataBase

