"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationController = void 0;
const verification_model_1 = __importDefault(require("../../models/verification.model"));
class VerificationController {
    static mainVerification(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sellerId } = request.params;
                const { aadharNumber, panNumber, GstinNumber, fullName, accountNumber, ifscCode } = request.body;
                // Explicitly define the type for allFiles
                const allFiles = request.files || [];
                const formData = yield verification_model_1.default.create({
                    sellerId,
                    aadharNumber,
                    panNumber,
                    GstinNumber,
                    fullName,
                    accountNumber,
                    ifscCode,
                    aadharUpload: allFiles.find((file) => file.fieldname === "aadharUpload"),
                    panUpload: allFiles.find((file) => file.fieldname === "panUpload"),
                    GstinUpload: allFiles.find((file) => file.fieldname === "GstinUpload"),
                    accountUpload: allFiles.find((file) => file.fieldname === "accountUpload")
                });
                console.log("Form data and file details saved to the database:");
                response.json({ status: "ok" });
            }
            catch (err) {
                const error = err instanceof Error ? err : new Error(String(err));
                next({ code: 500, message: error.message, error: error });
            }
        });
    }
    static getFile(request, response, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit = "0", page = "1" } = request.query;
                const l = parseInt(limit.toString());
                const p = parseInt(page.toString());
                const { sellerId } = request.params;
                const result = yield verification_model_1.default.find({ sellerId: sellerId }).populate("sellerId").exec();
                console.log("Result:", result);
                response.status(200).json({ page: (_a = Number(page)) !== null && _a !== void 0 ? _a : 0, limit: (_b = Number(limit)) !== null && _b !== void 0 ? _b : 0, data: result });
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
}
exports.VerificationController = VerificationController;
//# sourceMappingURL=verification.controller.js.map