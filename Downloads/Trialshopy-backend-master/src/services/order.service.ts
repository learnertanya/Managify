import Order from "../models/order.model";
import Product from "../models/product.model";
import { IorderUpdate } from "../interfaces/order.interface";

export class OrderService {
  static calculateRecommendedProducts: any;
  async updateStock(id: any, quantity: number) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
  }

  async createOrder(data: any) {
    const order = new Order(data);
    return order.save();
  }

  async myOrders(userId: string, limit: number, page: number) {
    const skip = (page - 1) * limit;
    const orders = await Order.find({ userId: userId }).populate("userId").limit(limit).skip(skip).lean().exec();
    return orders;
  }

  async getAllOrders(limit: number, page: number) {
    const orders = await Order.find()
      .limit(limit)
      .skip(page * limit)
      .lean()
      .exec();
    return orders;
  }

  async updateOrder(orderId: string, updatedData: IorderUpdate) {
    const order = await Order.findById(orderId);
    if (!order) {
      return {
        status: 404,
        comment: "Order not found"
      };
    }
    if (!Array.isArray(order.products)) {
      return {
        status: 400,
        comment: "Invalid products format"
      };
    }

    if (updatedData.status === "shipped") {
      for (const product of order.products) {
        await this.updateStock(product.product, product.quantity);
      }
    }

    order.status = updatedData.status;

    if (updatedData.status === "delivered") {
      order.deliveredAt = new Date();
    }

    await order.save({ validateBeforeSave: false });

    return {
      status: 200,
      message: "Order Updated"
    };
  }

  async deleteOrder(orderId: string) {
    const order = await Order.findById(orderId);
    if (!order) {
      return {
        status: 404,
        comment: "Order not found"
      };
    }

    await order.remove();

    return {
      status: 200,
      message: "Order Deleted"
    };
  }

  //   private async calculateRecommendedProducts(userId: any) {
  //     const customerOrders = await Order.find({ userId: userId }).lean();
  //     const productCounts = {};

  //     for (const order of customerOrders) {
  //       for (const product of order.products) {
  //         if (!productCounts[product.product.toString()]) {
  //           productCounts[product.product.toString()] = 0;
  //         }
  //         productCounts[product.product.toString()] += product.quantity;
  //       }
  //     }

  //     const sortedProducts = Object.keys(productCounts).sort((a, b) => productCounts[b] - productCounts[a]);
  //     const recommendedProducts = await Product.find({ _id: { $in: sortedProducts } }).lean();

  //     return recommendedProducts;
  //   }

  //   static async getRecommendedProducts({ userId }: { userId: string }): Promise<Product[]> {
  //     const recommendedProducts = await this.calculateRecommendedProducts(userId);
  //     return recommendedProducts;
  //   }
}

export const orderService = new OrderService();
