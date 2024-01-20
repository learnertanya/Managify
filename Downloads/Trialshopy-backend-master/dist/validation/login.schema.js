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
exports.updatePassword = exports.login = void 0;
const Joi = __importStar(require("joi"));
exports.login = Joi.object({
    email: Joi.string().min(1).presence("required"),
    password: Joi.string().min(8).required()
});
exports.updatePassword = Joi.object({
    userId: Joi.string().min(1).presence("required"),
    old_password: Joi.string().min(8).required(),
    new_password: Joi.string().min(8).required()
});
const orderCreateValidationSchema = Joi.object({
    userId: Joi.string().required(),
    products: Joi.array().items(Joi.object({
        product: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required()
    })),
    totalPrice: Joi.number().required(),
    shippingAddress: Joi.string().required(),
    orderDate: Joi.date().default(Date.now),
    status: Joi.string().valid("pending", "processing", "shipped", "delivered").default("pending")
});
const orderUpdateValidationSchema = Joi.object({
    userId: Joi.string().optional(),
    products: Joi.array().items(Joi.object({
        product: Joi.string().optional(),
        quantity: Joi.number().integer().min(1).optional()
    })),
    totalPrice: Joi.number().optional(),
    shippingAddress: Joi.string().optional(),
    orderDate: Joi.date().optional(),
    status: Joi.string().valid("pending", "processing", "shipped", "delivered").optional()
});
//# sourceMappingURL=login.schema.js.map