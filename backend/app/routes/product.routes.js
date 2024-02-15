const express = require("express");

const router = express.Router();

//controller
const controller = require("../controllers/product.controller");

router.get("/", controller.listAllProducts);
router.get("/:id", controller.listSingleProduct);
router.post("/new", controller.createNewProduct);
router.patch("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);
router.post("/cart", controller.addToCart);
router.get("/api/cart", controller.showCart);

module.exports = router;
