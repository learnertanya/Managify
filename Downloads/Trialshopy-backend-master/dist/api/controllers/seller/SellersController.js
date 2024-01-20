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
exports.SellersController = void 0;
const seller_model_1 = __importDefault(require("../../../models/seller.model"));
const product_model_1 = __importDefault(require("../../../models/product.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class SellersController {
    // Later have to update login logic
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, phone, password } = req.body;
            // Either Phone or Email
            console.log(email);
            console.log(phone);
            if (email) {
                // check if this email exist in seller
                const user = yield seller_model_1.default.findOne({ email }).exec();
                console.log(user);
                if (!user) {
                    // if seller doesn't exist
                    res.status(400).json({ error: "Seller does not exist with the provided Email/Phone." });
                }
                // If email exists validate password
                if (password === user.password) {
                    // If password is correct create a session for 1 hour and send the seller info
                    // Generate a JWT token
                    const token = jsonwebtoken_1.default.sign({ user }, "trialshopy", { expiresIn: "1h" });
                    res.json({ token, user });
                    // res.status(201).json({ sellerInfo: user });
                }
                else {
                    res.status(404).json({ error: "Password wrong!" });
                }
            }
            else {
                // check if this phone exist in seller
                const user = yield seller_model_1.default.findOne({ phoneNumber: phone }).exec();
                if (!user) {
                    // if seller doesn't exist
                    res.status(400).json({ error: "Seller does not exist with the provided Email/Phone." });
                }
                // If phone exists validate password
                if (password === user.password) {
                    // If password is correct create a session for 1 hour and send the seller info
                    // Generate a JWT token
                    const token = jsonwebtoken_1.default.sign({ user }, "trialshopy", { expiresIn: "1h" });
                    res.status(201).json({ token, sellerInfo: user });
                }
                else {
                    res.status(404).json({ error: "Password wrong!" });
                }
            }
        });
    }
    static logout(req, res) {
        // clear the session, can be done at front end
        // localStorage.removeItem("_token");
        res.status(200).json({ message: "Logged Out!" });
    }
    static getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const seller = req.user;
            // console.log(seller.user);
            // check if _id is valid mongodb id
            // if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ error: "Invalid Seller Id" });
            // check if seller exist with this id
            // const seller = Seller.findOne({ _id }).exec();
            // if (!seller) return res.status(404).json({ error: "Seller does not exist with this id!" });
            // console.log("seller._id ", seller.user._id);
            const sellerId = new mongoose_1.default.Types.ObjectId(seller.user._id);
            // console.log("mongodb: ", sellerId);
            const products = yield product_model_1.default.find({ sellerId }).exec();
            // console.log(products);
            let stores = new Map();
            products.forEach((product) => {
                if (!stores.has(product.storeId)) {
                    stores[product.storeId] = [];
                }
                stores[product.storeId].push(product);
            });
            res.status(200).json({ products, stores });
            // res.status(200).json({ message: "Authenticated req!!" });
        });
    }
}
exports.SellersController = SellersController;
//# sourceMappingURL=SellersController.js.map