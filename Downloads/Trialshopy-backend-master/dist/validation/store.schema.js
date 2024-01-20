"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeUpdate = exports.storeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const store_model_1 = require("../models/store.model");
const addressDetailsSchema = joi_1.default.object({
    gpslocation: joi_1.default.object({
        longitude: joi_1.default.string().optional(),
        latitude: joi_1.default.string().optional()
    }).optional(),
    addressLine1: joi_1.default.string().optional(),
    townORcity: joi_1.default.string().optional(),
    pinCode: joi_1.default.string().optional(),
    state: joi_1.default.string().optional(),
    country: joi_1.default.string().optional()
}).optional();
exports.storeSchema = joi_1.default.object({
    sellerId: joi_1.default.string().required(),
    gstId: joi_1.default.string().required(),
    storeName: joi_1.default.string().required(),
    storeDescription: joi_1.default.string().required(),
    images: joi_1.default.array().items(joi_1.default.object({
        filename: joi_1.default.string().optional(),
        url: joi_1.default.string().optional()
    })),
    status: joi_1.default.string()
        .valid(...Object.values(store_model_1.StoreStatus))
        .required(),
    categoryList: joi_1.default.array().items(joi_1.default.string()),
    rating: joi_1.default.object({
        count: joi_1.default.number().optional(),
        rating: joi_1.default.string().optional()
    }),
    reviewCount: joi_1.default.number().optional(),
    followers: joi_1.default.object({
        count: joi_1.default.number().optional(),
        followers: joi_1.default.array().items(joi_1.default.string()).optional()
    }),
    openingHours: joi_1.default.object({
        open: joi_1.default.string().optional(),
        close: joi_1.default.string().optional()
    })
});
exports.storeUpdate = joi_1.default.object({
    sellerId: joi_1.default.string().optional(),
    gstId: joi_1.default.string().optional(),
    storeName: joi_1.default.string().optional(),
    storeDescription: joi_1.default.string().optional(),
    images: joi_1.default.array().items(joi_1.default.object({
        filename: joi_1.default.string().optional(),
        url: joi_1.default.string().optional()
    })),
    status: joi_1.default.string()
        .valid(...Object.values(store_model_1.StoreStatus))
        .optional(),
    categoryList: joi_1.default.array().items(joi_1.default.string().optional()),
    rating: joi_1.default.object({
        count: joi_1.default.number().optional(),
        rating: joi_1.default.string().optional()
    }),
    reviewCount: joi_1.default.number().optional(),
    followers: joi_1.default.object({
        count: joi_1.default.number().optional(),
        followers: joi_1.default.array().items(joi_1.default.string()).optional()
    }),
    openingHours: joi_1.default.object({
        open: joi_1.default.string().optional(),
        close: joi_1.default.string().optional()
    })
});
//# sourceMappingURL=store.schema.js.map