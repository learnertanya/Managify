"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const brandSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    logo: {
        filename: { type: String, required: false },
        url: { type: String, required: false }
    },
    video: {
        filename: { type: String, required: false },
        url: { type: String, required: false }
    },
    categories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "category" }],
    isPopular: { type: Boolean, default: false },
    totalProductsSold: {
        type: Number,
        default: 0
    }
});
const Brand = (0, mongoose_1.model)("brand", brandSchema);
exports.default = Brand;
//# sourceMappingURL=brand.model.js.map