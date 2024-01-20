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
exports.StoreService = void 0;
const store_model_1 = __importStar(require("../models/store.model"));
// import { Point } from "geojson";
const queryBuilder_1 = require("../helpers/queryBuilder");
const category_model_1 = __importDefault(require("../models/category.model"));
const address_model_1 = __importDefault(require("../models/address.model"));
class StoreService {
    createStore(data, sellerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storeDetails = Object.assign({ sellerId }, data.storeDetails);
                const store = new store_model_1.default(storeDetails);
                const result1 = yield store.save();
                const storeId = result1._id;
                const addressDetails = Object.assign({ refId: storeId, type: "store" }, data.addressDetails);
                const result2 = yield new address_model_1.default(addressDetails).save();
                return { data: result1, address: result2 };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllStore(sellerId, limit, page, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const stores = yield store_model_1.default.find({ sellerId: sellerId })
                .limit(limit)
                .skip(page * limit)
                .lean()
                .exec();
            return stores;
        });
    }
    getAllStore2(filters, limit, page, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = (0, queryBuilder_1.buildQuery)(filters);
            const stores = yield store_model_1.default.find(query)
                .limit(limit)
                .skip(page * limit)
                .lean()
                .exec();
            return stores;
        });
    }
    getOneStore(sellerId, storeId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield store_model_1.default.findOne({ sellerId: sellerId, _id: storeId }).exec();
            return store;
        });
    }
    getOneStore2(storeId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield store_model_1.default.findOne({ _id: storeId }).populate('categories').populate('sellerId').exec();
            return store;
        });
    }
    updateOneStore(sellerId, storeId, body, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield store_model_1.default.findOne({ sellerId: sellerId, _id: storeId }).exec();
            if (body.openingHours) {
                if (body.openingHours.openTime)
                    store.openingHours.openTime = body.openingHours.openTime;
                if (body.openingHours.closeTime)
                    store.openingHours.closeTime = body.openingHours.closeTime;
            }
            return yield store.save();
        });
    }
    deleteStore(sellerId, storeId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield store_model_1.default.findOneAndUpdate({ sellerId: sellerId, _id: storeId }, { $set: { status: "inactive" } }, { new: true }).exec();
            return result;
        });
    }
    revokeStore(storeId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield store_model_1.default.findByIdAndRemove({ _id: storeId }).exec();
        });
    }
    uploadImage(storeId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield store_model_1.default.findByIdAndUpdate(storeId, { $push: { images: image } }).exec();
        });
    }
    followStore(storeId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield store_model_1.default.findByIdAndUpdate(storeId, {
                $inc: { 'followers.count': 1 },
                $push: { 'followers.followers': userId }
            }, { new: true });
        });
    }
    createOffer(storeId, offerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield store_model_1.default.findById(storeId);
            store.offers.push(offerData);
            return store.save();
        });
    }
    updateOffer(storeId, offerId, offerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield store_model_1.default.findById(storeId);
            const offer = store.offers.id(offerId);
            offer.set(offerData);
            return store.save();
        });
    }
    updateMerchant(merchantId, dataToUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedMerchant = yield store_model_1.default.findByIdAndUpdate(merchantId, dataToUpdate, { new: true }).exec();
                return updatedMerchant;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    getMarkedPopularMerchants() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const markedPopularMerchants = yield store_model_1.default.find({ status: store_model_1.StoreStatus.active, followers: { $exists: true, $not: { $size: 0 } } })
                    .populate("sellerId followers.followers")
                    .exec();
                return markedPopularMerchants;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    getNearbyAllStores(filters, limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {};
            // Fetch stores based on filters
            const query = (0, queryBuilder_1.buildQuery)(filters);
            const nearbyStores = yield store_model_1.default.find(query)
                .skip(page * limit)
                .limit(limit)
                .lean()
                .exec();
            // Fetch subcategories based on the categoryId
            const categoryId = filters.categories[0] && filters.categories.length > 0 && null;
            const subcategories = yield category_model_1.default.find({ parent: categoryId }).exec();
            // Create a map to store stores by subcategory
            const storesBySubcategory = new Map();
            // Iterate through nearby stores and group them by subcategory
            nearbyStores.forEach((store) => {
                var _a, _b;
                const subcategoryId = store.categories.find((catId) => {
                    return subcategories.some((subcategory) => subcategory._id.equals(catId));
                });
                if (subcategoryId) {
                    const subcategoryName = (_a = subcategories.find((subcategory) => subcategory._id.equals(subcategoryId))) === null || _a === void 0 ? void 0 : _a.name;
                    if (subcategoryName) {
                        if (!storesBySubcategory.has(subcategoryName)) {
                            storesBySubcategory.set(subcategoryName, []);
                        }
                        (_b = storesBySubcategory.get(subcategoryName)) === null || _b === void 0 ? void 0 : _b.push(store);
                    }
                }
            });
            // Convert the map to the desired result format
            storesBySubcategory.forEach((stores, subcategoryName) => {
                result[subcategoryName] = stores;
            });
            return result;
        });
    }
}
exports.StoreService = StoreService;
//# sourceMappingURL=store.service.js.map