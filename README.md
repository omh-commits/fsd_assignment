# Leafy Village v2

An online shop for plants and gardening tools ("like Amazon for gardeners").
This is a rewrite of the original Flask project:

| Part | Before | Now |
|---|---|---|
| Frontend | Jinja templates + Bootstrap + jQuery | React 18 (function components + hooks), plain CSS |
| Backend | Python / Flask (3 separate apps) | Node.js / Express (one server) |
| Database | MySQL through SQLAlchemy | MySQL through `mysql2` |
| Payment | Razorpay (UPI, cards, ...) | Cash on Delivery or Card (demo). **No UPI.** |

## Folder structure

```
leafy-village-v2/
├── client/            React app (Vite)
│   └── src/
│       ├── pages/       the 6 pages
│       ├── components/  header, footer, product card, ...
│       └── styles.css   all the CSS (hand-written, responsive)
├── server/            Express API
│   ├── routes/          one file per feature (products, cart, orders, ...)
│   ├── middleware/      "must be logged in" checks
│   └── public/images/   product pictures (from the original project)
├── database/
│   ├── schema.sql       creates the database and tables
│   └── seed.sql         72 sample products
├── render.yaml        settings for free hosting on Render
├── README.md
└── CLEANUP_REPORT.md  audit of the original files + what was left out and why
```

## The 6 pages

| Page | Address | What it does |
|---|---|---|
| Shop | `/` | All products, category menu, search, sort by price or name |
| Product | `/product/:id` | Details, steps to grow, add to cart |
| Cart | `/cart` | Items, totals, remove items (login needed) |
| Checkout | `/checkout` | Address + payment, then the order confirmation (login needed) |
| Account | `/account` | Login / register, or your profile and order history |
| Contact | `/contact` | Contact form; messages are saved in the `messages` table |

Guests can browse the Shop, Product and Contact pages. Cart, Checkout and Account need a login.

## Requirements

