const redis = require("redis");
const client = redis.createClient();

client
  .on("connect", function () {
    console.log("redis connected");
    console.log(`connected ${client.connected}`);
  })
  .on("error", function (error) {
    console.log(error);
  });

module.export = client;
