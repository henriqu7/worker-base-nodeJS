var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var queue = require("./queue");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello from container land!");
});

app.post("/task", function (req, res) {
  try {
    queue.sendToQueue("queueDocuments", req.body);
    res.json({ message: "Your request will be processed!" });
  } catch (e) {
    res.json({ message: "Error!" });
  }
});

var server = app.listen(process.env.PORT, function () {
  var port = server.address().port;
  console.log("Example app listening at http:/localhost:%s", port);
});
