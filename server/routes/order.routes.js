const router = require("express").Router();
const User = require("../models/User.model");
const Order = require("../models/Order.model");

router.post("/new", async (req, res) => {
  const orderDetails = {
    products: req.body.cartData,
  };

  try {
    const createdOrder = await Order.create(orderDetails);
    const foundUser = await User.findByIdAndUpdate(req.body.userId, { $push: { orders: createdOrder._id } }, { new: true });
    res.json(createdOrder);
  } catch (err) {
    console.log(err);
  }
});

router.post("/:id/paid", async (req, res) => {
  const orderId = req.params.id;
  Order.findOneAndUpdate(orderId, { paid: true }, { new: true })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate({
    path: "orders",
    model: "Order",
  });
  res.json(user.orders);
});

module.exports = router;