- **Node.js 18 or newer** (tested with Node 24)
- **MySQL 5.7+ or MariaDB 10.4+**. The easy way on Windows is **XAMPP** (tested with XAMPP's MariaDB 10.4).

## Setup

### 1. Start MySQL

Open the XAMPP Control Panel and click **Start** next to **MySQL**.

### 2. Create the database

Open a terminal in the `leafy-village-v2` folder and run:

```bash
C:\xampp\mysql\bin\mysql.exe -u root -e "source database/schema.sql"
```

```bash
C:\xampp\mysql\bin\mysql.exe -u root -e "source database/seed.sql"
```

(If MySQL is on your PATH you can type just `mysql`. If your root user has a password, add `-p`.
You can also import the two files in phpMyAdmin: first `schema.sql`, then `seed.sql`.)

Running `schema.sql` again wipes all data and starts fresh.

### 3. Start the server

```bash
cd server
```

```bash
npm install
```

```bash
npm start
```

You should see `Server running on http://localhost:5000` and `Connected to MySQL database: leafy_village`.

The default settings match a fresh XAMPP install (host `localhost`, port `3306`, user `root`, no password,
database `leafy_village`). To change them, copy `server/.env.example` to `server/.env` and edit it.

### 4. Start the React app (in a second terminal)

```bash
cd client
```

```bash
npm install
```

```bash
npm run dev
```

Open **http://localhost:5173**. Vite forwards `/api` and `/images` to the Express server on port 5000.

### Optional: run everything from one server

```bash
cd client
```

```bash
npm run build
```

Then restart the server (`npm start` in `server/`) and open **http://localhost:5000**. Express serves the built React app too.

## How an order updates the database

`POST /api/place_order` runs one MySQL transaction that:

1. reads the cart and locks those rows,
2. checks that there is enough stock,
3. inserts a row into `orders`,
4. inserts one row per product into `order_items` (with the price at that moment),
5. lowers `stock_quantity` in `products`,
6. empties the user's cart.

If any step fails, everything is rolled back.

**Payment:** UPI was removed. Cash on Delivery orders are saved with payment status `Pending`.
Card is a demo: the browser checks the card format and only the last 4 digits are sent to and saved by the server.
No money is taken.

## API routes

Shop (used by the React pages):

| Method | Route | Login? | Was (Flask) |
|---|---|---|---|
| POST | `/api/register` | no | `/register` |
| POST | `/api/login` | no | `/login` |
| GET | `/api/logout` | no | `/logout` |
| GET | `/api/me` | no | (new: tells React who is logged in) |
| GET | `/api/products?category=&subcategory=&search=&sort_by=` | no | `/products` |
| GET | `/api/products/:category/:subcategory?sort_by=` | no | `/products/<category>/<subcategory>` |
| GET | `/api/product/:product_id` | no | `/product/<id>` |
| POST | `/api/add_to_cart` | yes | `/add_to_cart` |
| GET | `/api/cart` | yes | `/cart` |
| POST | `/api/remove_from_cart/:product_id` | yes | `/remove_from_cart/<id>` |
| POST | `/api/place_order` | yes | `/payment` + `/payment_success` + `/place_order` |
| GET | `/api/order_confirmation/:order_id` | yes | `/order_confirmation` |
| GET | `/api/my_orders` | yes | (new: order history) |
| GET / POST | `/api/my_account` | yes | `/my_account` (POST accepts a `profile_picture` file) |
| GET | `/api/profile_picture` | yes | (new: your own picture, stored in MySQL) |
| POST | `/api/contact` | no | `/contact` |

`sort_by` can be `price_low_to_high`, `price_high_to_low`, `name_a_to_z` or `name_z_to_a`.

Admin routes (from the old `admin_app` and `headadmin_app`). They have no pages, so test them with Postman,
Thunder Client or curl:

| Method | Route | Login? |
|---|---|---|
| POST | `/api/subadmin/register`, `/api/subadmin/login` | no |
| GET | `/api/subadmin/dashboard`, `/manage_products`, `/view_messages`, `/orders`, `/logout` | sub-admin |
| POST | `/api/subadmin/add_product`, `/update_product/:id`, `/delete_product/:id` | sub-admin |
| POST | `/api/headadmin/register`, `/api/headadmin/login` | no |
| GET | `/api/headadmin/dashboard`, `/users`, `/subadmins`, `/logout` | head admin |

## Changes from the original on purpose

- Passwords are hashed with bcrypt everywhere. The old head-admin app stored them as plain text.
- Sub-admin product routes now need a sub-admin login. In the Flask app anyone could call them.
- Adding to the cart checks the stock, and checkout checks it again.
- The cart is linked by `user_id` instead of `username`.
- Razorpay, the hard-coded Razorpay keys and UPI are gone.
- The old About, FAQ, blog and policy pages were not carried over. The Contact page replaces the old `contact_us.html`.
- Profile pictures are shrunk to 300 px in the browser and saved inside MySQL instead of a folder,
  so they survive restarts on free hosting.
- Logins are saved in a MySQL `sessions` table (created automatically), so a server restart does not log people out.

## Deploy it online for free (Render + Aiven)

The site runs on **Render** (free web service) and the database on **Aiven** (free MySQL). Both are free with no
time limit. The only catch: Render puts a free site to sleep after 15 minutes without visitors, so the first visit
after that takes about a minute to load.

1. **Put the code on GitHub.** Create a repository and push this folder to it (`node_modules` and `.env` are ignored).
2. **Create the database on Aiven** (aiven.io, free plan, no credit card):
   create a **MySQL** service on the **Free** plan. When it is running, open it and copy two things from the
   *Connection information* box:
   - the **Service URI** (starts with `mysql://avnadmin:...`)
   - the **CA certificate** (click *Show*, copy all the text including the BEGIN/END lines)
3. **Create the website on Render** (render.com, sign in with GitHub):
   *New* → *Blueprint* → choose your repository. Render reads `render.yaml` and asks for two values:
   - `DATABASE_URL` = the Aiven Service URI
   - `DB_CA_CERT` = the Aiven CA certificate text

   Click *Apply*. The first build takes a few minutes.
4. **Open the link** Render shows (`https://leafy-village-xxxx.onrender.com`). On the first start the server
   creates all the tables and the 72 sample products in the Aiven database by itself.

To reset the online database later, run `npm run db:setup` in `server/` with `DATABASE_URL` and `DB_CA_CERT`
set in `server/.env` (this deletes all data).

## Troubleshooting

- **`Could not connect to MySQL`**: MySQL is not running, or the values in `server/.env` are wrong.
- **`Table 'leafy_village.products' doesn't exist`**: run `database/schema.sql` and `database/seed.sql` (step 2).
- **Pictures don't show in the React app**: the Express server must be running on port 5000.
- **Port 5000 or 5173 already in use**: change `PORT` in `server/.env` (and the proxy target in
  `client/vite.config.js`), or stop the other program.
