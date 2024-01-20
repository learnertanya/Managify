"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeDetails = exports.StoreStatus = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const category_model_1 = __importDefault(require("./category.model"));
const seller_model_1 = __importDefault(require("./seller.model"));
const user_model_1 = __importDefault(require("./user.model"));
var StoreStatus;
(function (StoreStatus) {
    StoreStatus["active"] = "active";
    StoreStatus["inactive"] = "inactive";
})(StoreStatus || (exports.StoreStatus = StoreStatus = {}));
exports.storeDetails = new mongoose_1.default.Schema({
    sellerId: { type: mongoose_1.Schema.Types.ObjectId, ref: seller_model_1.default, required: true },
    storeName: { type: String, required: true },
    storeDescription: { type: String },
    gstId: { type: String, required: true, unique: true },
    images: [
        {
            filename: { type: String, required: false },
            url: { type: String, required: false }
        }
    ],
    status: { type: String, required: true, enum: Object.values(StoreStatus), default: StoreStatus.active },
    categories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: category_model_1.default
        }
    ],
    rating: {
        count: { type: Number, required: false },
        rating: { type: String, required: false }
    },
    reviewCount: { type: Number, required: false },
    followers: {
        count: { type: Number, required: false },
        followers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: user_model_1.default, required: false }]
    },
    openingHours: [
        {
            dayOfWeek: { type: String, required: false },
            openTime: { type: String, required: false },
            closeTime: { type: String, required: false }
        }
    ],
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: false
        },
        coordinates: {
            type: [Number],
            required: false
        },
    },
    offers: [
        {
            title: { type: String, required: false },
            description: { type: String, required: false },
            discountPercentage: { type: Number, required: false },
            startDate: { type: Date, required: false },
            endDate: { type: Date, required: false }
        }
    ]
});
const Store = (0, mongoose_1.model)("store", exports.storeDetails);
exports.default = Store;
//# sourceMappingURL=store.model.js.map