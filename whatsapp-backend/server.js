// importing
const express = require("express");
const mongoose = require("mongoose");

// app config
const app = express();
const port = process.env.PORT || 9000;

// DB config
const connection_url =
  "mongodb+srv://admin:TnUzLSwuDNAcIONN@cluster0.la42b.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// app routes
app.get("/", (req, res) => res.status(200).send("hello world"));

// app listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
