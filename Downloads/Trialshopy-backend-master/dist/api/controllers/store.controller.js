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
exports.StoreController = void 0;
const store_service_1 = require("../../services/store.service");
const store_model_1 = require("../../models/store.model");
class StoreController {
    static create(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new store_service_1.StoreService().createStore(Object.assign({}, request.body), request.params.sellerId);
                // console.log(result);
                response.status(201).json(result);
            }
            catch (err) {
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
                const result = yield new store_service_1.StoreService().getAllStore(request.params.sellerId, l, p);
                const stores = yield new store_service_1.StoreService().getAllStore(request.params.sellerId, 0, 0);
                response.status(200).json({ totalCount: stores.length, page: (_a = Number(page)) !== null && _a !== void 0 ? _a : 0, limit: (_b = Number(limit)) !== null && _b !== void 0 ? _b : 0, data: result, totalStores: stores });
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static getAll2(request, response, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit = "0", page = "1" } = request.query;
                const l = parseInt(limit.toString());
                const p = parseInt(page.toString());
                const filters = (_a = request.body.filters) !== null && _a !== void 0 ? _a : {};
                const result = yield new store_service_1.StoreService().getAllStore2(filters, l, p);
                const stores = yield new store_service_1.StoreService().getAllStore2(filters, 0, 0);
                response.status(200).json({ totalCount: stores.length, page: (_b = Number(page)) !== null && _b !== void 0 ? _b : 0, limit: (_c = Number(limit)) !== null && _c !== void 0 ? _c : 0, data: result, totalStores: stores });
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static getOne(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                const result = yield new store_service_1.StoreService().getOneStore(request.params.sellerId, request.params._id, language);
                response.json(result);
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static getOne2(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                const result = yield new store_service_1.StoreService().getOneStore2(request.params._id, language);
                response.json(result);
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static delete(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                const result = yield new store_service_1.StoreService().deleteStore(request.params.sellerId, request.params._id, language);
                response.json(result);
            }
            catch (err) {
                console.log({ err });
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static revoke(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                const result = yield new store_service_1.StoreService().revokeStore(request.params._id, language);
                response.json(result);
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static update(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                const result = yield new store_service_1.StoreService().updateOneStore(request.params.sellerId, request.params._id, request.body, language);
                response.json(result);
            }
            catch (err) {
                console.log({ err });
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static uploadImage(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = request.file;
                const image = {
                    filename: file.filename,
                    url: file.path
                };
                const result = yield new store_service_1.StoreService().uploadImage(request.params.storeId, image);
                response.status(200).json({ comment: "file uploaded successfully", data: result, newFile: image });
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static followStore(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sellerId, storeId } = request.params;
                const { userId } = request.body;
                const result = yield new store_service_1.StoreService().followStore(storeId, userId);
                response.status(200).json({ comment: "Store followed successfully!", data: result });
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static createOffer(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { storeId } = request.params;
                const offerData = request.body;
                const result = yield new store_service_1.StoreService().createOffer(storeId, offerData);
                response.status(201).json(result);
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static updateOffer(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { storeId, offerId } = request.params;
                const offerData = request.body;
                const result = yield new store_service_1.StoreService().updateOffer(storeId, offerId, offerData);
                response.json(result);
            }
            catch (err) {
                console.log({ err });
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static markMerchantAsPopular(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const merchantId = request.params.merchantId;
                const updatedMerchantData = {
                    status: store_model_1.StoreStatus.active
                    // Add other fields you want to update here
                };
                const updatedMerchant = yield new store_service_1.StoreService().updateMerchant(merchantId, updatedMerchantData);
                response.status(200).json(updatedMerchant);
            }
            catch (err) {
                next({ code: 500, message: err.message, error: null });
            }
        });
    }
    static getMarkedPopularMerchants(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const markedPopularMerchants = yield new store_service_1.StoreService().getMarkedPopularMerchants();
                response.status(200).json(markedPopularMerchants);
            }
            catch (err) {
                next({ code: 500, message: err.message, error: null });
            }
        });
    }
    static getNearbyStores(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { latitude, longitude, maxDistance = 5000 } = request.query;
                if (!latitude || !longitude || !maxDistance) {
                    throw new Error("Latitude, longitude, and maxDistance are required.");
                }
                const latitudeNum = parseFloat(latitude);
                const longitudeNum = parseFloat(longitude);
                const maxDistanceNum = parseFloat(maxDistance);
                if (isNaN(latitudeNum) || isNaN(longitudeNum) || isNaN(maxDistanceNum)) {
                    throw new Error("Invalid latitude, longitude, or maxDistance values.");
                }
                // console.log("latitude:", latitudeNum);
                // console.log("longitude:", longitudeNum);
                // console.log("maxDistance:", maxDistanceNum);
                const { limit = "0", page = "1" } = request.query;
                const l = parseInt(limit.toString());
                const p = parseInt(page.toString());
                const { filters } = (_a = request.body) !== null && _a !== void 0 ? _a : {};
                // const categoryId = filters.categories[0] && filters.categories.length > 0 && null;
                const nearbyStores = yield new store_service_1.StoreService().getNearbyAllStores(Object.assign({ latitude: latitudeNum, longitude: longitudeNum, maxDistance: maxDistanceNum }, filters), l, p);
                if (!nearbyStores) {
                    throw new Error("No nearby stores found.");
                }
                response.status(200).json(nearbyStores);
            }
            catch (error) {
                console.error("Error:", error);
                response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.StoreController = StoreController;
//# sourceMappingURL=store.controller.js.map