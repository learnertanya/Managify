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
exports.CartService = void 0;
const cart_model_1 = __importDefault(require("../models/cart.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
class CartService {
    getCart(customerId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_model_1.default.find({ customerId: customerId })
                .populate('items.productId')
                .exec();
            return cart;
        });
    }
    addItem(productId, customerId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.default.findOne({ _id: productId }).exec();
            const cart = yield cart_model_1.default.findOne({ customerId: customerId }).exec();
            if (product) {
                if (cart) {
                    cart.items.push({ productId: productId, count: 1 });
                    yield cart.save();
                    return { ItemAddition: "Succesful", CartData: cart };
                }
                else {
                    return { ItemAddition: "Unsuccesful", Comment: "Cart not found" };
                }
            }
            else {
                return { ItemAddition: "Unsuccesful", Comment: "Product not found" };
            }
        });
    }
    updateCount(customerId, _id, newCount) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_model_1.default.findOne({ customerId: customerId });
            if (!cart)
                return { Comment: "Cart not found" };
            const itemIndex = cart.items.findIndex(item => item._id.toString() === _id);
            if (itemIndex === -1) {
                return { Comment: 'Item not found in the cart' };
            }
            cart.items[itemIndex].count = newCount;
            yield cart.save();
            return cart;
        });
    }
    deleteItem(customerId, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_model_1.default.findOne({ customerId: customerId });
            if (!cart)
                return { Comment: "Cart not found" };
            const itemIndex = cart.items.findIndex(item => item._id.toString() === _id);
            cart.items.splice(itemIndex, itemIndex);
            yield cart.save();
            return cart;
        });
    }
}
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map