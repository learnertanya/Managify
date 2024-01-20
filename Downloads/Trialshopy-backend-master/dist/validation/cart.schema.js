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
exports.cartUpdate = exports.cartCreation = exports.ProductCount = exports.Level = void 0;
const Joi = __importStar(require("joi"));
var Level;
(function (Level) {
    Level["one"] = "1";
    Level["two"] = "2";
    Level["three"] = "3";
})(Level || (exports.Level = Level = {}));
var ProductCount;
(function (ProductCount) {
    ProductCount[ProductCount["one"] = 1] = "one";
    ProductCount[ProductCount["two"] = 2] = "two";
    ProductCount[ProductCount["three"] = 3] = "three";
    ProductCount[ProductCount["four"] = 4] = "four";
    ProductCount[ProductCount["five"] = 5] = "five";
})(ProductCount || (exports.ProductCount = ProductCount = {}));
exports.cartCreation = Joi.object({
    customerId: Joi.string().required(),
    items: Joi.array()
        .items(Joi.object({
        productId: Joi.string().optional(),
        count: Joi.number().optional().default(1)
    }))
        .optional(),
    document: Joi.array()
        .items(Joi.object({
        name: Joi.string().optional(),
        url: Joi.string().optional()
    }))
        .optional()
});
exports.cartUpdate = Joi.object({
    customerId: Joi.string().optional(),
    items: Joi.array()
        .items(Joi.object({
        productId: Joi.string().optional(),
        count: Joi.number().optional().default(1)
    }))
        .optional(),
    document: Joi.array()
        .items(Joi.object({
        name: Joi.string().optional(),
        url: Joi.string().optional()
    }))
        .optional()
});
//# sourceMappingURL=cart.schema.js.map