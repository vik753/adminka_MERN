const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const PORT = config.get("port") || 5000;

const app = express();

app.use(express.json());

app.use("/auth", require("./routes/auth.routes"));

const start = async () => {
  try {
    await mongoose.connect(
      config.get('mongoUri'),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    app.listen(5000, () =>
      console.log(`Server has been started on port: ${PORT}`)
    );
  } catch (err) {
    console.log("Error starting server or connecting to database.", err);
    process.exit(1);
  }
};

start();
