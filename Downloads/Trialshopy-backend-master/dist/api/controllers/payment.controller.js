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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const payment_model_1 = __importDefault(require("../../models/payment.model"));
class PaymentController {
}
exports.PaymentController = PaymentController;
_a = PaymentController;
PaymentController.createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { storeId, totalItems, balance, totalRevenue, status } = req.body;
        const newPayment = new payment_model_1.default({
            storeId,
            totalItems,
            balance,
            totalRevenue,
            status
        });
        const savedPayment = yield newPayment.save();
        res.status(201).json(savedPayment);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create payment" });
    }
});
PaymentController.getPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield payment_model_1.default.find();
        res.status(200).json(payments);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch payments" });
    }
});
PaymentController.getPaymentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const payment = yield payment_model_1.default.findById(id);
        if (!payment) {
            res.status(404).json({ error: "Payment not found" });
            return;
        }
        res.status(200).json(payment);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch payment" });
    }
});
PaymentController.updatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { storeId, totalItems, balance, totalRevenue, status } = req.body;
        const updatedPayment = yield payment_model_1.default.findByIdAndUpdate(id, { storeId, totalItems, balance, totalRevenue, status }, { new: true });
        if (!updatedPayment) {
            res.status(404).json({ error: "Payment not found" });
            return;
        }
        res.status(200).json(updatedPayment);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update payment" });
    }
});
PaymentController.deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedPayment = yield payment_model_1.default.findByIdAndDelete(id);
        if (!deletedPayment) {
            res.status(404).json({ error: "Payment not found" });
            return;
        }
        res.status(200).json({ message: "Payment deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete payment" });
    }
});
//# sourceMappingURL=payment.controller.js.map