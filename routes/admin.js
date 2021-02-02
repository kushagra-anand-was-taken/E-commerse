const express = require("express");
const Order = require("../models/order");
const router = express.Router();

// middlewares
const { auth, adminCheck } = require("../middleware/auth");

// routes
router.get("/admin/orders", auth, adminCheck, async (req, res) => {
  let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();

  res.json(allOrders);
});
router.put("/admin/order-status", auth, adminCheck, async (req, res) => {
  // console.log(req.body);
  // return;
  const { orderId, orderStatus } = req.body;

  let updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();

  res.json(updated);
});

module.exports = router;
