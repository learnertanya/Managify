import { NextFunction, Request, Response } from "express";
import { StoreService } from "../../services/store.service";
import { db } from "../../config/database.config";

export class FollowController {
  /**
   * Creates a new category by handling the HTTP POST request.
   * @param {Request} request - The HTTP request object.
   * @param {Response} response - The HTTP response object.
   * @param {NextFunction} next - The next function to be called in the middleware chain.
   * @returns {Promise<void>} - A promise that resolves when the category is successfully created.
   * @throws {Error} - If there is an error while creating the category.
   */
  static async followStore(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { storeId, userId } = request.params;

      if (!storeId || !userId) {
        response.status(400).json({ error: "Invalid parameters. Please provide valid storeId and userId" });
        return;
      }

      // Call followStore method from the StoreService
      const result = await StoreService.followStore(storeId, userId);
      response.status(200).json(result);
    } catch (err) {
      // Handle any error, if any, parse them and pass to the next middleware
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }
}
