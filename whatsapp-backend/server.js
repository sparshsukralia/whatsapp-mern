// importing
const express = require("express");
const mongoose = require("mongoose");
const Messages = require("./dbMessages");
const Pusher = require("pusher");

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1099695",
  key: "1b20f3633e471e37a51c",
  secret: "03d8a537d381b83dea8a",
  cluster: "ap2",
  useTLS: true,
});

// middleware
app.use(express.json());

// DB config
const connection_url =
  "mongodb+srv://admin:TnUzLSwuDNAcIONN@cluster0.la42b.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB Connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);
  });
});

// app routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// app listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
