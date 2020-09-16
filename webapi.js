const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const queue = require("./queue");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const HOST = "127.0.0.1";

const router = express.Router();

router.post("/task", (req, res) => {
  try {
    queue.sendToQueue("queueDocuments", req.body);
    res.json({ message: "Your request will be processed!" });
  } catch (e) {
    res.json({ message: "Error!" });
  }
});

app.use("/", router);

var server = app.listen(process.env.PORT, function () {
  var port = server.address().port;
  console.log("Example app listening at http:/localhost:%s", port);
});
