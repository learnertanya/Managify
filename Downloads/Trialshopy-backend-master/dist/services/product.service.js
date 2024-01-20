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
exports.ProductService = void 0;
const product_model_1 = __importDefault(require("./../models/product.model"));
const queryBuilder_1 = require("../helpers/queryBuilder");
const category_model_1 = __importDefault(require("../models/category.model"));
const store_model_1 = __importDefault(require("../models/store.model"));
class ProductService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = new product_model_1.default(data);
            return product.save();
        });
    }
    getAll(sortBy, filters, limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = (0, queryBuilder_1.buildQuery)(filters);
            const products = yield product_model_1.default.find(query)
                // .populate("brandId")
                .populate("sellerId")
                .populate("storeId")
                .limit(limit)
                .skip(limit * page)
                .sort(sortBy)
                .lean()
                .exec();
            // console.log(products);
            return products;
        });
    }
    getAll2(sortBy, filters, limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = (0, queryBuilder_1.buildQuery)(filters);
            const products = yield product_model_1.default.find(query)
                // .populate("brandId")
                // .populate("sellerId")
                // .populate("storeId")
                .limit(limit)
                .skip(limit * page)
                .sort(sortBy)
                .lean()
                .exec();
            return products;
        });
    }
    getOne(storeId, sellerId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (product_model_1.default.findOne({ storeId: storeId, sellerId, _id: productId })
                .populate("brandId")
                .populate("sellerId")
                .populate("storeId")
                // .populate('categoryId')
                .exec());
        });
    }
    getOne2(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (product_model_1.default.findOne({ _id: productId })
                .populate("brandId")
                .populate("sellerId")
                .populate("storeId")
                // .populate('categoryId')
                .exec());
        });
    }
    update(storeId, sellerId, productId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.default.findOneAndUpdate({ storeId: storeId, _id: productId }, data, { new: true }).exec();
        });
    }
    delete(storeId, sellerId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.default.findOneAndUpdate({ storeId: storeId, _id: productId, $set: { status: "inactive" } }, { new: true }).exec();
        });
    }
    revoke(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.default.findByIdAndRemove(productId).exec();
        });
    }
    // async getByLettersSuggestions(letters: string): Promise<String[] | null> {
    //   const regex = new RegExp(letters, "i");
    //   const products = await Product.find({ name: regex }).limit(10).exec();
    //   const suggestions = products.map((product) => product.name);
    //   return suggestions;
    // }
    getByLetters(letters, limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(letters);
            const regex = new RegExp(letters, "i");
            // console.log(regex);
            const products = yield product_model_1.default.find({ productName: regex })
                .populate("brandId")
                .populate("sellerId")
                .populate("storeId")
                .limit(limit)
                .skip(limit * page)
                .lean()
                .exec();
            return products;
        });
    }
    // async getByFilters(sortBy: string, filters: Record<string, any>, limit: number, page: number): Promise<IProduct[]> {
    //   try {
    //     const { minPrice, maxPrice, categories, tags, status, minDiscount, brand , storeId} = filters;
    //     const query: Record<string, any> = {};
    //     if (minPrice !== undefined && maxPrice !== undefined) {
    //       query.price = { $gte: minPrice, $lte: maxPrice };
    //     }
    //     if (categories && categories.length > 0) {
    //       query.categories = { $in: categories };
    //     }
    //     if (tags && tags.length > 0) {
    //       query.tags = { $in: tags };
    //     }
    //     if (status !== undefined) {
    //       query.status = status;
    //     }
    //     if (minDiscount !== undefined) {
    //       query.discount = { $gte: minDiscount };
    //     }
    //     if (brand !== undefined) {
    //       query.brand = brand;
    //     }
    //     if (storeId !== undefined) {
    //       query.storeId = storeId;
    //     }
    //     const products = await Product.find(query)
    //       .populate("brandId")
    //       .populate("sellerId")
    //       .populate("storeId")
    //       .limit(limit)
    //       .skip(limit * page)
    //       .sort(sortBy)
    //       .lean()
    //       .exec();
    //     return products as IProduct[];
    //   } catch (error) {
    //     throw new Error(JSON.stringify({ code: 500, message: "Internal Server Error", error }));
    //   }
    // }
    getAllOffers(limit, page, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const offers = yield product_model_1.default.find({ discount: { $gt: 0 } })
                .populate("brandId")
                .populate("sellerId")
                .populate("storeId")
                .limit(limit)
                .skip(page * limit)
                .lean()
                .exec();
            return offers;
        });
    }
    deleteOffer(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield product_model_1.default.findOneAndUpdate({ _id: productId }, { $set: { discount: 0 } }, { new: true }).exec();
            return result;
        });
    }
    uploadImage(productId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.default.findByIdAndUpdate(productId, { $push: { images: image } }).exec();
        });
    }
    categoryProducts(sortBy, filters, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const subcategories = yield category_model_1.default.find({ parent: categoryId }).exec();
            console.log("subcategories", subcategories);
            const productsBySubcategory = {};
            for (const subcategory of subcategories) {
                const subcategoryId = subcategory._id;
                const query = (0, queryBuilder_1.buildQuery)({ categories: [subcategoryId] });
                const products = yield product_model_1.default.find(query).populate("sellerId").populate("storeId").lean().exec();
                console.log("products", products);
                productsBySubcategory[subcategory.name] = products;
            }
            return productsBySubcategory;
        });
    }
    getNewWeeklyProducts(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.default.find({ categories: { $in: [categoryId] } });
        });
    }
    getNearbyProducts(filters, categoryId, limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {};
            // Fetch stores based on filters
            const query = (0, queryBuilder_1.buildQuery)(filters);
            const nearbyStores = yield store_model_1.default.find(query).select("_id").exec(); // Select only store IDs
            // console.log("nearbyStores", nearbyStores);
            // Fetch subcategories based on the categoryId
            const subcategories = yield category_model_1.default.find({ parent: categoryId }).exec();
            // Create a map to store products by subcategory
            const productsBySubcategory = new Map();
            // Iterate through nearby stores and query products for each store
            for (const store of nearbyStores) {
                const storeId = store._id;
                // Query products associated with the current store
                const products = yield product_model_1.default.find({ storeId: storeId })
                    .skip(page * limit)
                    .limit(limit)
                    .lean()
                    .exec();
                // console.log("products" ,products);
                // Group products by subcategory
                products.forEach((product) => {
                    var _a, _b;
                    // console.log(product);
                    const categoryIds = product.categories;
                    // console.log("categoryIds", categoryIds);
                    const subcategoryId = categoryIds.find((catId) => subcategories.some((subcategory) => subcategory._id.equals(catId)));
                    // console.log("subcategoryId", subcategoryId);
                    if (subcategoryId) {
                        const subcategoryName = (_a = subcategories.find((subcategory) => subcategory._id.equals(subcategoryId))) === null || _a === void 0 ? void 0 : _a.name;
                        if (subcategoryName) {
                            if (!productsBySubcategory.has(subcategoryName)) {
                                productsBySubcategory.set(subcategoryName, []);
                            }
                            (_b = productsBySubcategory.get(subcategoryName)) === null || _b === void 0 ? void 0 : _b.push(product);
                        }
                    }
                });
            }
            // Convert the map to the desired result format
            productsBySubcategory.forEach((products, subcategoryName) => {
                result[subcategoryName] = products;
            });
            return result;
        });
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map