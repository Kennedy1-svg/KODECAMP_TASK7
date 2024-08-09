# E-Commerce API

## Overview
This project is an E-Commerce API that allows users to register and log in either as an admin or a customer. The API provides functionality for admins to manage products (add, edit, delete, and view products) and for customers to view products, view product details, create orders, and checkout.

## Features
- **User Management**:
  - Register as Admin or Customer.
  - Login for Admin and Customer.

- **Admin Product Management**:
  - Add new products.
  - Edit existing products.
  - Delete products.
  - View all products added by the logged-in admin.

- **Customer Actions**:
  - View all products.
  - View detailed information of a specific product.
  - Create an order.
  - Checkout.

## Technologies Used
- **Node.js**
- **Express.js** (RESTful API Framework)
- **MongoDB** with **Mongoose** (Database and ORM)
- **JWT** (JSON Web Token for authentication)
- **BCrypt** (Password hashing)# E-Commerce API

## Overview
This project is an E-Commerce API that allows users to register and log in either as an admin or a customer. The API provides functionality for admins to manage products (add, edit, delete, and view products) and for customers to view products, view product details, create orders, and checkout.

## Features
- **User Management**:
  - Register as Admin or Customer.
  - Login for Admin and Customer.

- **Admin Product Management**:
  - Add new products.
  - Edit existing products.
  - Delete products.
  - View all products added by the logged-in admin.

- **Customer Actions**:
  - View all products.
  - View detailed information of a specific product.
  - Create an order.
  - Checkout.

## Technologies Used
- **Node.js**
- **Express.js** (RESTful API Framework)
- **MongoDB** with **Mongoose** (Database and ORM)
- **JWT** (JSON Web Token for authentication)
- **BCrypt** (Password hashing)
- **JEST** (Unit Testing)

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Kennedy1-svg/KODECAMP_TASK7.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd KODECAMP_TASK7
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   AUTH_KEY

5. ### User Authentication Actions
- **Registers Users**: `POST auth/register`
  - **Description**: Registers a new user as an admin or a customer

- **Logs in User**: `POST auth/login`
  - **Description**: Logs in the user and returns a JWT token.

6. ### Admin Actions

- **Add Product**: `POST admin/add-product`
  - **Description**: Adds Product.

- **View Product Created by logged-in Admin**: `GET admin/product`
  - **Description**: Returns products created by logged-in admin.

- **Edits Product**: `PUT admin/product/:id`
  - **Description**: edits product creared by logged-in admin.

- **Deletes Product**: `DELETE admin/product/:id`
  - **Description**: delete product creared by logged-in admin.

7. ### Customer Actions
- **View All Products**: `GET customer/product/:page/:limit`
  - **Description**: Returns a list of all available products.

- **View Product Details**: `GET customer/products/:id`
  - **Description**: Returns detailed information of a specific product.

- **Creates Order**: `POST customer/order`
  - **Description**: Enables you to create an order.

- **Checkout**: `POST /customer/checkout`
  - **Description**: Checks out your order and clears your cart.



