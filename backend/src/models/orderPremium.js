import mongoose from "mongoose";

const orderPremium = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    months: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
    },
    expiredAt: {
        type: Date,
        default: null,
    },
    payment: {
        type: Boolean,
        default: false,
    }
},
    { timestamps: true }
);

const orderModel = mongoose.model.order || mongoose.model("order", orderPremium);

export default orderModel;
