import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgetPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import JWT from "jsonwebtoken";
//route object
const router = express.Router();

//routing
//Register || method POST
router.post("/register", registerController);

//LOGIN POST
router.post("/login", loginController);

//FORGET PASSWORD  || post
router.post("/forget-password", forgetPasswordController);

//test
router.get("/test", requireSignIn, isAdmin, testController);

//protected user routes
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin routes
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get('/orders',requireSignIn,getOrdersController)

//All orders
router.get('/all-orders',requireSignIn, isAdmin ,getAllOrdersController)

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
export default router;
