import { ObjectId } from "bson";
import Review, { IReview } from "../models/review.model";
import mongoose from "mongoose";
import User from "../models/user.model";
export class ReviewService {
  async getReview(productId: string) {
    try {
      const reviews = await Review.find({ productId, status:"active" }).populate({path:"userId", model:User}).exec();
      return reviews;
    } catch (error) {
      throw new Error("Error fetching reviews");
    }
  }

  async addReview(reviewData: any) {
    try {
      const newReview = await Review.create(reviewData);
      return newReview;
    } catch (error) {
      throw new Error("Error adding review");
    }
  }

  async updateReview(reviewId: string, reviewData: any) {
    try {
      const updatedReview = await Review.findByIdAndUpdate(reviewId, reviewData, {
        new: true
      }).exec();
      return updatedReview;
    } catch (error) {
      throw new Error("Error updating review");
    }
  }

  async deleteReview(reviewId: string) {
    try {
      await Review.findByIdAndUpdate(
        { _id: reviewId, $set: { status: "inactive" } },
        {
          new: true
        }
      ).exec();
    } catch (error) {
      throw new Error("Error deleting review");
    }
  }

  async revokeReview(reviewId: string) {
    try {
      await Review.findByIdAndDelete(reviewId).exec();
    } catch (error) {
      throw new Error("Error revoking review");
    }
  }

  async likeReview(reviewId: string, userId: mongoose.Schema.Types.ObjectId) {
    try {
      const review = await Review.findById(reviewId).exec();
      if (!review) {
        throw new Error("Review not found");
      }

      if (review.likes.includes(userId)) {
        throw new Error("Already Liked");
      } else {
        review.likes.push(userId);

        if (review.dislikes.includes(userId)) {
          review.dislikes = review.dislikes.filter((dislike) => dislike.toString() !== userId.toString());
        }
      }

      await review.save();
      return review;
    } catch (error) {
      throw new Error("Error reacting to review");
    }
  }

  async dislikeReview(reviewId: string, userId: mongoose.Schema.Types.ObjectId) {
    try {
      const review = await Review.findById(reviewId).exec();
      if (!review) {
        throw new Error("Review not found");
      }

      if (review.dislikes.includes(userId)) {
        throw new Error("Already disliked");
      } else {
        review.dislikes.push(userId);

        if (review.likes.includes(userId)) {
          review.likes = review.likes.filter((like) => like.toString() !== userId.toString());
        }
      }

      await review.save();
      return review;
    } catch (error) {
      throw new Error("Error disliking review");
    }
  }

  async uploadImage(reviewId: string, image: any) {
    return await Review.findByIdAndUpdate(reviewId, { $push: { pictures: image } }).exec();
  }

  // async rateReview(reviewId: string, rating: number) {
  //   try {
  //     const review = await Review.findById(reviewId).exec();
  //     if (!review) {
  //       throw new Error("Review not found");
  //     }

  //     review.rating = rating;

  //     await review.save();
  //     return review;
  //   } catch (error) {
  //     throw new Error("Error rating review");
  //   }
  // }
}
