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
exports.OrderController = void 0;
const order_service_1 = require("../../services/order.service");
const product_model_1 = __importDefault(require("../../models/product.model"));
class OrderController {
    static create(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Raw Request Body:", request.body);
                const { userId } = request.params;
                const orderData = request.body;
                const result = yield new order_service_1.OrderService().createOrder(Object.assign({ userId }, orderData));
                response.status(201).json(result);
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static getMyOrder(request, response, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit = "0", page = "1" } = request.query;
                const l = parseInt(limit.toString());
                const p = parseInt(page.toString());
                console.log("Fetching orders for userId:", request.params.userId);
                const result = yield new order_service_1.OrderService().myOrders(request.params.userId, l, p);
                console.log("Result:", result);
                const orders = yield new order_service_1.OrderService().myOrders(request.params.userId, 0, 0);
                response.status(200).json({ totalCount: orders.length, page: (_a = Number(page)) !== null && _a !== void 0 ? _a : 0, limit: (_b = Number(limit)) !== null && _b !== void 0 ? _b : 0, data: result, totalOrders: orders });
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static getAll(request, response, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit = "0", page = "1" } = request.query;
                const l = parseInt(limit.toString());
                const p = parseInt(page.toString());
                const result = yield new order_service_1.OrderService().getAllOrders(l, p);
                const orders = yield new order_service_1.OrderService().getAllOrders(0, 0);
                response.status(200).json({ totalCount: orders.length, page: (_a = Number(page)) !== null && _a !== void 0 ? _a : 0, limit: (_b = Number(limit)) !== null && _b !== void 0 ? _b : 0, data: result, totalUsers: orders });
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static updateStock(productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.default.findById(productId);
            if (!product) {
                throw new Error("Product not found");
            }
            product.stock -= quantity;
            yield product.save({ validateBeforeSave: false });
        });
    }
    static update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = request.params.id;
                const updatedData = request.body;
                const result = yield new order_service_1.OrderService().updateOrder(orderId, updatedData);
                response.json(result);
            }
            catch (err) {
                console.error("Error:", err);
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static delete(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = request.params.id; // Extract orderId from URL
                // Call the deleteOrder function in the OrderService
                const result = yield new order_service_1.OrderService().deleteOrder(orderId);
                response.json(result);
            }
            catch (err) {
                console.error("Error:", err);
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map