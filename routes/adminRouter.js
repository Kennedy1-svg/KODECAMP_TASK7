const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel')
const rolesAllowed = require("../middlewares/rolesAllowed");
const verifyAuth = require("../middlewares/verifyAuthentication");

router.use(verifyAuth);
router.use(rolesAllowed(['admin']));


async function checkBefore(req, res, next) {
  const product = await productModel.findById(req.params.id);

  if (req.userDetails.userId.toString() == product.productOwner.toString()) {
    next();
  } else {
    res.status(401).send({
      message:
        "You can not carry out any action on this because you are not the owner of the product",
    });
  }
}

router.post("/add-product", async (req, res, next) => { // adds product
  const newProduct = await productModel.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    productOwner: req.userDetails.userId,
  });

  res.send({ 
    message: 'Product added successfully'
   });
});

router.put("/product/:id", checkBefore, async (req, res, next) => { //edits product
  const { id } = req.params;

  const {name, price,description} = req.body;

  const editedProduct = await productModel.findByIdAndUpdate(id,{name, price,description}, { new: true });

  res.send({
    message: "Edit successful",
    editedProduct,
  });
});

router.get("/product", async (req, res, next) => { //gets product created by admin
  const products = await productModel.find({productOwner: req.userDetails.userId});
  res.send({ products });
});

router.delete("/product/:id", checkBefore, async (req, res, next) => { //deletes product created by admin
  await productModel.findByIdAndDelete(req.params.id);
  res.send({
    message: "Product has been deleted successfully",
  });
});

module.exports = router;
