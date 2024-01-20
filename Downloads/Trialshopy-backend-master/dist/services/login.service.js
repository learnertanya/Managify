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
exports.LoginService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const cart_model_1 = __importDefault(require("../models/cart.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class LoginService {
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.userType === "customer") {
                if (!data.email || !data.password) {
                    return { Login: "Unsuccessful", error: "Email and password are required" };
                }
                const user = yield user_model_1.default.findOne({ email: data.email }).exec();
                if (!user) {
                    return { Login: "Unsuccessful", error: "User not found" };
                }
                const passwordMatch = yield bcrypt_1.default.compare(data.password, user.password);
                if (passwordMatch) {
                    const cart = yield cart_model_1.default.findOne({ customerId: user._id });
                    if (!cart) {
                        const newCart = new cart_model_1.default({
                            customerId: user._id,
                            items: []
                        });
                        yield newCart.save();
                    }
                    return { Login: "Successful", UserData: user };
                }
                else {
                    return { Login: "Unsuccessful", error: "Incorrect password! Try again" };
                }
            }
            else if (data.userType === "seller") {
                // Handle seller login logic here
            }
            else if (data.userType === "superAdmin") {
                // Handle superAdmin login logic here
            }
        });
    }
    passwordUpdate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ _id: data.userId }).exec();
            const passwordMatch = yield bcrypt_1.default.compare(data.old_password, user.password);
            if (passwordMatch) {
                user.password = data.new_password;
                const updatedUser = yield user.save();
                return { Update: "Successful", UserData: updatedUser };
            }
            else {
                return { Update: "Unsuccessful", Comment: "Old Password does not match" };
            }
        });
    }
}
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map