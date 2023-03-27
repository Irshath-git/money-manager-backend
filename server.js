const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config({ path: "./config.env" });
mongoose.set("strictQuery", false);
const port = process.env.PORT || 5000;

//using middlewares
app.use(cors());
app.use(express.json());

//mongodb connection
const conn = require("./db/connection");

//using routes
app.use(require("./routes/routes"));

conn
  .then((db) => {
    if (!db) return process.exit(1);

    //listen to the http server
    app.listen(port, () => {
      console.log(`Server is running on port : http://localhost:${port}`);
    });

    app.on("error", (error) => {
      console.log(`Failed to connect with HTTP server : ${error}`);
    });
  })
  .catch((error) => {
    console.log(`Connection Failed...!${error}`);
  });
