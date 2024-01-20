"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const categorySchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().optional(),
    parent: joi_1.default.string().required().default(null)
});
const categoryCreateValidationSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string(),
    parent: joi_1.default.string().allow(null), // Allow null or string
    image: joi_1.default.object({
        filename: joi_1.default.string().optional(),
        url: joi_1.default.string().optional()
    })
});
const categoryUpdateValidationSchema = joi_1.default.object({
    name: joi_1.default.string(),
    description: joi_1.default.string(),
    parent: joi_1.default.string().allow(null), // Allow null or string
    image: joi_1.default.object({
        filename: joi_1.default.string().optional(),
        url: joi_1.default.string().optional()
    })
});
//# sourceMappingURL=category.schema.js.map