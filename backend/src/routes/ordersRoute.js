import express from 'express';
import { getAllOrders, placeOrder, verifyOrder } from '../controllers/orderController.js';

const router  = express.Router();

router.post("/place", placeOrder);
router.post("/verify", verifyOrder);
router.get("/", getAllOrders)

export default router ;