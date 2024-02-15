const {
  successResponse,
  successfullyCreatedResponse,
  badRequestResponse,
  notFoundResponse,
  serverErrorResponse,
  unauthorizedResponse,
} = require("../utils/responses");

// Model
const ProductModel = require("../models/product.model");
const CartModel = require("../models/cart.model");

const showCart = async (req, res) => {
  try {
    const cartItems = await CartModel.find().populate("productId").lean();
    return successResponse(res, cartItems);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addToCart = async (req, res) => {
  try {
    console.log(req.body.id);
    const product_id = req.body.id;
    console.log(product_id);
    const cartExist = Cart.find({
      productId: product_id,
    });
    const product = Product.findOne({
      _id: product_id,
    });
    if (cartExist) {
      if (product.quantity > 0) {
        product.quantity -= 1;
        product.save();
        cartExist.quantity += 1;
        cartExist.save();
        res.status(200).json(cartExist);
      }
      res.status(500).json({ error: "Not enough quantity" });
    } else {
      const cartItem = new Cart({ product_id, quantity: 1 });
      await cartItem.save();
      product.quantity -= 1;
      product.save();
      res.status(201).json(cartItem);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createNewProduct = async (req, res) => {
  try {
    const { name, details, price, stock, photo } = req.body;
    const product = new ProductModel({ name, photo, details, price, stock });
    const newProduct = await product.save();

    return successfullyCreatedResponse(
      res,
      newProduct._id,
      "Product Created Successfully."
    );
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, "Server Error");
  }
};

const listAllProducts = async (req, res) => {
  try {
    const allProducts = await ProductModel.find().lean();
    return successResponse(res, allProducts);
  } catch (error) {
    return serverErrorResponse(res, "Server Error");
  }
};

const listSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return badRequestResponse(res, "Provide Product Id");
    }
    const singleProduct = await ProductModel.findOne({ _id: id }).lean();
    return successResponse(res, singleProduct);
  } catch (error) {
    return serverErrorResponse(res, "Server Error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return badRequestResponse(res, "Provide Product Id");
    }
    const deleteProduct = await ProductModel.findByIdAndDelete(id);
    if (!deleteProduct) {
      return badRequestResponse(res, "Product does not exist");
    }
    return successResponse(res, deleteProduct, "Product Deleted .");
  } catch (error) {
    return serverErrorResponse(res, "Server Error");
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return badRequestResponse(res, "Please Provide Product Id");
    }

    // const { value, error } = CreateNewValidationSchema.validate(req.body);
    // if (error) {
    //   return badRequestResponse(res, error?.details[0]?.message);
    // }

    // const updateProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
    //   new: true,
    // });
    const updateProduct = await ProductModel.findOne({ _id: id });
    if (!updateProduct) {
      return badRequestResponse(res, "Product does not exist");
    }
    updateProduct.name = req.body.name;
    console.log(updateProduct);
    updateProduct.save();
    return successResponse(
      res,
      { _id: updateProduct._id, name: updateProduct.name },
      "Product Updated Successfully."
    );
  } catch (error) {
    return serverErrorResponse(res, "Server Error");
  }
};

module.exports = {
  createNewProduct,
  listAllProducts,
  listSingleProduct,
  deleteProduct,
  updateProduct,
  addToCart,
  showCart,
};
