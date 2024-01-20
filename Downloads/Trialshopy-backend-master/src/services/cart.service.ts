import Cart from "../models/cart.model";
import Product from "../models/product.model";
import { ICart } from "../interfaces/cart.interface";

export class CartService{
    async getCart( customerId : string , language ?: string ) {
        const cart = await Cart.find({customerId: customerId})
        .populate('items.productId')
        .exec();
        return cart;
    }

    async addItem(productId : string , customerId : string, language ?: string){
        const product = await Product.findOne({_id:productId}).exec();
        const cart = await Cart.findOne({customerId:customerId}).exec();
        if(product){
            if(cart){
                cart.items.push({productId:productId, count:1});
                await cart.save();
                return {ItemAddition : "Succesful" , CartData : cart};
            }
            else{
                return {ItemAddition : "Unsuccesful" , Comment : "Cart not found"};
            }
        }else{
            return {ItemAddition : "Unsuccesful" , Comment : "Product not found"};
        }
        
    }

    async updateCount(customerId : string, _id: string, newCount: Number){
            const cart = await Cart.findOne({ customerId:customerId });
            if(!cart) return {Comment: "Cart not found"};
            const itemIndex = cart.items.findIndex(item => item._id.toString() === _id);
            if (itemIndex === -1) {
              return {Comment: 'Item not found in the cart'};
            }
            cart.items[itemIndex].count = newCount;
            await cart.save();
            return cart;
    }

    async deleteItem(customerId : string, _id: string){
        const cart = await Cart.findOne({ customerId:customerId });
        if(!cart) return {Comment: "Cart not found"};
        const itemIndex = cart.items.findIndex(item => item._id.toString() === _id);
        cart.items.splice(itemIndex, itemIndex);
        await cart.save();
        return cart;
    }
}