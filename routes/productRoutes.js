import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productFiltersController, productListController, productPhotoController, productCountController, updateProductController, searchProductController, relatedProductController, productCategoryController, braintreeTokenController, brainTreePaymentController } from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get routes
router.get('/products',getProductController)

//single product
router.get("/products/:slug",getSingleProductController)

//get photo
router.get('/product-photo/:pid',productPhotoController)

//update product
router.put('/products/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

//delete product
router.delete('/products/:pid',deleteProductController)

//filter product
router.post('/product-filters',productFiltersController)

//product count
router.get('/product-count',productCountController)

//product per page
router.get('/product-list/:page',productListController)

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid",relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payment routes
//token
router.get('/braintree/token',braintreeTokenController);

//payment
router.post('/braintree/payment',requireSignIn,brainTreePaymentController)

export default router;
