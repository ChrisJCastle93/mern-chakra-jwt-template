const connectRedis = async (client) => {
  client.on("connect", function () {
    console.log("Redis connected");
  });
  client.on("error", (err) => {
    console.log(err);
  });
  await client.connect();
};

module.exports = connectRedis;
