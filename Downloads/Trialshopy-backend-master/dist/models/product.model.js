"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productDetails = exports.productStatus = void 0;
const mongoose_1 = require("mongoose");
const store_model_1 = __importDefault(require("./store.model"));
const brand_model_1 = __importDefault(require("./brand.model"));
const category_model_1 = __importDefault(require("./category.model"));
const seller_model_1 = __importDefault(require("./seller.model"));
var productStatus;
(function (productStatus) {
    productStatus["active"] = "active";
    productStatus["inactive"] = "inactive";
})(productStatus || (exports.productStatus = productStatus = {}));
exports.productDetails = new mongoose_1.Schema({
    //basic info
    // gstId: { type: String, required: true },
    // input from seller
    storeId: { type: mongoose_1.Schema.Types.ObjectId, ref: store_model_1.default, required: false },
    categories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: category_model_1.default,
            required: false
        }
    ],
    brandId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: brand_model_1.default,
        required: false
    },
    sellerId: { type: mongoose_1.Schema.Types.ObjectId, ref: seller_model_1.default, required: false },
    productName: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: false },
    status: { type: String, required: true, enum: Object.values(productStatus), default: productStatus.active },
    tags: [{ type: String, required: false }],
    manufacturer: { type: String, required: false },
    // pricing and shipping
    price: { type: Number, required: true, min: 0 },
    isDiscount: { type: Boolean, required: false, default: true },
    images: [
        {
            filename: { type: String, required: false },
            url: { type: String, required: false },
            color: { type: String, required: false },
        }
    ],
    discount: { type: Number, required: false, default: 0 },
    inStock: { type: Boolean, default: true },
    stock: { type: Number, required: false, default: 1 },
    features: [{ type: String, required: false }],
    // attribute depends on product type, will define new model- ProductType
    attributes: [
        {
            title: { type: String, required: false },
            value: { type: String, required: false }
        }
    ],
    // colors: [{ type: String, required: false }],
    sizes: [{
            type: String,
            enum: ['S', 'M', 'L', 'XL', 'XXL'],
            required: false
        }],
    specifications: [
        {
            title: { type: String, required: false },
            value: { type: String, required: false }
        }
    ],
    // not required
    weight: { type: String, required: false },
    height: { type: String, required: false },
    length: { type: String, required: false },
    width: { type: String, required: false },
    dimensions: { type: String, required: false },
    publisher: { type: String, required: false },
    language: { type: String, required: false },
    // *managed by trialshopy business logic
    shippingCharge: { type: Number, required: false, min: 0, default: 0 },
    //* manage by developer
    //seo
    metaTitle: { type: String, required: false },
    metaKeywords: [{ type: String, required: false }],
    metaDescription: { type: String, required: false },
    //rating
    rating: {
        count: { type: Number, required: false },
        rating: { type: String, required: false }
    },
    isNewWeekly: {
        type: Boolean,
        default: false,
    }
});
exports.productDetails.index({ productName: "text", shortDescription: "text" });
const Product = (0, mongoose_1.model)("product", exports.productDetails);
exports.default = Product;
//# sourceMappingURL=product.model.js.map