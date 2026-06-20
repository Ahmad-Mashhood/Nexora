import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  PageBreak,
} from "docx";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(
  __dirname,
  "..",
  "MERN_Ecommerce_Project_Report.docx"
);

const dateStr = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const h1 = (text) =>
  new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 240 },
  });

const h2 = (text) =>
  new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 320, after: 180 },
  });

const h3 = (text) =>
  new Paragraph({
    text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 240, after: 140 },
  });

const body = (text) =>
  new Paragraph({
    children: [new TextRun({ text, size: 24 })],
    spacing: { after: 160, line: 360 },
  });

const boldP = (label, value) =>
  new Paragraph({
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: 24 }),
      new TextRun({ text: value, size: 24 }),
    ],
    spacing: { after: 100 },
  });

const bullet = (text) =>
  new Paragraph({ text, bullet: { level: 0 }, spacing: { after: 100 } });

const numbered = (text) =>
  new Paragraph({ text, numbering: { reference: "numbers", level: 0 }, spacing: { after: 100 } });

const tableRow = (cells, header = false) =>
  new TableRow({
    children: cells.map(
      (text) =>
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text, bold: header, size: 22 })],
            }),
          ],
        })
    ),
  });

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "numbers",
        levels: [
          {
            level: 0,
            format: "decimal",
            text: "%1.",
            alignment: AlignmentType.START,
          },
        ],
      },
    ],
  },
  sections: [
    {
      children: [
        // ========== COVER PAGE ==========
        new Paragraph({ spacing: { before: 1200 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "PROJECT REPORT",
              bold: true,
              size: 28,
              color: "444444",
            }),
          ],
        }),
        new Paragraph({ spacing: { before: 400 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "NEXORA",
              bold: true,
              size: 72,
              color: "4F46E5",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "Multi-Vendor E-Commerce Web Application",
              bold: true,
              size: 36,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [
            new TextRun({
              text: "Built with MERN Stack",
              size: 28,
              italics: true,
              color: "555555",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: `( MongoDB · Express · React · Node.js )`, size: 24 })],
        }),
        new Paragraph({ spacing: { before: 800 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: `Report Date: ${dateStr}`, size: 24 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [
            new TextRun({
              text: "This document explains the complete project for sharing with teachers, clients, or team members.",
              size: 22,
              italics: true,
              color: "666666",
            }),
          ],
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // ========== TABLE OF CONTENTS (manual list) ==========
        h1("Table of Contents"),
        bullet("1. About This Project"),
        bullet("2. What Problem Does It Solve?"),
        bullet("3. Main Features"),
        bullet("4. User Types (Buyer, Seller, Admin)"),
        bullet("5. Technologies Used"),
        bullet("6. How the System Works"),
        bullet("7. Project Folder Structure"),
        bullet("8. How to Install and Run"),
        bullet("9. Test Login Accounts"),
        bullet("10. Website Pages List"),
        bullet("11. Database Tables"),
        bullet("12. Security Features"),
        bullet("13. Payment System (Demo)"),
        bullet("14. Conclusion"),
        new Paragraph({ children: [new PageBreak()] }),

        // ========== SECTION 1 ==========
        h1("1. About This Project"),
        body(
          "Nexora is a complete online shopping website (e-commerce platform) similar to Amazon or Shopify, but built as a learning and demonstration project using the MERN stack."
        ),
        body(
          "The name of the project folder is: mern-ecommerce. It has two main parts: a Backend (server + database) and a Frontend (website that users see in the browser)."
        ),
        boldP("Project Type", "Full-Stack Web Application"),
        boldP("Frontend URL (after running)", "http://localhost:3000"),
        boldP("Backend API URL (after running)", "http://localhost:5000"),
        boldP("Database", "MongoDB"),

        h1("2. What Problem Does It Solve?"),
        body(
          "This project shows how a real online marketplace works where:"
        ),
        bullet("Multiple sellers can register and sell their own products."),
        bullet("Buyers can browse products, add them to a cart, and place orders."),
        bullet("Payments go to the correct seller (split by seller automatically)."),
        bullet("An admin can manage everything on the platform."),
        body(
          "Anyone reading this report can understand what the software does without opening the code."
        ),

        h1("3. Main Features"),
        h2("Shopping Features (For Buyers)"),
        bullet("View all products on the home page"),
        bullet("Search products by name or category"),
        bullet("Filter by category and sort by price"),
        bullet("See product details with image, price, and seller name"),
        bullet("Add products to shopping cart"),
        bullet("Checkout with shipping address"),
        bullet("Pay sellers online (demo payment with card number)"),
        bullet("View order history and payment status"),
        h2("Seller Features"),
        bullet("Register as a seller with a store name"),
        bullet("Add, edit, and delete own products"),
        bullet("Set product title, price, description, image, category, and stock"),
        bullet("View orders from buyers who bought their products"),
        bullet("Change order status: Pending → Shipped → Delivered"),
        bullet("View money earned from buyers"),
        h2("Admin Features"),
        bullet("Login as administrator"),
        bullet("Manage all products on the website"),
        bullet("View and update all orders from all users"),

        h1("4. User Types (Buyer, Seller, Admin)"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableRow(["User Type", "Who Are They?", "What Can They Do?"], true),
            tableRow([
              "Buyer",
              "Customer who wants to shop",
              "Browse, cart, checkout, pay, view orders",
            ]),
            tableRow([
              "Seller",
              "Shop owner / vendor",
              "Add products, view sales, update order status, see earnings",
            ]),
            tableRow([
              "Admin",
              "Platform manager",
              "Manage all products and all orders",
            ]),
          ],
        }),
        new Paragraph({ spacing: { after: 200 } }),
        body(
          "Important: Buyers and Sellers can register themselves on the website. Admin account is created only through the database seed script (see Section 9)."
        ),

        h1("5. Technologies Used"),
        body("Below is a simple explanation of each technology:"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableRow(["Technology", "Used For"], true),
            tableRow(["MongoDB", "Stores all data (users, products, orders)"]),
            tableRow(["Express.js", "Backend server and API routes"]),
            tableRow(["React.js", "Interactive website interface"]),
            tableRow(["Node.js", "Runs the backend server"]),
            tableRow(["JWT", "Keeps users logged in securely"]),
            tableRow(["bcrypt", "Encrypts passwords before saving"]),
            tableRow(["Axios", "Sends requests from website to server"]),
            tableRow(["Vite", "Fast tool to run and build the React website"]),
          ],
        }),
        new Paragraph({ spacing: { after: 200 } }),

        h1("6. How the System Works"),
        body("Step-by-step flow when a buyer purchases a product:"),
        numbered("Buyer logs in with email and password."),
        numbered("Buyer adds products to the cart."),
        numbered("Buyer goes to Checkout and enters shipping address."),
        numbered("Buyer places the order — stock is reduced automatically."),
        numbered("System creates payment records for each seller in the order."),
        numbered("Buyer pays on the Payments page (or pays instantly if using demo card)."),
        numbered("Seller sees the order in Sales and can mark it as Shipped or Delivered."),
        numbered("Seller sees the payment in Earnings."),
        body(
          "Product images are stored locally in the project (folder: frontend/public/images/) so the website works even without internet for images."
        ),

        h1("7. Project Folder Structure"),
        body("Main folders and what they contain:"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableRow(["Folder / File", "Purpose"], true),
            tableRow(["mern-ecommerce/backend/", "Server code, API, database models"]),
            tableRow(["mern-ecommerce/backend/models/", "Database schemas (User, Product, etc.)"]),
            tableRow(["mern-ecommerce/backend/controllers/", "Business logic"]),
            tableRow(["mern-ecommerce/backend/routes/", "API URLs"]),
            tableRow(["mern-ecommerce/backend/seed/", "Script to add demo data"]),
            tableRow(["mern-ecommerce/frontend/", "React website"]),
            tableRow(["mern-ecommerce/frontend/src/pages/", "All website pages"]),
            tableRow(["mern-ecommerce/frontend/public/images/", "Product photos"]),
            tableRow(["mern-ecommerce/pictures/", "Original image files (backup)"]),
            tableRow(["mern-ecommerce/README.md", "Quick setup instructions"]),
          ],
        }),
        new Paragraph({ spacing: { after: 200 } }),

        h1("8. How to Install and Run"),
        body("Follow these steps exactly on a Windows computer:"),
        h3("Requirements"),
        bullet("Node.js installed (version 18 or higher)"),
        bullet("MongoDB installed and running"),
        h3("Step A — Start the Backend"),
        numbered('Open terminal and go to folder: mern-ecommerce\\backend'),
        numbered("Copy .env.example to .env and set MONGO_URI and JWT_SECRET"),
        numbered("Run: npm install"),
        numbered("Run: npm run seed   (adds demo users and products)"),
        numbered("Run: npm run dev    (server starts on port 5000)"),
        h3("Step B — Start the Frontend"),
        numbered('Open another terminal and go to: mern-ecommerce\\frontend'),
        numbered("Copy .env.example to .env"),
        numbered("Run: npm install"),
        numbered("Run: npm run dev    (website opens on port 3000)"),
        h3("Step C — Open the Website"),
        numbered("Open browser and visit: http://localhost:3000"),
        numbered("Login with any test account from Section 9"),

        h1("9. Test Login Accounts"),
        body("Use these accounts after running npm run seed in the backend:"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableRow(["Role", "Email", "Password"], true),
            tableRow(["Admin", "admin@shop.com", "admin123"]),
            tableRow(["Seller (Store 1)", "seller@shop.com", "seller123"]),
            tableRow(["Seller (Store 2)", "seller2@shop.com", "seller123"]),
            tableRow(["Buyer", "buyer@shop.com", "buyer123"]),
          ],
        }),
        new Paragraph({ spacing: { after: 200 } }),
        body("10 demo products with local images are added automatically when you run the seed command."),

        h1("10. Website Pages List"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableRow(["Page", "URL Path", "Who Can Access"], true),
            tableRow(["Home / Shop", "/", "Everyone"]),
            tableRow(["Product Details", "/product/:id", "Everyone"]),
            tableRow(["Login", "/login", "Everyone"]),
            tableRow(["Register", "/register", "Everyone"]),
            tableRow(["Cart", "/cart", "Buyer only"]),
            tableRow(["Checkout", "/checkout", "Buyer only"]),
            tableRow(["My Orders", "/orders", "Buyer only"]),
            tableRow(["My Payments", "/payments", "Buyer only"]),
            tableRow(["Seller Products", "/seller/products", "Seller only"]),
            tableRow(["Seller Sales", "/seller/orders", "Seller only"]),
            tableRow(["Seller Earnings", "/seller/payments", "Seller only"]),
            tableRow(["Admin Products", "/admin/products", "Admin only"]),
            tableRow(["Admin Orders", "/admin/orders", "Admin only"]),
          ],
        }),
        new Paragraph({ spacing: { after: 200 } }),

        h1("11. Database Tables (Collections)"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableRow(["Collection Name", "Stores"], true),
            tableRow(["users", "Name, email, password, role (buyer/seller/admin), store name"]),
            tableRow(["products", "Title, price, description, image, category, stock, seller ID"]),
            tableRow(["carts", "User ID and list of products with quantity"]),
            tableRow(["orders", "Buyer, items, address, total, status, paid or not"]),
            tableRow(["payments", "Order, buyer, seller, amount, paid/pending, transaction ID"]),
          ],
        }),
        new Paragraph({ spacing: { after: 200 } }),

        h1("12. Security Features"),
        bullet("Passwords are never stored as plain text — they are hashed with bcrypt."),
        bullet("Login uses JWT token — user stays logged in without sending password again."),
        bullet("Each API checks user role before allowing actions."),
        bullet("Sellers can only edit their own products."),
        bullet("Buyers can only see and pay their own cart, orders, and payments."),

        h1("13. Payment System (Demo)"),
        body(
          "This project uses a DEMO payment system for learning purposes (not real money). Two options at checkout:"
        ),
        bullet("Cash on Delivery — Payment stays Pending until buyer goes to Payments page and enters a demo card number (any 13+ digits, e.g. 4242424242424242)."),
        bullet("Credit Card (Demo) — Payment is marked Paid immediately with a fake transaction ID."),
        body(
          "If an order has products from 2 different sellers, 2 separate payment records are created — one per seller."
        ),

        h1("14. Conclusion"),
        body(
          "Nexora is a complete, working MERN e-commerce project suitable for college submission, portfolio, or client demonstration. It includes user authentication, multi-vendor product management, shopping cart, orders, and payments — all documented clearly in this report."
        ),
        body(
          "To share this project: send the entire mern-ecommerce folder (or a ZIP file) along with this Word report so the receiver understands what the software is and how to run it."
        ),

        new Paragraph({ spacing: { before: 500 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "— END OF REPORT —", bold: true, size: 26, color: "4F46E5" }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [
            new TextRun({
              text: "Document: MERN_Ecommerce_Project_Report.docx",
              size: 20,
              color: "888888",
            }),
          ],
        }),
      ],
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buffer);
console.log("SUCCESS");
console.log(outPath);
