import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Please add a title"], trim: true },
    price: { type: Number, required: [true, "Please add a price"], min: 0 },
    description: { type: String, required: [true, "Please add a description"] },
    image: { type: String, required: [true, "Please add an image URL"] },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    countInStock: { type: Number, required: true, default: 0, min: 0 },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
