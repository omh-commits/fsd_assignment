-- ============================================================
-- Leafy Village v2 - database schema (MySQL 5.7+ / MariaDB 10.4+)
-- Run this first, then seed.sql
--   mysql -u root -p < database/schema.sql
-- WARNING: this drops and recreates every table.
-- ============================================================

CREATE DATABASE IF NOT EXISTS leafy_village
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE leafy_village;

-- Drop in reverse order of the foreign keys
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS subadmins;
DROP TABLE IF EXISTS headadmins;

-- ------------------------------------------------------------
-- Shoppers (was the "user" table in the Flask app)
-- ------------------------------------------------------------
CREATE TABLE users (
  user_id         INT AUTO_INCREMENT PRIMARY KEY,
  username        VARCHAR(255) NOT NULL UNIQUE,
  password        VARCHAR(255) NOT NULL,            -- bcrypt hash, never plain text
  email           VARCHAR(255) NOT NULL UNIQUE,
  phone           VARCHAR(15)  NULL UNIQUE,
  first_name      VARCHAR(100) NULL,
  last_name       VARCHAR(100) NULL,
  gender          ENUM('Male', 'Female') NULL,
  profile_picture VARCHAR(255) NULL,                -- e.g. /api/profile_picture?v=1699999 (null = no picture)
  picture_data    MEDIUMBLOB NULL,                  -- the picture itself (kept in the database, not on disk)
  picture_type    VARCHAR(50) NULL,                 -- e.g. image/jpeg
  address         TEXT NULL,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Products (plants, care items and eco-friendly items)
-- ------------------------------------------------------------
CREATE TABLE products (
  product_id     INT AUTO_INCREMENT PRIMARY KEY,
  product_name   VARCHAR(255)   NOT NULL,
  description    TEXT           NOT NULL,
  price          DECIMAL(10, 2) NOT NULL,
  stock_quantity INT            NOT NULL DEFAULT 0,
  category       VARCHAR(100)   NOT NULL,           -- Plants | Care | Eco-Friendly
  subcategory    VARCHAR(100)   NOT NULL,           -- Indoor, Outdoor, Seeds, ...
  image_url      VARCHAR(255)   NOT NULL,           -- e.g. /images/31.jpg
  steps_to_grow  TEXT           NULL
);

-- ------------------------------------------------------------
-- Shopping cart: one row per user + product
-- ------------------------------------------------------------
CREATE TABLE cart (
  cart_id    INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL,
  product_id INT NOT NULL,
  quantity   INT NOT NULL DEFAULT 1,
  UNIQUE KEY one_row_per_product (user_id, product_id),
  FOREIGN KEY (user_id)    REFERENCES users(user_id)       ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Orders: one row per checkout
-- UPI was removed: only Cash on Delivery and Card are allowed
-- ------------------------------------------------------------
CREATE TABLE orders (
  order_id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id          INT NOT NULL,
  total_price      DECIMAL(10, 2) NOT NULL,
  shipping_address TEXT NOT NULL,
  payment_method   ENUM('Cash on Delivery', 'Card') NOT NULL,
  card_last4       CHAR(4) NULL,                    -- only the last 4 digits are kept
  payment_status   ENUM('Pending', 'Complete', 'Failed') NOT NULL DEFAULT 'Pending',
  order_status     ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'Pending',
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- ------------------------------------------------------------
-- Order items: the products inside each order
-- price = the product price at the moment the order was placed
-- ------------------------------------------------------------
CREATE TABLE order_items (
  order_item_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id      INT NOT NULL,
  product_id    INT NOT NULL,
  quantity      INT NOT NULL,
  price         DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id)   REFERENCES orders(order_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- ------------------------------------------------------------
-- Contact messages (POST /api/contact)
-- ------------------------------------------------------------
CREATE TABLE messages (
  message_id   INT AUTO_INCREMENT PRIMARY KEY,
  user_name    VARCHAR(100) NOT NULL,
  user_email   VARCHAR(150) NOT NULL,
  user_message TEXT NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Sub-admins (manage products, read messages, see orders)
-- ------------------------------------------------------------
CREATE TABLE subadmins (
  subadmin_id INT AUTO_INCREMENT PRIMARY KEY,
  username    VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL
);

-- ------------------------------------------------------------
-- Head admins (see users and sub-admins)
-- ------------------------------------------------------------
CREATE TABLE headadmins (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(80)  NOT NULL,
  email    VARCHAR(120) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
