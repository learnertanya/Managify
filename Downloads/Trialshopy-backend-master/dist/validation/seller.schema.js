"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerUpdateSchema = exports.sellerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const seller_model_1 = require("../models/seller.model");
exports.sellerSchema = joi_1.default.object({
    access_level: joi_1.default.string()
        .valid(...Object.values(seller_model_1.level))
        .required(),
    role: joi_1.default.string()
        .valid(...Object.values(seller_model_1.roleType))
        .required(),
    phone_number: joi_1.default.string().optional(),
    email: joi_1.default.string().optional(),
    name: joi_1.default.string().optional(),
    password: joi_1.default.string().optional(),
    profilePic: joi_1.default.string().optional(),
    gstId: joi_1.default.string().required(),
    status: joi_1.default.string().valid("active", "inactive").default("active").optional(),
    language: joi_1.default.array().items(joi_1.default.string()).optional(),
    document: joi_1.default.array()
        .items(joi_1.default.object({
        name: joi_1.default.string().optional(),
        url: joi_1.default.string().optional()
    }))
        .optional()
});
exports.sellerUpdateSchema = joi_1.default.object({
    access_level: joi_1.default.string()
        .valid(...Object.values(seller_model_1.level))
        .required(),
    role: joi_1.default.string()
        .valid(...Object.values(seller_model_1.roleType))
        .required(),
    phone_number: joi_1.default.string().optional(),
    email: joi_1.default.string().optional(),
    name: joi_1.default.string().optional(),
    password: joi_1.default.string().optional(),
    profilePic: joi_1.default.string().optional(),
    language: joi_1.default.array().items(joi_1.default.string()).optional(),
    status: joi_1.default.string().valid("active", "inactive").optional(),
    document: joi_1.default.array()
        .items(joi_1.default.object({
        name: joi_1.default.string().optional(),
        url: joi_1.default.string().optional()
    }))
        .optional()
});
//# sourceMappingURL=seller.schema.js.map