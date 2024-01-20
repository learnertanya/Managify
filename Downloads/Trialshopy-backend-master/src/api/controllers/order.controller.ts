import { NextFunction, Request, Response } from "express";
import { OrderService } from "../../services/order.service";
import Product from "../../models/product.model";

export class OrderController {
  static async create(request, response, next) {
    try {
      console.log("Raw Request Body:", request.body);
      const { userId } = request.params;
      const orderData = request.body;
     

      const result = await new OrderService().createOrder({ userId, ...orderData });
      response.status(201).json(result);
    } catch (err) {
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async getMyOrder(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { limit = "0", page = "1" } = request.query;
      const l = parseInt(limit.toString());
      const p = parseInt(page.toString());

      console.log("Fetching orders for userId:", request.params.userId);

      const result = await new OrderService().myOrders(request.params.userId, l, p);
      console.log("Result:", result);
      const orders: any = await new OrderService().myOrders(request.params.userId, 0, 0);
      response.status(200).json({ totalCount: orders.length, page: Number(page) ?? 0, limit: Number(limit) ?? 0, data: result, totalOrders: orders });
    } catch (err) {
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async getAll(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { limit = "0", page = "1" } = request.query;
      const l = parseInt(limit.toString());
      const p = parseInt(page.toString());
      const result = await new OrderService().getAllOrders(l, p);
      const orders: any = await new OrderService().getAllOrders(0, 0);
      response.status(200).json({ totalCount: orders.length, page: Number(page) ?? 0, limit: Number(limit) ?? 0, data: result, totalUsers: orders });
    } catch (err) {
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async updateStock(productId: string, quantity: number) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
  }

  static async update(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const orderId = request.params.id;
      const updatedData = request.body;

      const result = await new OrderService().updateOrder(orderId, updatedData);
      response.json(result);
    } catch (err) {
      console.error("Error:", err);
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async delete(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const orderId = request.params.id; // Extract orderId from URL

      // Call the deleteOrder function in the OrderService
      const result = await new OrderService().deleteOrder(orderId);
      response.json(result);
    } catch (err) {
      console.error("Error:", err);
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  // static async getRecommendedProducts(request: Request, response: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const userId = request.params.id;
  //     const recommendedProducts = await OrderService.getRecommendedProducts({ userId });
  //     response.json({ recommendedProducts });
  //   } catch (err) {
  //     console.error("Error:", err);
  //     const e: any = err ?? new Error(null);
  //     const error = JSON.parse(err.message);
  //     next({ code: error.code, message: error.message, error: error.error });
  //   }
  // }
}
