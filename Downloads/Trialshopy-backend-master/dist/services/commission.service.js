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
exports.deleteCommission = exports.updateCommission = exports.getAllCommissions = exports.createCommission = void 0;
const commission_model_1 = __importDefault(require("../models/commission.model"));
const createCommission = (commissionData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commission = yield commission_model_1.default.create(commissionData);
        return commission;
    }
    catch (error) {
        throw new Error("Failed to create commission");
    }
});
exports.createCommission = createCommission;
const getAllCommissions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commissions = yield commission_model_1.default.find();
        return commissions;
    }
    catch (error) {
        throw new Error("Failed to fetch commissions");
    }
});
exports.getAllCommissions = getAllCommissions;
const updateCommission = (commissionId, commissionData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCommission = yield commission_model_1.default.findByIdAndUpdate(commissionId, commissionData, { new: true });
        if (!updatedCommission) {
            throw new Error("Commission not found");
        }
        return updatedCommission;
    }
    catch (error) {
        throw new Error("Failed to update commission");
    }
});
exports.updateCommission = updateCommission;
const deleteCommission = (commissionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCommission = yield commission_model_1.default.findByIdAndDelete(commissionId);
        if (!deletedCommission) {
            throw new Error("Commission not found");
        }
    }
    catch (error) {
        throw new Error("Failed to delete commission");
    }
});
exports.deleteCommission = deleteCommission;
//# sourceMappingURL=commission.service.js.map