"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressSchema = exports.addressSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const address_model_1 = require("../models/address.model");
const address_model_2 = require("../models/address.model");
exports.addressSchema = joi_1.default.object({
    refId: joi_1.default.string().required(),
    type: joi_1.default.string()
        .valid(...Object.values(address_model_1.addressType))
        .required(),
    status: joi_1.default.string()
        .valid(...Object.values(address_model_2.addressStatus))
        .default(address_model_2.addressStatus.active),
    addressLine1: joi_1.default.string().required(),
    townORcity: joi_1.default.string().required(),
    pincode: joi_1.default.string().required(),
    state: joi_1.default.string().required(),
    country: joi_1.default.string().required()
});
exports.updateAddressSchema = joi_1.default.object({
    refId: joi_1.default.string(),
    type: joi_1.default.string().valid(...Object.values(address_model_1.addressType)),
    status: joi_1.default.string().valid(...Object.values(address_model_2.addressStatus)),
    addressLine1: joi_1.default.string(),
    townORcity: joi_1.default.string(),
    pincode: joi_1.default.string(),
    state: joi_1.default.string(),
    country: joi_1.default.string()
});
//# sourceMappingURL=address.schema.js.map