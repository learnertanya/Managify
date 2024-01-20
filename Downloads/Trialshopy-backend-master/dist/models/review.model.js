"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_model_1 = __importDefault(require("./user.model"));
const product_model_1 = __importDefault(require("./product.model"));
const reviewSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: user_model_1.default, required: true, unique: true },
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: product_model_1.default, required: true },
    reviewText: { type: String, required: true },
    pictures: [
        {
            filename: { type: String, required: false },
            url: { type: String, required: false }
        }
    ],
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: user_model_1.default }],
    dislikes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: user_model_1.default }],
    rating: { type: Number, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" }
});
const Review = (0, mongoose_1.model)("Review", reviewSchema);
exports.default = Review;
//# sourceMappingURL=review.model.js.map