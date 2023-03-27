const mongoose = require("mongoose");

console.log(process.env.ATLAS_URI);
const conn = mongoose
  .connect(process.env.ATLAS_URI)
  // .set("strictQuery", false)
  .then((db) => {
    console.log("Database Connected");
    return db;
  })
  .catch((error) => {
    console.log(error);
  });
module.exports = conn;
