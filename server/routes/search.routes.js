const router = require("express").Router();

const axios = require("axios");

const redis = require("redis");
const connectRedis = require("../utils/connectRedis");
const client = redis.createClient({ url: process.env.REDIS_URL });

connectRedis(client);

const cacheSearch = async (req, res, next) => {
  const amazonSearchQuery = req.query.q.replaceAll("+", " ");
  const data = await client.get(amazonSearchQuery);
  if (data !== null) {
    const parsedData = JSON.parse(data);
    const filteredData = parsedData.filter((item) => !!item.prices);
    res.json(filteredData);
  } else {
    next();
  }
};

const cacheProduct = async (req, res, next) => {
  const productToSearch = req.params.id;
  const data = await client.get(productToSearch);
  if (data !== null) {
    const parsedData = JSON.parse(data);
    res.json(parsedData);
  } else {
    next();
  }
};

router.get("/", cacheSearch, async (req, res) => {
  try {
    const amazonSearchQuery = req.query.q.replaceAll("+", " ");

    if (amazonSearchQuery.length == 0) {
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
    next(err);
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
    next(err);
  }
});

module.exports = router;
