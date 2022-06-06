const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("WORKING");
});

module.exports = router;
