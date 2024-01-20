"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
// Import Mongoose
const mongoose_1 = require("mongoose");
const user_model_1 = __importDefault(require("./user.model"));
const product_model_1 = __importDefault(require("./product.model"));
exports.orderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: user_model_1.default,
        required: true
    },
    products: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId, /*Schema.Types.ObjectId,*/
                ref: product_model_1.default,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            orderStatus: {
                type: String,
                enum: ["pending", "processing", "shipped", "delivered"],
                default: "pending"
            },
        }
    ],
    payment: [
        {
            transactionId: {
                type: String,
                required: true
            },
            totalAmount: {
                type: Number,
                required: true
            },
            paymentDate: {
                type: Date,
                default: Date.now
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    phone_number: { type: String, required: true },
    shippingAddress: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered"],
        default: "pending"
    },
    exchangeReturnWindowClosedOn: {
        type: Date,
        required: false
    },
    rateProduct: {
        type: Boolean,
        default: false
    }
});
const Order = (0, mongoose_1.model)("order", exports.orderSchema);
exports.default = Order;
//# sourceMappingURL=order.model.js.map