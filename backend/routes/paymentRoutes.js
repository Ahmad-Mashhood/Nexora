import express from "express";
import {
  getMyPayments,
  getSellerPayments,
  payPayment,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { seller } from "../middleware/sellerMiddleware.js";
import { buyer } from "../middleware/buyerMiddleware.js";

const router = express.Router();

router.get("/my", protect, buyer, getMyPayments);
router.get("/seller", protect, seller, getSellerPayments);
router.put("/:id/pay", protect, buyer, payPayment);

export default router;
