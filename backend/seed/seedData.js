import dotenv from "dotenv";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import connectDB from "../config/db.js";

dotenv.config();

// Local images live in frontend/public/images/ — served at /images/... (works offline)
const img = (filename) => `/images/${filename}`;

const seedDatabase = async () => {
  try {
    await connectDB();

    await Payment.deleteMany({});
    await Order.deleteMany({});
    await Cart.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    await User.create({
      name: "Admin User",
      email: "admin@shop.com",
      password: "admin123",
      role: "admin",
    });

    const seller1 = await User.create({
      name: "Sarah Chen",
      email: "seller@shop.com",
      password: "seller123",
      role: "seller",
      storeName: "Sarah's Electronics",
    });

    const seller2 = await User.create({
      name: "Mike Johnson",
      email: "seller2@shop.com",
      password: "seller123",
      role: "seller",
      storeName: "Mike's Gear Hub",
    });

    await User.create({
      name: "Demo Buyer",
      email: "buyer@shop.com",
      password: "buyer123",
      role: "buyer",
    });

    await Product.insertMany([
      {
        title: "Adjustable Aluminum Laptop Stand",
        price: 34.99,
        description:
          "Foldable ergonomic laptop stand with anti-slip pads. Raises your screen to eye level and improves airflow.",
        image: img("amr-taha-PikMja4yL14-unsplash.jpg"),
        category: "Electronics",
        countInStock: 40,
        seller: seller1._id,
      },
      {
        title: "White RGB Mechanical Keyboard",
        price: 89.99,
        description:
          "Compact 60% mechanical keyboard with per-key RGB backlighting and white keycaps.",
        image: img("bestami-sarikaya-jtNUtM0wy5I-unsplash.jpg"),
        category: "Electronics",
        countInStock: 25,
        seller: seller1._id,
      },
      {
        title: "27\" Curved Gaming Monitor",
        price: 299.99,
        description:
          "Ultra-wide curved display perfect for gaming and productivity. Includes height-adjustable stand.",
        image: img("ella-don-JomkRNkzKhE-unsplash.jpg"),
        category: "Electronics",
        countInStock: 15,
        seller: seller1._id,
      },
      {
        title: "RGB Portable Bluetooth Speaker",
        price: 49.99,
        description:
          "Cylindrical wireless speaker with pulsing LED light show, Bluetooth 5.0, and 12-hour battery.",
        image: img("habib-dadkhah-zxvnrxl5OXc-unsplash.jpg"),
        category: "Electronics",
        countInStock: 50,
        seller: seller1._id,
      },
      {
        title: "Black RGB Mechanical Gaming Keyboard",
        price: 79.99,
        description:
          "Full-size mechanical keyboard with customizable rainbow RGB and durable PBT keycaps.",
        image: img("mateo-nCU4yq5xDEQ-unsplash.jpg"),
        category: "Electronics",
        countInStock: 30,
        seller: seller1._id,
      },
      {
        title: "Wireless Ergonomic Mouse",
        price: 39.99,
        description:
          "Sleek minimalist wireless mouse with silent clicks and long battery life. Works on any desk surface.",
        image: img("oscar-nilsson-1BHYZFVyGaw-unsplash.jpg"),
        category: "Electronics",
        countInStock: 60,
        seller: seller1._id,
      },
      {
        title: "Low-Profile RGB Mechanical Keyboard",
        price: 99.99,
        description:
          "Slim wireless mechanical keyboard with low-profile switches, Mac/Windows keys, and orange accent Esc key.",
        image: img("raphael-nogueira-O7wNAVxmgA4-unsplash.jpg"),
        category: "Electronics",
        countInStock: 20,
        seller: seller2._id,
      },
      {
        title: "Industrial Brass Desk Lamp",
        price: 54.99,
        description:
          "Matte navy task lamp with brass accents, perforated shade, and braided cord. Warm focused lighting.",
        image: img("rebecca-r-NtFE0piBGF4-unsplash.jpg"),
        category: "Home",
        countInStock: 35,
        seller: seller2._id,
      },
      {
        title: "Redragon Gaming Headset with Case",
        price: 69.99,
        description:
          "Over-ear gaming headset with noise-canceling mic, memory foam cushions, and hard-shell carrying case.",
        image: img("rebekah-yip-c2NALeX2wNk-unsplash.jpg"),
        category: "Electronics",
        countInStock: 28,
        seller: seller2._id,
      },
      {
        title: "Honeycomb RGB Gaming Mouse",
        price: 44.99,
        description:
          "Lightweight gaming mouse with honeycomb shell, 6 programmable buttons, and customizable RGB zones.",
        image: img("supratik-deshmukh-iO0I6-mhDEY-unsplash.jpg"),
        category: "Electronics",
        countInStock: 45,
        seller: seller2._id,
      },
    ]);

    console.log("Database seeded with 10 local-image products!");
    console.log("");
    console.log("--- Demo accounts ---");
    console.log("Admin:  admin@shop.com  / admin123");
    console.log("Seller: seller@shop.com / seller123");
    console.log("Seller: seller2@shop.com / seller123");
    console.log("Buyer:  buyer@shop.com  / buyer123");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();
