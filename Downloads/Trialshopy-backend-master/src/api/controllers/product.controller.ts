import { NextFunction, Request, Response } from "express";
import { ProductService } from "./../../services/product.service";
import { IProduct, IProductUpdate, IBulkUpload } from "./../../interfaces/product.interface";
import { generateTemplateFileCSV } from "../../helpers/product.bulkUploadFormat";
import { ProductBulkUploader } from "../../helpers/product.bulkUpload";
import fs from "fs";
import mongoose from "mongoose";

export class ProductController {
  static async create(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      if (request.body.category?.length === 0) {
        response.status(401).json({ message: "Must add category to the product" });
      } else {
        const result: any = await new ProductService().create({ ...request.body, storeId: request.params.storeId, sellerId: request.params.sellerId });
        response.status(201).json(result);
      }
    } catch (err) {
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async getAll(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { limit = "0", page = "1" } = request.query;
      const l = parseInt(limit.toString());
      const p = parseInt(page.toString());

      const { filters, sortBy } = request.body;
      const sellerId = request.params.sellerId;
      const storeId = request.params.storeId;

      const productService = new ProductService();
      const result = await productService.getAll(sortBy, { sellerId: sellerId, storeId: storeId, ...filters }, l, p);

      response.status(200).json({ totalCount: result.length, page: Number(page) ?? 0, limit: Number(limit) ?? 0, data: result });
    } catch (err) {
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }
  static async getAll2(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { limit = "0", page = "1" } = request.query;
      const l = parseInt(limit.toString());
      const p = parseInt(page.toString());

      const { filters, sortBy } = request.body;

      const productService = new ProductService();
      const result = await productService.getAll2(sortBy, filters, l, p);

      response.status(200).json({ page: Number(page) ?? 0, limit: Number(limit) ?? 0, data: result });
    } catch (err) {
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async getOne(request: Request, response: Response, next: NextFunction): Promise<void> {
    if (!request.params._id) {
      throw new Error("No product id");
    }
    if (!request.params.storeId) {
      throw new Error("No store id");
    }
    if (!request.params.sellerId) {
      throw new Error("No seller id");
    }
    try {
      const product = await new ProductService().getOne(request.params.storeId, request.params.sellerId, request.params._id);
      if (!product) {
        response.status(404).json({ message: "No Product found" });
      } else {
        response.status(200).json(product);
      }
    } catch (err) {
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }
  static async getOne2(request: Request, response: Response, next: NextFunction): Promise<void> {
    if (!request.params._id) {
      throw new Error("No product id");
    }
    try {
      const product = await new ProductService().getOne2(request.params._id);
      if (!product) {
        response.status(404).json({ message: "No Product found" });
      } else {
        response.status(200).json(product);
      }
    } catch (err) {
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }
  static async update(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const productId = request.params.productId;
      const updatedProductData: IProductUpdate = { ...request.body };
      const updatedProduct = await new ProductService().update(request.params.storeId, request.params.sellerId, productId, updatedProductData);

      if (!updatedProduct) {
        response.status(404).json({ message: "Product not found" });
      } else {
        response.status(201).json(updatedProduct);
      }
    } catch (err) {
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async delete(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const productId = request.params.productId;
      await new ProductService().delete(request.params.storeId, request.params.sellerId, productId);
      response.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      next({ code: err.code || 500, message: err.message || "Internal Server Error", error: err });
    }
  }

  static async revoke(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const productId = request.params.productId;
      await new ProductService().revoke(productId);
      response.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async bulkUpload(request: IBulkUpload, response: Response, next: NextFunction): Promise<void> {
    try {
      if (!request.file) {
        throw new Error("No file uploaded! Please upload a csv file.");
      }
      const bulkUploader = new ProductBulkUploader(`./uploads/${request.file.filename}`, request.params.sellerId, request.params.storeId);
      bulkUploader
        .importProductsFromCSV()
        .then(() => {
          console.log("Products import completed!");
        })
        .catch((err) => {
          console.error("Error importing Products:", err);
        });

      response.status(200).json({ message: "File uploaded and processed successfully" });
    } catch (err) {
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async bulkUploadFormat(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      await generateTemplateFileCSV();

      const filePath = "./template.csv";
      const fileStream = fs.createReadStream(filePath);

      response.setHeader("Content-Type", "text/csv");
      response.setHeader("Content-Disposition", "attachment; filename=template.csv");

      fileStream.pipe(response);
    } catch (err) {
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async getByLetters(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { limit = "0", page = "1" } = request.query;
      const l = parseInt(limit.toString());
      const p = parseInt(page.toString());

      const letters = request.body.letters;
      const productService = new ProductService();
      const result = await productService.getByLetters(letters, l, p);
      const products = await productService.getByLetters(letters, 0, 0);
      response.status(200).json({ totalCount: products.length, page: Number(page) ?? 0, limit: Number(limit) ?? 0, data: result, totalProducts: products });
    } catch (err) {
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  //need more work
  // static async getByFilters(request: Request, response: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const { limit = "0", page = "1" } = request.query;
  //     const l = parseInt(limit.toString());
  //     const p = parseInt(page.toString());

  //     const { filters, sortBy } = request.body;

  //     const productService = new ProductService();
  //     const result = await productService.getByFilters(sortBy, filters, l, p);
  //     const products = await productService.getByFilters(sortBy, filters, 0, 0);
  //     response.status(200).json({ totalCount: products.length, page: Number(page) ?? 0, limit: Number(limit) ?? 0, data: result, totalProducts: products });
  //   } catch (err) {
  //     const e: any = err ?? new Error(null);
  //     const error = JSON.parse(err.message);
  //     next({ code: error.code, message: error.message, error: error.error });
  //   }
  // }

  static async getAllOffers(request: Request, response: Response, next: NextFunction): Promise<void> {
    const { limit = "10", page = "1" } = request.query;
    const l = parseInt(limit.toString());
    const p = parseInt(page.toString());
    try {
      const productService = new ProductService();
      const products = await productService.getAllOffers(l, p);
      response.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async deleteOffer(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const result = await new ProductService().deleteOffer(request.params.productId);
      response.json(result);
    } catch (err) {
      console.log({ err });
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async uploadImage(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      // const file = request.file as Express.Multer.File;
      // const image = {
      //   filename: file.filename,
      //   url: `/uploads/${file.filename}`
      // };
      const file = request.file;
      const image = {
        filename: file.filename,
        url: file.path
      };

      const result = await new ProductService().uploadImage(request.params.productId, image);

      response.status(200).json({ comment: "file uploaded successfully", data: result, newFile: image });
    } catch (err) {
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async categoryProduct(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      let categoryId = request.params._id ?? null;
      if (categoryId === "null") {
        categoryId = null;
      }
      console.log(categoryId);
      const { filters, sortBy } = request.body;

      const result = await new ProductService().categoryProducts(sortBy, filters, categoryId);
      response.status(200).json(result);
    } catch (err) {
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async getNewWeeklyProducts(request: Request, response: Response, next: NextFunction): Promise<void> {
    const categoryId = request.params.categoryId as string;
    console.log(categoryId, "categoryId");
    try {
      const result = await new ProductService().getNewWeeklyProducts(categoryId as string)
      response.status(200).json(result);
    } catch (err) {
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async nearbyProduct(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { filters, sortBy } = request.body;
      const { limit = "10", page = "1" } = request.query;
      const l = parseInt(limit.toString());
      const p = parseInt(page.toString());

      const categoryId = new mongoose.Types.ObjectId(request.params.id);

      const result = await new ProductService().getNearbyProducts(filters, categoryId, l, p);
    } catch (err) {
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }
}
