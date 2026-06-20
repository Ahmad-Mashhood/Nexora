# MERN E-Commerce Store

Multi-vendor marketplace: **buyers** shop and pay, **sellers** list products and receive payments, **admins** oversee the platform.

## Roles

| Role | Login | Capabilities |
|------|-------|----------------|
| **Buyer** | Register as "Buy products" | Browse, cart, checkout, pay sellers |
| **Seller** | Register as "Sell products" | Add/edit/delete own products, view sales & earnings |
| **Admin** | Seeded account | Manage all products & orders |

## Demo accounts (after `npm run seed`)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@shop.com | admin123 |
| Seller | seller@shop.com | seller123 |
| Seller 2 | seller2@shop.com | seller123 |
| Buyer | buyer@shop.com | buyer123 |

## Local product images (offline)

Product photos are in `pictures/` (source) and served from `frontend/public/images/`.

After adding new images, copy them to `frontend/public/images/` and use paths like `/images/filename.jpg` in product listings. Run `npm run seed` in backend to reload demo products.

## Setup

### Backend
```bash
cd backend
copy .env.example .env
npm install
npm run seed
npm run dev
```

### Frontend
```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

- API: http://localhost:5000  
- App: http://localhost:3000  

## Payment flow (demo)

1. **Buyer** adds products to cart and checks out.
2. **Cash on Delivery** — payments stay `pending`; buyer pays on **Payments** page with a demo card number.
3. **Credit Card (demo)** — payments are marked `paid` instantly; sellers see earnings on **Earnings**.

## API highlights

- `POST /api/auth/register` — body: `{ name, email, password, role: "buyer"|"seller", storeName? }`
- `GET /api/products/mine` — seller's products
- `POST /api/products` — seller or admin creates product
- `POST /api/orders` — buyer places order
- `GET /api/payments/my` — buyer payments
- `PUT /api/payments/:id/pay` — buyer pays (demo card)
- `GET /api/payments/seller` — seller earnings
- `GET /api/orders/seller` — seller sales
