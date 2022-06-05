const router = require("express").Router();
const fs = require("fs");
const transcribeSpeech = require("../utils/speechToText");

router.post("/", async (req, res, next) => {
  try {
    const noop = () => {};
    await fs.writeFile("speech.webm", req.files.file.data, noop);

    const response = await transcribeSpeech();

    if(response.result.results.length > 0) {
      const result = JSON.stringify(response.result.results[0].alternatives[0].transcript, null, 2);
      res.json(result);
    } else {
      console.log("else");
      fs.unlinkSync("speech.webm");
      res.json("Sorry, I couldn't understand you. Please try again.");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
