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
exports.StoreReviewController = void 0;
const logincheck_middleware_1 = require("../../middlewares/logincheck.middleware");
const storeReview_service_1 = require("../../services/storeReview.service");
class StoreReviewController {
    static getReview(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { storeId } = request.params;
                const review = yield new storeReview_service_1.StoreReviewService().getReview(storeId);
                response.json(review);
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static addReview(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // loginCheck(request, response, async () => {
            const userId = request.params.userId;
            const storeId = request.params.storeId;
            const reviewData = Object.assign({ userId, storeId }, request.body);
            try {
                const newReview = yield new storeReview_service_1.StoreReviewService().addReview(reviewData);
                response.json(newReview);
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static updateReview(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logincheck_middleware_1.loginCheck)(request, response, () => __awaiter(this, void 0, void 0, function* () {
                const { id } = request.params;
                const reviewData = request.body;
                try {
                    const updatedReview = yield new storeReview_service_1.StoreReviewService().updateReview(id, reviewData);
                    response.json(updatedReview);
                }
                catch (error) {
                    console.error(error);
                    response.status(500).json({ error: "Internal Server Error" });
                }
            }));
        });
    }
    static deleteReview(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logincheck_middleware_1.loginCheck)(request, response, () => __awaiter(this, void 0, void 0, function* () {
                const { id } = request.params;
                try {
                    yield new storeReview_service_1.StoreReviewService().deleteReview(id);
                    response.json({ message: "Review deleted successfully" });
                }
                catch (error) {
                    console.error(error);
                    response.status(500).json({ error: "Internal Server Error" });
                }
            }));
        });
    }
    static revokeReview(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logincheck_middleware_1.loginCheck)(request, response, () => __awaiter(this, void 0, void 0, function* () {
                const { id } = request.params;
                try {
                    yield new storeReview_service_1.StoreReviewService().revokeReview(id);
                    response.json({ message: "Review revoked successfully" });
                }
                catch (error) {
                    console.error(error);
                    response.status(500).json({ error: "Internal Server Error" });
                }
            }));
        });
    }
}
exports.StoreReviewController = StoreReviewController;
//# sourceMappingURL=storeReview.controller.js.map