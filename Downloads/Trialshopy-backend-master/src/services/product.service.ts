import Product from "./../models/product.model";
import { IProduct, IProductUpdate } from "./../interfaces/product.interface";
import { buildQuery } from "../helpers/queryBuilder";
import Category from "../models/category.model";
import Store from "../models/store.model";
import mongoose from "mongoose";

export class ProductService {
  async create(data: IProduct): Promise<IProduct> {
    const product = new Product(data);
    return product.save();
  }

  async getAll(sortBy: string, filters: Record<string, any>, limit: number, page: number): Promise<IProduct[] | null> {
    const query = buildQuery(filters);

    const products = await Product.find(query)
      // .populate("brandId")
      .populate("sellerId")
      .populate("storeId")
      .limit(limit)
      .skip(limit * page)
      .sort(sortBy)
      .lean()
      .exec();

    // console.log(products);

    return products as IProduct[];
  }
  async getAll2(sortBy: string, filters: Record<string, any>, limit: number, page: number): Promise<IProduct[] | null> {
    const query = buildQuery(filters);

    const products = await Product.find(query)
      // .populate("brandId")
      // .populate("sellerId")
      // .populate("storeId")
      .limit(limit)
      .skip(limit * page)
      .sort(sortBy)
      .lean()
      .exec();

    return products as IProduct[];
  }

  async getOne(storeId: string, sellerId: string, productId: string): Promise<IProduct | null> {
    return (
      Product.findOne({ storeId: storeId, sellerId, _id: productId })
        .populate("brandId")
        .populate("sellerId")
        .populate("storeId")
        // .populate('categoryId')
        .exec()
    );
  }
  async getOne2(productId: string): Promise<IProduct | null> {
    return (
      Product.findOne({ _id: productId })
        .populate("brandId")
        .populate("sellerId")
        .populate("storeId")
        // .populate('categoryId')
        .exec()
    );
  }

  async update(storeId: string, sellerId: string, productId: string, data: IProductUpdate): Promise<IProduct | null> {
    return await Product.findOneAndUpdate({ storeId: storeId, _id: productId }, data, { new: true }).exec();
  }

  async delete(storeId: string, sellerId: string, productId: string): Promise<void> {
    return await Product.findOneAndUpdate({ storeId: storeId, _id: productId, $set: { status: "inactive" } }, { new: true }).exec();
  }

  async revoke(productId: string): Promise<void> {
    return await Product.findByIdAndRemove(productId).exec();
  }

  // async getByLettersSuggestions(letters: string): Promise<String[] | null> {
  //   const regex = new RegExp(letters, "i");
  //   const products = await Product.find({ name: regex }).limit(10).exec();
  //   const suggestions = products.map((product) => product.name);
  //   return suggestions;
  // }

  async getByLetters(letters: string, limit: number, page: number): Promise<IProduct[] | null> {
    // console.log(letters);

    const regex = new RegExp(letters, "i");
    // console.log(regex);

    const products = await Product.find({ productName: regex })
      .populate("brandId")
      .populate("sellerId")
      .populate("storeId")
      .limit(limit)
      .skip(limit * page)
      .lean()
      .exec();
    return products as IProduct[];
  }

  // async getByFilters(sortBy: string, filters: Record<string, any>, limit: number, page: number): Promise<IProduct[]> {
  //   try {
  //     const { minPrice, maxPrice, categories, tags, status, minDiscount, brand , storeId} = filters;

  //     const query: Record<string, any> = {};

  //     if (minPrice !== undefined && maxPrice !== undefined) {
  //       query.price = { $gte: minPrice, $lte: maxPrice };
  //     }

  //     if (categories && categories.length > 0) {
  //       query.categories = { $in: categories };
  //     }

  //     if (tags && tags.length > 0) {
  //       query.tags = { $in: tags };
  //     }

  //     if (status !== undefined) {
  //       query.status = status;
  //     }

  //     if (minDiscount !== undefined) {
  //       query.discount = { $gte: minDiscount };
  //     }

