const router = require("express").Router();
const fs = require("fs");

const axios = require("axios");
const redis = require("redis");

// const redisPort = process.env.REDIS_URL || 6379;
const client = redis.createClient({ url: process.env.REDIS_URL });

const connectRedis = async () => {
  await client.connect();
};

client.on("connect", function () {
  console.log("REDIS CLIENT CONNECTED!");
});

client.on("error", (err) => {
  console.log(err);
});

connectRedis();

const cacheSearch = async (req, res, next) => {
  const amazonSearchQuery = req.query.q.replaceAll("+", " ");

  const data = await client.get(amazonSearchQuery);

  if (data !== null) {
    console.log(`RETRIEVED ${amazonSearchQuery} FROM CACHE`);
    const parsedData = JSON.parse(data);
    const filteredData = parsedData.filter((item) => !!item.prices);
    res.json(filteredData);
  } else {
    console.log("NOTHING IN CACHE");
    next();
  }
};

const cacheProduct = async (req, res, next) => {
  const productToSearch = req.params.id;
  const data = await client.get(productToSearch);
  if (data !== null) {
    const parsedData = JSON.parse(data);
    console.log("FROM CACHE");
    res.json(parsedData);
  } else {
    console.log("NOTHING IN CACHE");
    next();
  }
};

router.get("/", cacheSearch, async (req, res) => {
  try {
    const amazonSearchQuery = req.query.q.replaceAll("+", " ");

    if (amazonSearchQuery.length == 0) {
      console.log("NOTHING IN SEARCH PARAMS");
      res.json("NOTHING");
    }

    const params = {
      api_key: process.env.RAINFOREST,
      type: "search",
      amazon_domain: "amazon.com",
      search_term: amazonSearchQuery,
    };

    const response = await axios.get("https://api.rainforestapi.com/request", { params });
    const searchResults = response.data.search_results;
    client.set(amazonSearchQuery, JSON.stringify(searchResults), 3600);
    const filteredData = searchResults.filter((item) => !!item.prices);
    res.json(filteredData);
  } catch (err) {
    console.log("ERROR IN SEARCH ROUTE");
  }
});

router.get("/results/:id", cacheProduct, async (req, res, next) => {
  try {
    const productToSearch = req.params.id;
    const params = {
      api_key: process.env.RAINFOREST,
      type: "product",
      amazon_domain: "amazon.com",
      asin: productToSearch,
    };

    const response = await axios.get("https://api.rainforestapi.com/request", { params });

    const productResults = response.data;

    await client.set(productToSearch, JSON.stringify(productResults), 3600);

    res.json(productResults);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
