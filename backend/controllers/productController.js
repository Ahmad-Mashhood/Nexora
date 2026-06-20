import asyncHandler from "../utils/asyncHandler.js";
import Product from "../models/Product.js";

// @desc    Get all products (public)
// @route   GET /api/products
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .populate("seller", "name storeName email")
    .sort({ createdAt: -1 });
  res.json(products);
});

// @desc    Get seller's own products
// @route   GET /api/products/mine
export const getMyProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ seller: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(products);
});

// @desc    Get single product
// @route   GET /api/products/:id
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "seller",
    "name storeName email"
  );
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});

// @desc    Create product (seller or admin)
// @route   POST /api/products
export const createProduct = asyncHandler(async (req, res) => {
  const sellerId =
    req.user.role === "admin" && req.body.seller
      ? req.body.seller
      : req.user._id;

  if (req.user.role !== "seller" && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Only sellers and admins can create products");
  }

  const product = await Product.create({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    countInStock: req.body.countInStock,
    seller: sellerId,
  });

  const populated = await Product.findById(product._id).populate(
    "seller",
    "name storeName"
  );
  res.status(201).json(populated);
});

// @desc    Update product (owner seller or admin)
// @route   PUT /api/products/:id
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const isOwner = product.seller.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized to update this product");
  }

  product.title = req.body.title ?? product.title;
  product.price = req.body.price ?? product.price;
  product.description = req.body.description ?? product.description;
  product.image = req.body.image ?? product.image;
  product.category = req.body.category ?? product.category;
  product.countInStock = req.body.countInStock ?? product.countInStock;

  const updated = await product.save();
  res.json(updated);
});

// @desc    Delete product (owner seller or admin)
// @route   DELETE /api/products/:id
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const isOwner = product.seller.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized to delete this product");
  }

  await product.deleteOne();
  res.json({ message: "Product removed" });
});
