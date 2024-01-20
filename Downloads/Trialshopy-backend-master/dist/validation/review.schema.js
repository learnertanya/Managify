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
exports.reviewUpdate = exports.reviewCreation = void 0;
const Joi = __importStar(require("joi"));
exports.reviewCreation = Joi.object({
    userId: Joi.string().required(),
    productId: Joi.string().required(),
    reviewText: Joi.string().required(),
    pictures: Joi.array()
        .items(Joi.object({
        filename: Joi.string().optional(),
        url: Joi.string().optional()
    }))
        .optional(),
    likes: Joi.boolean().optional().default(false),
    dislikes: Joi.boolean().optional().default(false),
    rating: Joi.number().required(),
    status: Joi.string().valid("active", "inactive").default("active")
});
exports.reviewUpdate = Joi.object({
    reviewText: Joi.string().required(),
    productId: Joi.string().required(),
    pictures: Joi.array()
        .items(Joi.object({
        filename: Joi.string().optional(),
        url: Joi.string().optional()
    }))
        .optional(),
    likes: Joi.boolean().optional().default(false),
    dislikes: Joi.boolean().optional().default(false),
    rating: Joi.number().required(),
    status: Joi.string().valid("active", "inactive").default("active")
});
//# sourceMappingURL=review.schema.js.map