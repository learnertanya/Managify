import { Model, SortOrder } from "mongoose";

export class SearchService {
  private model: Model<any>;

  constructor(model: Model<any>) {
    this.model = model;
  }

  async search(queryParams: any): Promise<any[]> {
    try {
      const lowercaseQuery = queryParams.q.toLowerCase();

      const query = {
        $or: [{ productName: { $regex: lowercaseQuery, $options: "i" } }, { shortDescription: { $regex: lowercaseQuery, $options: "i" } }]
      };

      if (queryParams.filter) {
        if (queryParams.filterField === "manufacturer") {
          query["manufacturer"] = queryParams.filter;
        } else if (queryParams.filterField === "status") {
          query["status"] = queryParams.filter;
        } else if (queryParams.filterField === "price") {
          query["price"] = queryParams.filter;
        } else if (queryParams.filterField === "inStock") {
          query["inStock"] = queryParams.filter;
        } else if (queryParams.filterField === "stock") {
          query["stock"] = queryParams.filter;
        } else if (queryParams.filterField === "category") {
          query["categories"] = queryParams.filter;
        } else if (queryParams.filterField === "productName") {
          query["productName"] = queryParams.filter;
        } else if (queryParams.filterField === "status") {
          query["status"] = queryParams.filter;
        } else if (queryParams.filterField === "manufacturer") {
          query["manufacturer"] = queryParams.filter;
        } else if (queryParams.filterField === "isDiscount") {
          query["isDiscount"] = queryParams.filter;
        } else if (queryParams.filterField === "rating") {
          query["rating"] = queryParams.filter;
        }
      }

      const sortField = queryParams.sort || "productName";
      const sortOrder = queryParams.order === "desc" ? -1 : 1;
      const sortOptions = { [sortField]: sortOrder } as Record<string, SortOrder>;

      const searchResults = await this.model.find(query).sort(sortOptions).exec();
      return searchResults;
    } catch (error) {
      console.error(error);
      throw new Error("Error performing search");
    }
  }
}
