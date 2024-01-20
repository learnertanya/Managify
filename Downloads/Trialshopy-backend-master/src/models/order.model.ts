// Import Mongoose
import { Model, model, Schema } from "mongoose";
import user from "./user.model";
import product from "./product.model";

export const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: user,
    required: true
  },
  
  products: [
    {
      product: {
        type:Schema.Types.ObjectId,                  /*Schema.Types.ObjectId,*/
        ref: product,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      orderStatus: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered"],
        default: "pending"
      },
      
    }
  ],
  payment: [
    {
      transactionId: {
        type: String,
        required: true
      },
      totalAmount: {
        type: Number,
        required: true
      },
      paymentDate: {
        type: Date,
        default: Date.now
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  }, 
  phone_number: { type: String, required: true },
  shippingAddress: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered"],
    default: "pending"
  },
  exchangeReturnWindowClosedOn: {
    type: Date,
    required: false
  },
  rateProduct: {
    type: Boolean,
    default: false
  }
});

const Order: Model<any> = model<any>("order", orderSchema);

export default Order;
