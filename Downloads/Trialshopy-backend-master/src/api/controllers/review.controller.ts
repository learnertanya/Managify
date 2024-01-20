import { NextFunction, Request, Response } from "express";
import { ReviewService } from "../../services/review.service";
import { loginCheck } from "../../middlewares/logincheck.middleware";
import mongoose from "mongoose";
export class ReviewController {
  static async getReview(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { productId } = request.params;
      const reviewService = new ReviewService();
      const review = await reviewService.getReview(productId);
      response.json(review);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async addReview(request: Request, response: Response, next: NextFunction): Promise<void> {
    // loginCheck(request, response, async () => {

    const userId = request.params.userId;
    const productId = request.params.productId;
    const reviewData = { userId, productId, ...request.body };
    const reviewService = new ReviewService();
    try {
      const newReview = await reviewService.addReview(reviewData);
      response.json(newReview);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateReview(request: Request, response: Response, next: NextFunction): Promise<void> {
    loginCheck(request, response, async () => {
      const { id } = request.params;
      const reviewData = request.body;
      const reviewService = new ReviewService();
      try {
        const updatedReview = await reviewService.updateReview(id, reviewData);
        response.json(updatedReview);
      } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
      }
    });
  }

  static async deleteReview(request: Request, response: Response, next: NextFunction): Promise<void> {
    loginCheck(request, response, async () => {
      const { id } = request.params;
      const reviewService = new ReviewService();
      try {
        await reviewService.deleteReview(id);
        response.json({ message: "Review deleted successfully" });
      } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
      }
    });
  }

  static async revokeReview(request: Request, response: Response, next: NextFunction): Promise<void> {
    loginCheck(request, response, async () => {
      const { id } = request.params;
      const reviewService = new ReviewService();
      try {
        await reviewService.revokeReview(id);
        response.json({ message: "Review revoked successfully" });
      } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
      }
    });
  }

  static async likeReview(request: Request, response: Response, next: NextFunction): Promise<void> {
    loginCheck(request, response, async () => {
      const { reviewId, userId } = request.params;

      const reviewService = new ReviewService();
      try {
        await reviewService.likeReview(reviewId, new mongoose.Schema.Types.ObjectId(userId));

        response.json({ message: "Review liked successfully" });
      } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
      }
    });
  }

  static async dislikeReview(request: Request, response: Response, next: NextFunction): Promise<void> {
    loginCheck(request, response, async () => {
      const { reviewId, userId } = request.params;
      const reviewService = new ReviewService();
      try {
        await reviewService.dislikeReview(reviewId, new mongoose.Schema.Types.ObjectId(userId));
        response.json({ message: "Review disliked successfully" });
      } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
      }
    });
  }

  static async uploadImage(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const file = request.file;
      const image = {
        filename: file.filename,
        url: file.path
      };

      const result = await new ReviewService().uploadImage(request.params.reviewId, image);

      response.status(200).json({ comment: "file uploaded successfully", data: result, newFile: image });
    } catch (err) {
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }
}
