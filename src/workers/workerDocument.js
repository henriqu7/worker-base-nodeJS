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
        '{"Username": "","Password": "","IntegratorKey": ""}',
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
});
