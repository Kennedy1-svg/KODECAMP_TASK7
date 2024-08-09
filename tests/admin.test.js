const app = require("../bin/www");
const mongoose = require("mongoose");
const request = require("supertest");
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")

beforeAll(async () => {
  await userModel.deleteMany({role: 'admin'});
  await productModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  app.close();
});

let adminToken = ""
let secondProductId = ""


describe("This is to test all the admin endpoints", () => {
  test("Register an admin", async () => {
    const response = await request(app)
    .post("/auth/register")
    .send({
      fullName: "Mohammed Kennedy",
      email: "adenuga@gmail.com",
      role: "admin",
      password: "kenny",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User added successfully");
    
  });

  test("Login as admin", async () => {
    const response = await request(app)
    .post("/auth/login")
    .send({
      email: "adenuga@gmail.com",
      password: "kenny",
    });

    adminToken = response.body.userToken;

    expect(response.status).toBe(201);
    expect(response.body.userDetails).toBeTruthy();
    expect(response.body.userToken).toBeTruthy();
    expect(response.body.message).toBe("Logged in successfully");
    expect(response.body.userDetails.role).toBe("admin");
  });

  test("Add a product", async () => {
    const response = await request(app)
      .post("/admin/add-product")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Tables",
        description: "Buy your best tables here",
        price: 6000,
      });


    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Product added successfully");
  });


  test("Add a second product", async () => {
    const response = await request(app)
      .post("/admin/add-product")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Chairs",
        description: "Buy your best chairs here easily",
        price: 8000,
      });

    if (response.status === 201) {
      secondProductId = response.body.newProduct._id;
    }


    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Product added successfully");
    expect(response.body.newProduct).toBeTruthy();
  });

  test("Edit the second product", async () => {
    const response = await request(app)
      .put("/admin/product/" + secondProductId)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Yam",
        description: "Tubers for 50",
        price: 2000
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Edit successful");
  });

  test("Delete the second product", async () => {
    const response = await request(app)
      .delete("/admin/product/" + secondProductId)
      .set("Authorization", `Bearer ${adminToken}`)

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Product has been deleted successfully");
  });
});