  //     if (brand !== undefined) {
  //       query.brand = brand;
  //     }

  //     if (storeId !== undefined) {
  //       query.storeId = storeId;
  //     }

  //     const products = await Product.find(query)
  //       .populate("brandId")
  //       .populate("sellerId")
  //       .populate("storeId")
  //       .limit(limit)
  //       .skip(limit * page)
  //       .sort(sortBy)
  //       .lean()
  //       .exec();

  //     return products as IProduct[];
  //   } catch (error) {
  //     throw new Error(JSON.stringify({ code: 500, message: "Internal Server Error", error }));
  //   }
  // }

  async getAllOffers(limit: number, page: number, language?: string) {
    const offers = await Product.find({ discount: { $gt: 0 } })
      .populate("brandId")
      .populate("sellerId")
      .populate("storeId")
      .limit(limit)
      .skip(page * limit)
      .lean()
      .exec();
    return offers;
  }

  async deleteOffer(productId: string) {
    const result = await Product.findOneAndUpdate({ _id: productId }, { $set: { discount: 0 } }, { new: true }).exec();
    return result;
  }

  async uploadImage(productId: string, image: any) {
    return await Product.findByIdAndUpdate(productId, { $push: { images: image } }).exec();
  }

  async categoryProducts(sortBy: string, filters: Record<string, any>, categoryId: string | null): Promise<{ [subcategory: string]: any[] }> {
    const subcategories = await Category.find({ parent: categoryId }).exec();

    console.log("subcategories", subcategories);

    const productsBySubcategory = {};

    for (const subcategory of subcategories) {
      const subcategoryId = subcategory._id;
      const query = buildQuery({ categories: [subcategoryId] });
      const products = await Product.find(query).populate("sellerId").populate("storeId").lean().exec();
      console.log("products", products);
      productsBySubcategory[subcategory.name] = products;
    }

    return productsBySubcategory;
  }

  async getNewWeeklyProducts(categoryId: string) {
    return await Product.find({ categories: { $in: [categoryId] } });
  }

  async getNearbyProducts(filters: Record<string, any>, categoryId: mongoose.Types.ObjectId | null, limit: number, page: number): Promise<{ [subcategory: string]: any[] }> {
    const result: { [subcategory: string]: any[] } = {};

    // Fetch stores based on filters
    const query: any = buildQuery(filters);
    const nearbyStores = await Store.find(query).select("_id").exec(); // Select only store IDs
    // console.log("nearbyStores", nearbyStores);
    // Fetch subcategories based on the categoryId
    const subcategories = await Category.find({ parent: categoryId }).exec();

    // Create a map to store products by subcategory
    const productsBySubcategory = new Map<string, any[]>();

    // Iterate through nearby stores and query products for each store
    for (const store of nearbyStores) {
      const storeId = store._id;
      // Query products associated with the current store
      const products = await Product.find({ storeId: storeId })
        .skip(page * limit)
        .limit(limit)
        .lean()
        .exec();
      // console.log("products" ,products);

      // Group products by subcategory
      products.forEach((product) => {
        // console.log(product);
        const categoryIds = product.categories;
        // console.log("categoryIds", categoryIds);
        const subcategoryId = categoryIds.find((catId) => subcategories.some((subcategory) => subcategory._id.equals(catId)));
        // console.log("subcategoryId", subcategoryId);
        if (subcategoryId) {
          const subcategoryName = subcategories.find((subcategory) => subcategory._id.equals(subcategoryId))?.name;

          if (subcategoryName) {
            if (!productsBySubcategory.has(subcategoryName)) {
              productsBySubcategory.set(subcategoryName, []);
            }

            productsBySubcategory.get(subcategoryName)?.push(product);
          }
        }
      });
    }
    // Convert the map to the desired result format
    productsBySubcategory.forEach((products, subcategoryName) => {
      result[subcategoryName] = products;
    });

    return result;
  }
}
