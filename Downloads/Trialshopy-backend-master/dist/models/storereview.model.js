"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_model_1 = __importDefault(require("./user.model"));
const store_model_1 = __importDefault(require("./store.model"));
const storeReviewSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: user_model_1.default, required: true, unique: true },
    storeId: { type: mongoose_1.Schema.Types.ObjectId, ref: store_model_1.default, required: true },
    reviewText: { type: String, required: true },
    rating: { type: Number, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});
const StoreReview = (0, mongoose_1.model)('StoreReview', storeReviewSchema);
exports.default = StoreReview;
//# sourceMappingURL=storeReview.model.js.map