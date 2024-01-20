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
exports.orderService = exports.OrderService = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
class OrderService {
    updateStock(id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.default.findById(id);
            product.stock -= quantity;
            yield product.save({ validateBeforeSave: false });
        });
    }
    createOrder(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = new order_model_1.default(data);
            return order.save();
        });
    }
    myOrders(userId, limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const orders = yield order_model_1.default.find({ userId: userId }).populate("userId").limit(limit).skip(skip).lean().exec();
            return orders;
        });
    }
    getAllOrders(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_model_1.default.find()
                .limit(limit)
                .skip(page * limit)
                .lean()
                .exec();
            return orders;
        });
    }
    updateOrder(orderId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.default.findById(orderId);
            if (!order) {
                return {
                    status: 404,
                    comment: "Order not found"
                };
            }
            if (!Array.isArray(order.products)) {
                return {
                    status: 400,
                    comment: "Invalid products format"
                };
            }
            if (updatedData.status === "shipped") {
                for (const product of order.products) {
                    yield this.updateStock(product.product, product.quantity);
                }
            }
            order.status = updatedData.status;
            if (updatedData.status === "delivered") {
                order.deliveredAt = new Date();
            }
            yield order.save({ validateBeforeSave: false });
            return {
                status: 200,
                message: "Order Updated"
            };
        });
    }
    deleteOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.default.findById(orderId);
            if (!order) {
                return {
                    status: 404,
                    comment: "Order not found"
                };
            }
            yield order.remove();
            return {
                status: 200,
                message: "Order Deleted"
            };
        });
    }
}
exports.OrderService = OrderService;
exports.orderService = new OrderService();
//# sourceMappingURL=order.service.js.map