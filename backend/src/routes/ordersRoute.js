import express from 'express';
import { placeOrder, verifyOrder } from '../controllers/orderController.js';

const router  = express.Router();

router.post("/place", placeOrder);
router.post("/verify", verifyOrder);

export default router ;