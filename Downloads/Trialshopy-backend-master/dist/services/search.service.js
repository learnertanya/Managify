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
exports.SearchService = void 0;
class SearchService {
    constructor(model) {
        this.model = model;
    }
    search(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lowercaseQuery = queryParams.q.toLowerCase();
                const query = {
                    $or: [{ productName: { $regex: lowercaseQuery, $options: "i" } }, { shortDescription: { $regex: lowercaseQuery, $options: "i" } }]
                };
                if (queryParams.filter) {
                    if (queryParams.filterField === "manufacturer") {
                        query["manufacturer"] = queryParams.filter;
                    }
                    else if (queryParams.filterField === "status") {
                        query["status"] = queryParams.filter;
                    }
                    else if (queryParams.filterField === "price") {
                        query["price"] = queryParams.filter;
                    }
                    else if (queryParams.filterField === "inStock") {
                        query["inStock"] = queryParams.filter;
                    }
                    else if (queryParams.filterField === "stock") {
                        query["stock"] = queryParams.filter;
                    }
                    else if (queryParams.filterField === "category") {
                        query["categories"] = queryParams.filter;
                    }
                    else if (queryParams.filterField === "productName") {
                        query["productName"] = queryParams.filter;
                    }
                    else if (queryParams.filterField === "status") {
                        query["status"] = queryParams.filter;
                    }
                    else if (queryParams.filterField === "manufacturer") {
                        query["manufacturer"] = queryParams.filter;
                    }
                    else if (queryParams.filterField === "isDiscount") {
                        query["isDiscount"] = queryParams.filter;
                    }
                    else if (queryParams.filterField === "rating") {
                        query["rating"] = queryParams.filter;
                    }
                }
                const sortField = queryParams.sort || "productName";
                const sortOrder = queryParams.order === "desc" ? -1 : 1;
                const sortOptions = { [sortField]: sortOrder };
                const searchResults = yield this.model.find(query).sort(sortOptions).exec();
                return searchResults;
            }
            catch (error) {
                console.error(error);
                throw new Error("Error performing search");
            }
        });
    }
}
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map