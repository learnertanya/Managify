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
exports.ProductController = void 0;
const product_service_1 = require("./../../services/product.service");
const product_bulkUploadFormat_1 = require("../../helpers/product.bulkUploadFormat");
const product_bulkUpload_1 = require("../../helpers/product.bulkUpload");
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
class ProductController {
    static create(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (((_a = request.body.category) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                    response.status(401).json({ message: "Must add category to the product" });
                }
                else {
                    const result = yield new product_service_1.ProductService().create(Object.assign(Object.assign({}, request.body), { storeId: request.params.storeId, sellerId: request.params.sellerId }));
                    response.status(201).json(result);
                }
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
                const { filters, sortBy } = request.body;
                const sellerId = request.params.sellerId;
                const storeId = request.params.storeId;
                const productService = new product_service_1.ProductService();
                const result = yield productService.getAll(sortBy, Object.assign({ sellerId: sellerId, storeId: storeId }, filters), l, p);
                response.status(200).json({ totalCount: result.length, page: (_a = Number(page)) !== null && _a !== void 0 ? _a : 0, limit: (_b = Number(limit)) !== null && _b !== void 0 ? _b : 0, data: result });
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static getAll2(request, response, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit = "0", page = "1" } = request.query;
                const l = parseInt(limit.toString());
                const p = parseInt(page.toString());
                const { filters, sortBy } = request.body;
                const productService = new product_service_1.ProductService();
                const result = yield productService.getAll2(sortBy, filters, l, p);
                response.status(200).json({ page: (_a = Number(page)) !== null && _a !== void 0 ? _a : 0, limit: (_b = Number(limit)) !== null && _b !== void 0 ? _b : 0, data: result });
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static getOne(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!request.params._id) {
                throw new Error("No product id");
            }
            if (!request.params.storeId) {
                throw new Error("No store id");
            }
            if (!request.params.sellerId) {
                throw new Error("No seller id");
            }
            try {
                const product = yield new product_service_1.ProductService().getOne(request.params.storeId, request.params.sellerId, request.params._id);
                if (!product) {
                    response.status(404).json({ message: "No Product found" });
                }
                else {
                    response.status(200).json(product);
                }
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static getOne2(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!request.params._id) {
                throw new Error("No product id");
            }
            try {
                const product = yield new product_service_1.ProductService().getOne2(request.params._id);
                if (!product) {
                    response.status(404).json({ message: "No Product found" });
                }
                else {
                    response.status(200).json(product);
                }
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = request.params.productId;
                const updatedProductData = Object.assign({}, request.body);
                const updatedProduct = yield new product_service_1.ProductService().update(request.params.storeId, request.params.sellerId, productId, updatedProductData);
                if (!updatedProduct) {
                    response.status(404).json({ message: "Product not found" });
                }
                else {
                    response.status(201).json(updatedProduct);
                }
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static delete(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = request.params.productId;
                yield new product_service_1.ProductService().delete(request.params.storeId, request.params.sellerId, productId);
                response.status(200).json({ message: "Product deleted successfully" });
            }
            catch (err) {
                next({ code: err.code || 500, message: err.message || "Internal Server Error", error: err });
            }
        });
    }
    static revoke(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = request.params.productId;
                yield new product_service_1.ProductService().revoke(productId);
                response.status(200).json({ message: "Product deleted successfully" });
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static bulkUpload(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!request.file) {
                    throw new Error("No file uploaded! Please upload a csv file.");
                }
                const bulkUploader = new product_bulkUpload_1.ProductBulkUploader(`./uploads/${request.file.filename}`, request.params.sellerId, request.params.storeId);
                bulkUploader
                    .importProductsFromCSV()
                    .then(() => {
                    console.log("Products import completed!");
                })
                    .catch((err) => {
                    console.error("Error importing Products:", err);
                });
                response.status(200).json({ message: "File uploaded and processed successfully" });
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static bulkUploadFormat(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, product_bulkUploadFormat_1.generateTemplateFileCSV)();
                const filePath = "./template.csv";
                const fileStream = fs_1.default.createReadStream(filePath);
                response.setHeader("Content-Type", "text/csv");
                response.setHeader("Content-Disposition", "attachment; filename=template.csv");
                fileStream.pipe(response);
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static getByLetters(request, response, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit = "0", page = "1" } = request.query;
                const l = parseInt(limit.toString());
                const p = parseInt(page.toString());
                const letters = request.body.letters;
                const productService = new product_service_1.ProductService();
                const result = yield productService.getByLetters(letters, l, p);
                const products = yield productService.getByLetters(letters, 0, 0);
                response.status(200).json({ totalCount: products.length, page: (_a = Number(page)) !== null && _a !== void 0 ? _a : 0, limit: (_b = Number(limit)) !== null && _b !== void 0 ? _b : 0, data: result, totalProducts: products });
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    //need more work
    // static async getByFilters(request: Request, response: Response, next: NextFunction): Promise<void> {
    //   try {
    //     const { limit = "0", page = "1" } = request.query;
    //     const l = parseInt(limit.toString());
    //     const p = parseInt(page.toString());
    //     const { filters, sortBy } = request.body;
    //     const productService = new ProductService();
    //     const result = await productService.getByFilters(sortBy, filters, l, p);
    //     const products = await productService.getByFilters(sortBy, filters, 0, 0);
    //     response.status(200).json({ totalCount: products.length, page: Number(page) ?? 0, limit: Number(limit) ?? 0, data: result, totalProducts: products });
    //   } catch (err) {
    //     const e: any = err ?? new Error(null);
    //     const error = JSON.parse(err.message);
    //     next({ code: error.code, message: error.message, error: error.error });
    //   }
    // }
    static getAllOffers(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = "10", page = "1" } = request.query;
            const l = parseInt(limit.toString());
            const p = parseInt(page.toString());
            try {
                const productService = new product_service_1.ProductService();
                const products = yield productService.getAllOffers(l, p);
                response.status(200).json(products);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static deleteOffer(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new product_service_1.ProductService().deleteOffer(request.params.productId);
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
                // const file = request.file as Express.Multer.File;
                // const image = {
                //   filename: file.filename,
                //   url: `/uploads/${file.filename}`
                // };
                const file = request.file;
                const image = {
                    filename: file.filename,
                    url: file.path
                };
                const result = yield new product_service_1.ProductService().uploadImage(request.params.productId, image);
                response.status(200).json({ comment: "file uploaded successfully", data: result, newFile: image });
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static categoryProduct(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let categoryId = (_a = request.params._id) !== null && _a !== void 0 ? _a : null;
                if (categoryId === "null") {
                    categoryId = null;
                }
                console.log(categoryId);
                const { filters, sortBy } = request.body;
                const result = yield new product_service_1.ProductService().categoryProducts(sortBy, filters, categoryId);
                response.status(200).json(result);
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static getNewWeeklyProducts(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryId = request.params.categoryId;
            console.log(categoryId, "categoryId");
            try {
                const result = yield new product_service_1.ProductService().getNewWeeklyProducts(categoryId);
                response.status(200).json(result);
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static nearbyProduct(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { filters, sortBy } = request.body;
                const { limit = "10", page = "1" } = request.query;
                const l = parseInt(limit.toString());
                const p = parseInt(page.toString());
                const categoryId = new mongoose_1.default.Types.ObjectId(request.params.id);
                const result = yield new product_service_1.ProductService().getNearbyProducts(filters, categoryId, l, p);
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map