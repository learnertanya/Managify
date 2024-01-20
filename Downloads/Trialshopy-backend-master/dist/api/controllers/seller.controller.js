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
exports.SellerController = void 0;
const seller_service_1 = require("../../services/seller.service");
const security_middleware_1 = require("../../middlewares/security.middleware");
class SellerController {
    // @validateRequestBody(sellerCreation)
    static sellerSignUp(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new seller_service_1.SellerService().createSeller(Object.assign({}, request.body));
                const token = (0, security_middleware_1.generateToken)(request, response, next, result);
                response.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                response.status(201).json(result);
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    // @validateRequestBody(sellerAdd)
    static createSeller(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new seller_service_1.SellerService().createSeller(Object.assign({}, request.body));
                response.status(201).json(result);
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static getAllSeller(request, response, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit = "0", page = "1" } = request.query;
                const l = parseInt(limit.toString());
                const p = parseInt(page.toString());
                const result = yield new seller_service_1.SellerService().getAllSeller(l, p);
                const sellers = yield new seller_service_1.SellerService().getAllSeller(0, 0);
                response.status(200).json({ totalCount: sellers.length, page: (_a = Number(page)) !== null && _a !== void 0 ? _a : 0, limit: (_b = Number(limit)) !== null && _b !== void 0 ? _b : 0, data: result, totalUsers: sellers });
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static getOneSeller(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                const result = yield new seller_service_1.SellerService().getOneSeller(request.params._id, language);
                response.json(result);
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    // @validateRequestBody(sellerUpdate)
    static updateSeller(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                const result = yield new seller_service_1.SellerService().updateOneSeller(request.params._id, request.body, language);
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
    static deleteSeller(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                const result = yield new seller_service_1.SellerService().deleteSeller(request.params._id, language);
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
    static revokeSeller(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                const result = yield new seller_service_1.SellerService().revokeSeller(request.params._id, language);
                response.json(result);
            }
            catch (err) {
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
                const result = yield new seller_service_1.SellerService().uploadImage(request.params.sellerId, image);
                response.status(200).json({ comment: "file uploaded successfully", data: result, newFile: image });
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static uploadDocumentVerification(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const documents = request.body.documents;
                const result = yield new seller_service_1.SellerService().uploadDocumentVerification(request.params.sellerId, documents);
                response.status(200).json({ message: "Document verification submitted successfully", data: result });
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static logout(req, res, next) {
        // clear the session, can be done at front end
        res.status(200).json({ message: "Logged Out!" });
    }
}
exports.SellerController = SellerController;
//# sourceMappingURL=seller.controller.js.map