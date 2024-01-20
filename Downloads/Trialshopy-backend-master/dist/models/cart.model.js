"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartDetails = exports.productCount = exports.level = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = __importDefault(require("./product.model"));
var level;
(function (level) {
    level["one"] = "1";
    level["two"] = "2";
    level["three"] = "3";
})(level || (exports.level = level = {}));
;
var productCount;
(function (productCount) {
    productCount[productCount["one"] = 1] = "one";
    productCount[productCount["two"] = 2] = "two";
    productCount[productCount["three"] = 3] = "three";
    productCount[productCount["four"] = 4] = "four";
    productCount[productCount["five"] = 5] = "five";
})(productCount || (exports.productCount = productCount = {}));
exports.cartDetails = new mongoose_1.Schema({
    // access_level: { type: String, required: true, enum: Object.values(level) },
    // count : {type: Number, required: false, enum: Object.values(productCount), default: ProductCount.One},
    customerId: { type: String, required: true, unique: true },
    items: [
        {
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: product_model_1.default,
                required: false,
            },
            count: {
                type: Number,
                required: false,
                default: 1,
            },
        },
    ],
    document: [{
            name: { type: String, required: false },
            url: { type: String, required: false }
        }]
});
const Cart = (0, mongoose_1.model)("cart", exports.cartDetails);
exports.default = Cart;
//# sourceMappingURL=cart.model.js.map