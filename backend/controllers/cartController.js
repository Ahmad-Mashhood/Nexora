import asyncHandler from "../utils/asyncHandler.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate(
    "items.product",
    "title price image countInStock"
  );
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await Cart.findById(cart._id).populate(
      "items.product",
      "title price image countInStock"
    );
  }
  return cart;
};

// @desc    Get user cart
// @route   GET /api/cart
export const getCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  res.json(cart);
});

// @desc    Add item to cart
// @route   POST /api/cart
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  const existingIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (existingIndex > -1) {
    cart.items[existingIndex].quantity += Number(quantity);
  } else {
    cart.items.push({ product: productId, quantity: Number(quantity) });
  }

  await cart.save();
  const populated = await getOrCreateCart(req.user._id);
  res.status(201).json(populated);
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  const item = cart.items.find(
    (i) => i.product.toString() === req.params.productId
  );
  if (!item) {
    res.status(404);
    throw new Error("Item not in cart");
  }

  if (Number(quantity) <= 0) {
    cart.items = cart.items.filter(
      (i) => i.product.toString() !== req.params.productId
    );
  } else {
    item.quantity = Number(quantity);
  }

  await cart.save();
  const populated = await getOrCreateCart(req.user._id);
  res.json(populated);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
export const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (i) => i.product.toString() !== req.params.productId
  );
  await cart.save();

  const populated = await getOrCreateCart(req.user._id);
  res.json(populated);
});
