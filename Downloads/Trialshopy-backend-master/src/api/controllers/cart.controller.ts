import { NextFunction, Request, Response } from 'express';
import { CartService } from '../../services/cart.service';

export class CartController{
    static async getCart(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
          const language: any = request.headers['content-lang'] ?? 'en';
          const result = await new CartService().getCart(request.params.customerId, language);
          response.json(result);
        } catch (err) {
          const e: any = err ?? new Error(null);
          const error = JSON.parse(err.message);
          next({ code: error.code, message: error.message, error: error.error });
        }
    }

    static async addItem(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const language: any = request.headers['content-lang'] ?? 'en';
            const {productId, customerId} = request.body;
            const result = await new CartService().addItem(productId, customerId, language);
            response.json(result);
          } catch (err) {
            const e: any = err ?? new Error(null);
            const error = JSON.parse(err.message);
            next({ code: error.code, message: error.message, error: error.error });
          }
    }

    static async updateCount(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const {customerId, _id, newCount} = request.body;
            const result = await new CartService().updateCount(customerId, _id, newCount);
            response.json(result);
        } catch (err) {
            const e: any = err ?? new Error(null);
            const error = JSON.parse(err.message);
            next({ code: error.code, message: error.message, error: error.error });
        }
    }
    
    static async deleteItem(request: Request, response: Response, next: NextFunction): Promise<void> {
      try {
          const {customerId, _id} = request.body;
          const result = await new CartService().deleteItem(customerId, _id);
          response.json(result);
      } catch (err) {
          const e: any = err ?? new Error(null);
          const error = JSON.parse(err.message);
          next({ code: error.code, message: error.message, error: error.error });
      }
  }
}