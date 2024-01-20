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
exports.PaymentService = void 0;
const payment_model_1 = __importDefault(require("../models/payment.model"));
class PaymentService {
    static createPayment(paymentData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payment = yield payment_model_1.default.create(paymentData);
                return payment;
            }
            catch (error) {
                throw new Error("Failed to create payment");
            }
        });
    }
    static getAllPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payments = yield payment_model_1.default.find();
                return payments;
            }
            catch (error) {
                throw new Error("Failed to fetch payments");
            }
        });
    }
    static getPaymentById(paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payment = yield payment_model_1.default.findById(paymentId);
                return payment;
            }
            catch (error) {
                throw new Error("Failed to fetch payment");
            }
        });
    }
    static updatePayment(paymentId, paymentData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedPayment = yield payment_model_1.default.findByIdAndUpdate(paymentId, paymentData, { new: true });
                return updatedPayment;
            }
            catch (error) {
                throw new Error("Failed to update payment");
            }
        });
    }
    static deletePayment(paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedPayment = yield payment_model_1.default.findByIdAndDelete(paymentId);
                if (!deletedPayment) {
                    throw new Error("Payment not found");
                }
            }
            catch (error) {
                throw new Error("Failed to delete payment");
            }
        });
    }
}
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map