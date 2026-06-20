import asyncHandler from "../utils/asyncHandler.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Payment from "../models/Payment.js";

const demoTransactionId = () =>
  `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const createPaymentsForOrder = async (order, paymentMethod) => {
  const sellerTotals = {};

  for (const item of order.orderItems) {
    const sellerId = item.seller.toString();
    const lineTotal = item.price * item.quantity;
    sellerTotals[sellerId] = (sellerTotals[sellerId] || 0) + lineTotal;
  }

  const isCard = paymentMethod.includes("Credit Card");
  const payments = [];

  for (const [sellerId, amount] of Object.entries(sellerTotals)) {
    const payment = await Payment.create({
      order: order._id,
      buyer: order.user,
      seller: sellerId,
      amount,
      paymentMethod,
      status: isCard ? "paid" : "pending",
      transactionId: isCard ? demoTransactionId() : "",
    });
    payments.push(payment);
  }

  if (isCard) {
    order.isPaid = true;
    order.paidAt = new Date();
    await order.save();
  }

  return payments;
};

// @desc    Place order from cart (buyers only)
// @route   POST /api/orders
export const placeOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );

  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  const orderItems = [];
  let totalAmount = 0;

  for (const item of cart.items) {
    const product = item.product;
    if (!product) {
      res.status(404);
      throw new Error("Product not found in cart");
    }
    if (!product.seller) {
      res.status(400);
      throw new Error(`Product "${product.title}" has no seller`);
    }
    if (product.countInStock < item.quantity) {
      res.status(400);
      throw new Error(`Not enough stock for ${product.title}`);
    }

    orderItems.push({
      product: product._id,
      seller: product.seller,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: item.quantity,
    });

    totalAmount += product.price * item.quantity;
    product.countInStock -= item.quantity;
    await product.save();
  }

  const paymentMethod = req.body.paymentMethod || "Cash on Delivery";

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress: req.body.shippingAddress,
    paymentMethod,
    totalAmount,
  });

  const payments = await createPaymentsForOrder(order, paymentMethod);

  cart.items = [];
  await cart.save();

  res.status(201).json({ order, payments });
});

// @desc    Get logged-in buyer's orders
// @route   GET /api/orders/myorders
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("orderItems.seller", "name storeName")
    .sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Get orders containing seller's products
// @route   GET /api/orders/seller
export const getSellerOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    "orderItems.seller": req.user._id,
  })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  const filtered = orders.map((order) => {
    const myItems = order.orderItems.filter(
      (item) => item.seller.toString() === req.user._id.toString()
    );
    const myTotal = myItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return {
      _id: order._id,
      buyer: order.user,
      myItems,
      myTotal,
      status: order.status,
      isPaid: order.isPaid,
      paymentMethod: order.paymentMethod,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
    };
  });

  res.json(filtered);
});

// @desc    Seller updates fulfillment status for their portion
// @route   PUT /api/orders/:id/seller-status
export const updateSellerOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  const hasSellerItems = order.orderItems.some(
    (item) => item.seller.toString() === req.user._id.toString()
  );
  if (!hasSellerItems) {
    res.status(403);
    throw new Error("No items from your store in this order");
  }

  const { status } = req.body;
  if (!["pending", "shipped", "delivered"].includes(status)) {
    res.status(400);
    throw new Error("Invalid status");
  }

  order.status = status;
  const updated = await order.save();
  res.json(updated);
});

// @desc    Get all orders (admin)
// @route   GET /api/orders
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "name email")
    .populate("orderItems.seller", "name storeName")
    .sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Update order status (admin)
// @route   PUT /api/orders/:id/status
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = req.body.status || order.status;
  const updated = await order.save();
  res.json(updated);
});
