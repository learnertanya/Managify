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
exports.SearchController = void 0;
const search_service_1 = require("../../services/search.service");
const product_model_1 = __importDefault(require("../../models/product.model"));
class SearchController {
    static search(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryParams = request.query;
                if (!queryParams.q) {
                    response.status(400).json({ error: "Missing 'q' parameter" });
                    return;
                }
                const searchService = new search_service_1.SearchService(product_model_1.default);
                const searchResults = yield searchService.search(queryParams);
                response.status(200).json(searchResults);
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.SearchController = SearchController;
//# sourceMappingURL=search.controller.js.map