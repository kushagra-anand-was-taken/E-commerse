const express = require("express");
const router = express.Router();
const Sub = require("../models/Sub");
const Product = require("../models/product");

// middlewares
const { auth, adminCheck } = require("../middleware/auth");

// routes
router.post("/sub", auth, adminCheck, async (req, res) => {
  try {
    const { name, parent } = req.body;

    res.json(await new Sub({ name, parent }).save());
  } catch (err) {
    res.status(400).send("Create sub failed");
  }
});
router.get("/subs", async (req, res) => {
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());
});
router.get("/sub/:id", async (req, res) => {
  let sub = await Sub.findById(req.params.id).exec();
  const products = await Product.find({ subs: sub })
    .populate("category")
    .exec();
  res.json({
    sub,
    products,
  });
});
router.put("/sub/:id", auth, adminCheck, async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { _id: req.params.id },
      { name, parent },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("sub update failed");
  }
});
router.delete("/sub/:id", auth, adminCheck, async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ _id: req.params.id });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("sub delete failed");
  }
});

module.exports = router;
