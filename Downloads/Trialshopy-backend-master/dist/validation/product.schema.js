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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productUpdate = exports.productDetails = exports.ProductStatus = void 0;
const Joi = __importStar(require("joi"));
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["active"] = "active";
    ProductStatus["inactive"] = "inactive";
})(ProductStatus || (exports.ProductStatus = ProductStatus = {}));
exports.productDetails = Joi.object({
    gstId: Joi.string().required(),
    storeId: Joi.string().optional(),
    categoryId: Joi.array().items(Joi.string().optional()).optional(),
    brandId: Joi.string().optional(),
    sellerId: Joi.string().optional(),
    productName: Joi.string().required(),
    shortDescription: Joi.string().required(),
    fullDescription: Joi.string().optional(),
    status: Joi.string()
        .valid(...Object.values(ProductStatus))
        .required(),
    category: Joi.array().items(Joi.string().optional()).optional(),
    subcategory: Joi.array().items(Joi.string().optional()).optional(),
    tags: Joi.array().items(Joi.string().optional()).optional(),
    manufacturer: Joi.string().optional(),
    price: Joi.number().min(0).required(),
    isDiscount: Joi.boolean().optional().default(true),
    shippingCharge: Joi.number().min(0).optional().default(0),
    images: Joi.array()
        .items(Joi.object({
        filename: Joi.string().optional(),
        url: Joi.string().optional()
    }))
        .optional(),
    discount: Joi.number().optional().default(0),
    inStock: Joi.boolean().optional().default(true),
    stock: Joi.number().optional(),
    features: Joi.array().items(Joi.string().optional()).optional(),
    metaTitle: Joi.string().optional(),
    metaKeywords: Joi.array().items(Joi.string().optional()).optional(),
    metaDescription: Joi.string().optional(),
    rating: Joi.object({
        count: Joi.number().optional(),
        rating: Joi.string().optional()
    }).optional(),
    attributes: Joi.array().items(Joi.string().optional()).optional(),
    specifications: Joi.array().items(Joi.object({
        title: Joi.string(),
        value: Joi.string()
    })),
    weight: Joi.string().optional(),
    height: Joi.string().optional(),
    length: Joi.string().optional(),
    width: Joi.string().optional(),
    dimensions: Joi.string().optional(),
    publisher: Joi.string().optional(),
    language: Joi.string().optional()
});
exports.productUpdate = Joi.object({
    categoryId: Joi.array().items(Joi.string().optional()).optional(),
    storeId: Joi.string().optional(),
    sellerId: Joi.string().optional(),
    brandId: Joi.string().optional(),
    productName: Joi.string().required(),
    shortDescription: Joi.string().required(),
    fullDescription: Joi.string().optional(),
    status: Joi.string()
        .valid(...Object.values(ProductStatus))
        .required(),
    category: Joi.array().items(Joi.string().optional()).optional(),
    subcategory: Joi.array().items(Joi.string().optional()).optional(),
    tags: Joi.array().items(Joi.string().optional()).optional(),
    manufacturer: Joi.string().optional(),
    price: Joi.number().min(0).required(),
    isDiscount: Joi.boolean().optional().default(true),
    shippingCharge: Joi.number().min(0).optional().default(0),
    images: Joi.array()
        .items(Joi.object({
        filename: Joi.string().optional(),
        url: Joi.string().optional()
    }))
        .optional(),
    discount: Joi.number().optional().default(0),
    inStock: Joi.boolean().optional().default(true),
    stock: Joi.number().optional(),
    features: Joi.array().items(Joi.string().optional()).optional(),
    metaTitle: Joi.string().optional(),
    metaKeywords: Joi.array().items(Joi.string().optional()).optional(),
    metaDescription: Joi.string().optional(),
    rating: Joi.object({
        count: Joi.number().optional(),
        rating: Joi.string().optional()
    }).optional(),
    attributes: Joi.array().items(Joi.string().optional()).optional(),
    specifications: Joi.array().items(Joi.object({
        title: Joi.string(),
        value: Joi.string()
    })),
    weight: Joi.string().optional(),
    height: Joi.string().optional(),
    length: Joi.string().optional(),
    width: Joi.string().optional(),
    dimensions: Joi.string().optional(),
    publisher: Joi.string().optional(),
    language: Joi.string().optional()
});
//# sourceMappingURL=product.schema.js.map