const router = require("express").Router();
const User = require("../models/User.model");
const Order = require("../models/Order.model");

router.post("/new", async (req, res) => {
  try {
    const orderDetails = {
      products: req.body.cartData,
    };
    const createdOrder = await Order.create(orderDetails);
    await User.findByIdAndUpdate(req.body.userId, { $push: { orders: createdOrder._id } });
    res.json(createdOrder);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/paid", async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { paid: true }, { new: true });
    console.log(updatedOrder)
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "orders",
      model: "Order",
    });
    res.json(user.orders);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
