const express = require("express");
const router = express.Router();
const Coupon = require("../models/coupon");

// middlewares
const { auth, adminCheck } = require("../middleware/auth");

// routes
router.post("/coupon", auth, adminCheck, async (req, res) => {
  try {
    // console.log(req.body);
    // return;
    const { name, expiry, discount } = req.body.coupon;
    res.json(await new Coupon({ name, expiry, discount }).save());
  } catch (err) {
    console.log(err);
  }
});
router.get("/coupons", async (req, res) => {
  try {
    res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec());
  } catch (err) {
    console.log(err);
  }
});
router.delete("/coupon/:couponId", auth, adminCheck, async (req, res) => {
  try {
    res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec());
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
