const jwt = require("jsonwebtoken");

// put id in payload
function generateJwtToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

module.exports = generateJwtToken