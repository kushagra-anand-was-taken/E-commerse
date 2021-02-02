const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Product = require("../models/product");
const Sub = require("../models/Sub");

// middlewares
const { auth, adminCheck } = require("../middleware/auth");

// routes
router.post("/category", auth, adminCheck, async (req, res) => {
  try {
    const { name } = req.body;
    // const category = await new Category({ name, slug: slugify(name) }).save();
    // res.json(category);
    res.json(await new Category({ name }).save());
  } catch (err) {
    // console.log(err);
    res.status(400).send("Create category failed");
  }
});
router.get("/categories", async (req, res) => {
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
});
router.get("/category/:id", async (req, res) => {
  let category = await Category.findById(req.params.id).exec();
  const products = await Product.find({ category }).populate("category").exec();
  res.json({
    category,
    products,
  });
});
router.put("/category/:id", auth, adminCheck, async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { name },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Create update failed");
  }
});
router.delete("/category/:id", auth, adminCheck, async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ _id: req.params.id });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Create delete failed");
  }
});

router.get("/category/subs/:_id", async (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
});

module.exports = router;
