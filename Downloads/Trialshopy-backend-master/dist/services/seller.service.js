"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.SellerService = void 0;
const seller_model_1 = __importStar(require("../models/seller.model"));
const address_model_1 = __importDefault(require("../models/address.model"));
class SellerService {
    createSeller(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sellerDetails = Object.assign({}, data.sellerDetails);
                const seller = new seller_model_1.default(sellerDetails);
                const result1 = yield seller.save();
                const sellerId = result1._id;
                const addressDetails = Object.assign({ refId: sellerId, type: "seller" }, data.addressDetails);
                const address = new address_model_1.default(addressDetails);
                const result2 = yield address.save();
                return { data: result1, address: result2 };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllSeller(limit, page, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const sellers = yield seller_model_1.default.find()
                .limit(limit)
                .skip(page * limit)
                .lean()
                .exec();
            return sellers;
        });
    }
    getOneSeller(sellerId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const seller = yield seller_model_1.default.findOne({ _id: sellerId }).exec();
            return seller;
        });
    }
    updateOneSeller(sellerId, body, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const seller = yield seller_model_1.default.findOne({ _id: sellerId }).exec();
            if (body.profilePic)
                seller.profilePic = body.profilePic;
            if (body.phoneNumber)
                seller.phone_number = body.phoneNumber;
            if (body.language)
                seller.language = body.language;
            return yield seller_model_1.default.updateOne(seller._id, seller);
        });
    }
    deleteSeller(sellerId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield seller_model_1.default.findOneAndUpdate({ _id: sellerId }, { $set: { status: "inactive" } }, { new: true }).exec();
            return result;
        });
    }
    revokeSeller(sellerId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield seller_model_1.default.findByIdAndRemove({ _id: sellerId }).exec();
        });
    }
    uploadImage(sellerId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield seller_model_1.default.findByIdAndUpdate(sellerId, { profilePic: image }).exec();
        });
    }
    uploadDocumentVerification(sellerId, documents) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield seller_model_1.default.findByIdAndUpdate(sellerId, {
                documentVerification: {
                    status: seller_model_1.sellerStatus.pending,
                    documents
                }
            }).exec();
        });
    }
}
exports.SellerService = SellerService;
//# sourceMappingURL=seller.service.js.map