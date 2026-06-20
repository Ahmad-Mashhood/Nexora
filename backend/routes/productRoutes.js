import express from "express";
import {
  getProducts,
  getMyProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import { seller } from "../middleware/sellerMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/mine", protect, seller, getMyProducts);
router.get("/:id", getProductById);

router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
