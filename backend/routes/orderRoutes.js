import express from "express";
import {
  placeOrder,
  getMyOrders,
  getSellerOrders,
  updateSellerOrderStatus,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import { seller } from "../middleware/sellerMiddleware.js";
import { buyer } from "../middleware/buyerMiddleware.js";

const router = express.Router();

router.post("/", protect, buyer, placeOrder);
router.get("/myorders", protect, buyer, getMyOrders);
router.get("/seller", protect, seller, getSellerOrders);
router.put("/:id/seller-status", protect, seller, updateSellerOrderStatus);
router.get("/", protect, admin, getAllOrders);
router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;
