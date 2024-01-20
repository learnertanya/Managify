"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules
const mongoose_1 = require("mongoose");
const seller_model_1 = __importDefault(require("./seller.model"));
// Define the schema for the file
const fileSchema = new mongoose_1.Schema({
    fieldname: String,
    originalname: String,
    mimetype: String,
    size: Number,
    destination: String,
    filename: String,
    path: String,
});
// Define the schema for the form data
const verificationSchema = new mongoose_1.Schema({
    sellerId: { type: mongoose_1.Schema.Types.ObjectId, ref: seller_model_1.default, required: true },
    aadharNumber: String,
    panNumber: String,
    GstinNumber: String,
    fullName: String,
    accountNumber: String,
    ifscNumber: String,
    aadharUpload: fileSchema,
    panUpload: fileSchema,
    GstinUpload: fileSchema,
    accountUpload: fileSchema,
});
// Create the Mongoose model for the form data
const Verification = (0, mongoose_1.model)("verification", verificationSchema);
exports.default = Verification;
//# sourceMappingURL=verification.model.js.map