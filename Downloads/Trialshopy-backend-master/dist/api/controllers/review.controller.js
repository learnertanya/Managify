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
exports.ReviewController = void 0;
const review_service_1 = require("../../services/review.service");
const logincheck_middleware_1 = require("../../middlewares/logincheck.middleware");
const mongoose_1 = __importDefault(require("mongoose"));
class ReviewController {
    static getReview(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = request.params;
                const reviewService = new review_service_1.ReviewService();
                const review = yield reviewService.getReview(productId);
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
            const productId = request.params.productId;
            const reviewData = Object.assign({ userId, productId }, request.body);
            const reviewService = new review_service_1.ReviewService();
            try {
                const newReview = yield reviewService.addReview(reviewData);
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
                const reviewService = new review_service_1.ReviewService();
                try {
                    const updatedReview = yield reviewService.updateReview(id, reviewData);
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
                const reviewService = new review_service_1.ReviewService();
                try {
                    yield reviewService.deleteReview(id);
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
                const reviewService = new review_service_1.ReviewService();
                try {
                    yield reviewService.revokeReview(id);
                    response.json({ message: "Review revoked successfully" });
                }
                catch (error) {
                    console.error(error);
                    response.status(500).json({ error: "Internal Server Error" });
                }
            }));
        });
    }
    static likeReview(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logincheck_middleware_1.loginCheck)(request, response, () => __awaiter(this, void 0, void 0, function* () {
                const { reviewId, userId } = request.params;
                const reviewService = new review_service_1.ReviewService();
                try {
                    yield reviewService.likeReview(reviewId, new mongoose_1.default.Schema.Types.ObjectId(userId));
                    response.json({ message: "Review liked successfully" });
                }
                catch (error) {
                    console.error(error);
                    response.status(500).json({ error: "Internal Server Error" });
                }
            }));
        });
    }
    static dislikeReview(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logincheck_middleware_1.loginCheck)(request, response, () => __awaiter(this, void 0, void 0, function* () {
                const { reviewId, userId } = request.params;
                const reviewService = new review_service_1.ReviewService();
                try {
                    yield reviewService.dislikeReview(reviewId, new mongoose_1.default.Schema.Types.ObjectId(userId));
                    response.json({ message: "Review disliked successfully" });
                }
                catch (error) {
                    console.error(error);
                    response.status(500).json({ error: "Internal Server Error" });
                }
            }));
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
                const result = yield new review_service_1.ReviewService().uploadImage(request.params.reviewId, image);
                response.status(200).json({ comment: "file uploaded successfully", data: result, newFile: image });
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
}
exports.ReviewController = ReviewController;
//# sourceMappingURL=review.controller.js.map