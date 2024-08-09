const app = require("../bin/www.js");
const mongoose = require("mongoose");
const request = require("supertest");
const userModel = require("../models/userModel.js");
const orderModel = require("../models/orderModel.js");
const productModel = require("../models/productModel.js");

beforeAll(async () => {
  await userModel.deleteMany({ role: "customer" });
  await orderModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  app.close();
});

let customerToken = ''
let productId = '';


describe("This is to test all customer endpoints",() => {
  test("Register a customer", async () => {
    const response = await request(app).post("/auth/register").send({
      fullName: "Gift",
      email: "ekpe@gmail.com",
      password: "kennyekpe"
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User added successfully");
  });

  test("Login as customer", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "ekpe@gmail.com",
      password: "kennyekpe"
    });

    customerToken = response.body.userToken;

    expect(response.status).toBe(201);
    expect(response.body.userDetails).toBeTruthy();
    expect(response.body.userToken).toBeTruthy();
    expect(response.body.message).toBe("Logged in successfully");
    expect(response.body.userDetails.role).toBe("customer");
  });

  test("View all products", async () => {
   const response = await request(app)
     .get("/customer/product/1/10")
     .set("Authorization", `Bearer ${customerToken}`);

     productId = response.body.allProducts.docs[0]._id
     

    expect(response.status).toBe(200);
    expect(response.body.allProducts).toBeTruthy();
    expect(typeof response.body.allProducts).toBe("object");
  });

  test("View a single product", async () => {
   const response = await request(app)
     .get("/customer/product/" + productId)
     .set("Authorization", `Bearer ${customerToken}`);
     

    expect(response.status).toBe(200);
    expect(response.body.product).toBeTruthy();
  });

  test("Order Creation", async () => {
    const response = await request(app)
      .post("/customer/order")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        order: [
          {
            productId: "66b66379f919e3efe102355f",
            quantity: 2,
            totalCost: 8000,
          },
          {
            productId: "66af6b8abc5c94c8338e7237",
            quantity: 1,
            totalCost: 5000,
          },
        ],
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Order created successfully. Proceed to checkout"
    );
  });

  test("Checkout", async () => {
    const response = await request(app)
      .post("/customer/checkout")
      .set("Authorization", `Bearer ${customerToken}`)
      
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Order checked out. Thanks for shopping with us"
    );
  });

});
