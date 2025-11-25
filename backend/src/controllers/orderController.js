
import orderModel from "../models/orderPremium.js";
import User from "../models/User.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//place order
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            months: req.body.months,
            price: req.body.price,
            payment: false
        });

        await newOrder.save();


        const line_items = [
            {
                price_data: {
                    currency: "vnd",
                    product_data: {
                        name: `Gói Premium ${req.body.months} tháng`,
                    },
                    unit_amount: req.body.price,
                },
                quantity: 1
            }
        ];
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.json({ success: true, session_url: session.url })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Có lỗi xảy ra", error });
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        const order = await orderModel.findById(orderId);

        if (success == "true") {
            const user = await User.findById(order.userId);

            if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

            let baseDate = new Date();

            if (user.isPremium && user.isPremium > new Date()) {
                baseDate = new Date(user.isPremium);
            }

            const newExpiration = new Date(baseDate.getTime() + order.months * 30 * 24 * 60 * 60 * 1000);

            await User.findByIdAndUpdate(order.userId, {
                isPremium: newExpiration
            });
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Đã thanh toán" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Chưa thanh toán" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Có lỗi xảy ra", error });
    }
}

export { placeOrder, verifyOrder };