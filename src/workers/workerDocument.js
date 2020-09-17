console.log("worker started");
const queue = require("../lib/queue");

var axios = require("axios");

queue.consume("queueDocuments", (message) => {
  console.log("Consuming Queue...");
  let data = message.content.toString();
  var config = {
    method: "post",
    url:
      "https://demo.docusign.net/restapi/v2.1/accounts/c8bca3f3-b65b-412e-9250-588bd0ac3970/envelopes",
    headers: {
      "X-DocuSign-Authentication":
        '{"Username": "iskander.bittencourt@globant.com","Password": "avanxo123","IntegratorKey": "14ecf375-fc06-4984-b9f9-40817b0cdb38"}',
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      queue.sendToQueue("queueDocumentsSuccess", response);
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      queue.sendToQueue("queueDocumentsError", error);

      console.log(error);
    });
});
