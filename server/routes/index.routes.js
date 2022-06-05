const router = require("express").Router();

const authRoutes = require("./auth.routes");
const paymentRoutes = require("./payment.routes");
const speechRoutes = require("./speech.routes");
const searchRoutes = require("./search.routes");
const orderRoutes = require("./order.routes");
const chatRoutes = require("./chat.routes");

router.use("/auth", authRoutes);
router.use("/payments", paymentRoutes);
router.use("/convertspeech", speechRoutes);
router.use("/search", searchRoutes);
router.use("/order", orderRoutes);

module.exports = router;
