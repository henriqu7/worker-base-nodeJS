const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const queue = require("./src/lib/queue");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4443;

const router = express.Router();

router.post("/task", (req, res) => {
  try {
    queue.sendToQueue("queueDocuments", req.body);
    res.json({ message: "Your request will be processed!" });
  } catch (e) {
    res.json({ message: "Error!" });
  }
});

router.post("/test", (req, res) => {
  try {
    console.log(req.body);
    res.json({ message: "OK" });
  } catch (e) {
    res.json({ message: "Error!" });
  }
});

app.use("/", router);

var server = app.listen(PORT, function () {
  console.log("Server Running");
});
