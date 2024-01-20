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
exports.ProductBulkUploader = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
class ProductBulkUploader {
    constructor(filePath, sellerId, storeId) {
        this.filePath = filePath;
        this.sellerId = sellerId;
        this.storeId = storeId;
    }
    importProductsFromCSV() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                fs_1.default.createReadStream(this.filePath)
                    .pipe((0, csv_parser_1.default)())
                    .on("data", (data) => __awaiter(this, void 0, void 0, function* () {
                    const productData = {
                        gstId: data.gstId,
                        storeId: this.storeId,
                        sellerId: this.sellerId,
                        categoryId: data.categoryId,
                        brandId: data.brandId,
                        productName: data.productName,
                        shortDescription: data.shortDescription,
                        fullDescription: data.fullDescription,
                        status: data.status,
                        category: data.category,
                        subcategory: data.subcategory,
                        tags: data.tags,
                        manufacturer: data.manufacturer,
                        price: data.price,
                        isDiscount: data.isDiscount,
                        discount: data.discount,
                        inStock: data.inStock,
                        stock: data.stock,
                        shippingCharge: data.shippingCharge,
                        metaTitle: data.metaTitle,
                        metaKeywords: data.metaKeywords,
                        metaDescription: data.metaDescription
                    };
                    console.log("product Data :", productData);
                    const product = new product_model_1.default(productData);
                    yield product.save();
                }))
                    .on("end", () => {
                    console.log("Products imported successfully!");
                })
                    .on("error", (error) => {
                    console.error(error);
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.ProductBulkUploader = ProductBulkUploader;
//# sourceMappingURL=product.bulkUpload.js.map