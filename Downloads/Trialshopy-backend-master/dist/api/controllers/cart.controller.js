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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const cart_service_1 = require("../../services/cart.service");
class CartController {
    static getCart(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers['content-lang']) !== null && _a !== void 0 ? _a : 'en';
                const result = yield new cart_service_1.CartService().getCart(request.params.customerId, language);
                response.json(result);
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static addItem(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers['content-lang']) !== null && _a !== void 0 ? _a : 'en';
                const { productId, customerId } = request.body;
                const result = yield new cart_service_1.CartService().addItem(productId, customerId, language);
                response.json(result);
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static updateCount(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { customerId, _id, newCount } = request.body;
                const result = yield new cart_service_1.CartService().updateCount(customerId, _id, newCount);
                response.json(result);
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static deleteItem(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { customerId, _id } = request.body;
                const result = yield new cart_service_1.CartService().deleteItem(customerId, _id);
                response.json(result);
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
}
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map