import asyncHandler from "../utils/asyncHandler.js";
import Payment from "../models/Payment.js";
import Order from "../models/Order.js";

const demoTransactionId = () =>
  `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

// @desc    Get buyer's payments
// @route   GET /api/payments/my
export const getMyPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({ buyer: req.user._id })
    .populate("seller", "name storeName email")
    .populate("order", "totalAmount status createdAt")
    .sort({ createdAt: -1 });
  res.json(payments);
});

// @desc    Get seller's received payments
// @route   GET /api/payments/seller
export const getSellerPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({ seller: req.user._id })
    .populate("buyer", "name email")
    .populate("order", "totalAmount status createdAt")
    .sort({ createdAt: -1 });
  res.json(payments);
});

// @desc    Pay a pending payment (buyer — demo card)
// @route   PUT /api/payments/:id/pay
export const payPayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    res.status(404);
    throw new Error("Payment not found");
  }

  if (payment.buyer.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to pay this");
  }

  if (payment.status === "paid") {
    res.status(400);
    throw new Error("Payment already completed");
  }

  const { cardNumber } = req.body;
  if (!cardNumber || cardNumber.replace(/\s/g, "").length < 13) {
    res.status(400);
    throw new Error("Invalid card number (demo: use any 13+ digits)");
  }

  payment.status = "paid";
  payment.transactionId = demoTransactionId();
  payment.paymentMethod = "Credit Card (demo)";
  await payment.save();

  const orderPayments = await Payment.find({ order: payment.order });
  const allPaid = orderPayments.every((p) => p.status === "paid");
  if (allPaid) {
    await Order.findByIdAndUpdate(payment.order, {
      isPaid: true,
      paidAt: new Date(),
    });
  }

  res.json(payment);
});
