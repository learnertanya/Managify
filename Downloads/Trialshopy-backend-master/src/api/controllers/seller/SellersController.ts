import { Request, Response, NextFunction } from "express";
import Seller from "../../../models/seller.model";
import Product from "../../../models/product.model";
import mongoose, { Types } from "mongoose";
import jwt from "jsonwebtoken";

export class SellersController {
  // Later have to update login logic
  static async login(req: Request, res: Response): Promise<void> {
    const { email, phone, password } = req.body;
    // Either Phone or Email
    console.log(email);
    console.log(phone);
    if (email) {
      // check if this email exist in seller
      const user = await Seller.findOne({ email }).exec();
      console.log(user);
      if (!user) {
        // if seller doesn't exist
        res.status(400).json({ error: "Seller does not exist with the provided Email/Phone." });
      }
      // If email exists validate password
      if (password === user.password) {
        // If password is correct create a session for 1 hour and send the seller info
        // Generate a JWT token
        const token = jwt.sign({ user }, "trialshopy", { expiresIn: "1h" });

        res.json({ token, user });
        // res.status(201).json({ sellerInfo: user });
      } else {
        res.status(404).json({ error: "Password wrong!" });
      }
    } else {
      // check if this phone exist in seller
      const user = await Seller.findOne({ phoneNumber: phone }).exec();

      if (!user) {
        // if seller doesn't exist
        res.status(400).json({ error: "Seller does not exist with the provided Email/Phone." });
      }
      // If phone exists validate password
      if (password === user.password) {
        // If password is correct create a session for 1 hour and send the seller info
        // Generate a JWT token
        const token = jwt.sign({ user }, "trialshopy", { expiresIn: "1h" });
        res.status(201).json({ token, sellerInfo: user });
      } else {
        res.status(404).json({ error: "Password wrong!" });
      }
    }
  }

  static logout(req: Request, res: Response) {
    // clear the session, can be done at front end
    // localStorage.removeItem("_token");
    res.status(200).json({ message: "Logged Out!" });
  }

  static async getAllProducts(req: Request, res: Response) {
    const seller: any = req.user;
    // console.log(seller.user);
    // check if _id is valid mongodb id
    // if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ error: "Invalid Seller Id" });
    // check if seller exist with this id
    // const seller = Seller.findOne({ _id }).exec();
    // if (!seller) return res.status(404).json({ error: "Seller does not exist with this id!" });

    // console.log("seller._id ", seller.user._id);
    const sellerId = new mongoose.Types.ObjectId(seller.user._id);
    // console.log("mongodb: ", sellerId);

    const products = await Product.find({ sellerId }).exec();
    // console.log(products);
    let stores = new Map();
    products.forEach((product) => {
      if (!stores.has(product.storeId)) {
        stores[product.storeId] = [];
      }
      stores[product.storeId].push(product);
    });
    res.status(200).json({ products, stores });
    // res.status(200).json({ message: "Authenticated req!!" });
  }
}
