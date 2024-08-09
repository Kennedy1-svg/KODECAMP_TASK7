var express = require("express");
var router = express.Router();
const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const verifyAuth = require("../middlewares/verifyAuthentication");
const rolesAllowed = require("../middlewares/rolesAllowed");


router.use(verifyAuth);
router.use(rolesAllowed(['customer']));


router.get("/product/:page/:limit", async (req, res, next) => { //views all products
  const { page, limit } = req.params;

  const allProducts = await productModel.paginate({}, { page, limit });

  res.status(200).send({
    allProducts,
  });
});

router.get("/product/:id", async (req, res, next) => { //views single product
  const { id } = req.params;

  const product = await productModel.findById(id);

  res.status(200).send({
    product
  });
});

router.post("/order", async (req, res, next) => { 
  const orderCreated = await orderModel.create({
    order: req.body.order,
    user: req.userDetails.userId,
  });
  console.log('order created', orderCreated)
  res.send({
    message : "Order created successfully. Proceed to checkout"
  });
});


router.post("/checkout", async (req, res, next) => { //checks out 
  const productsToCheckOut = await orderModel.find({user: req.userDetails.userId});
  console.log("order created by user", productsToCheckOut);
  await orderModel.deleteMany({ user: req.userDetails.userId });
  res.send({
    message: "Order checked out. Thanks for shopping with us"
  });
});



module.exports = router;
