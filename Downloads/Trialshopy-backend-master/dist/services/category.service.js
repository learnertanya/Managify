"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
const queryBuilder_1 = require("../helpers/queryBuilder");
/**
 * *Service class for managing categories.
 */
class CategoryService {
    /**
     * *Adds a new category to the database.
     * @param {any} data - The data object containing the category information.
     * @returns {Promise<Category>} A promise that resolves to the saved category object.
     */
    addCategory(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create a new category
            const category = new category_model_1.default(data);
            // Save the category
            return category.save();
        });
    }
    /**
     *
     * *Retrieves a single category from the database based on the provided category ID.
     * @param {string} categoryId - The ID of the category to retrieve.
     * @returns {Promise<Category>} A promise that resolves to the retrieved category object.
     */
    getOne(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find the category by ID
            return yield category_model_1.default.findOne({ _id: categoryId }).exec();
        });
    }
    /**
     *
     * *Retrieves all categories from the database that match the given filters.
     * @param {Record<string, any>} filters - The filters to apply to the query.
     * @returns {Promise<Category[]>} - A promise that resolves to an array of Category objects.
     */
    getAll(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            //build the database query using buildQuery function
            const query = (0, queryBuilder_1.buildQuery)(filters);
            // Find all categories that match the query and return
            return yield category_model_1.default.find(query).exec();
        });
    }
    /**
     *
     * *Retrieves the hierarchy of categories from the database.
     * @returns {Promise<Array<Object>>} - A promise that resolves to an array of category objects representing the category hierarchy.
     */
    getCategoriesHierarchy() {
        return __awaiter(this, void 0, void 0, function* () {
            // Find all categories from dastabase
            // Here all Category contains 35 documents; called db 1st time
            const allCategories = yield category_model_1.default.find().exec();
            // Builds the category tree
            function buildCategoryTree(category) {
                return __awaiter(this, void 0, void 0, function* () {
                    // Find all children of the current category
                    // Why do we need to query db again ??
                    const children = yield category_model_1.default.find({ parent: category._id }).exec();
                    // If there is at least one child, recursively build the tree
                    if (children.length > 0) {
                        // Recursively build the category tree for each child
                        const childPromises = children.map((child) => buildCategoryTree(child));
                        // Resolve all child promises
                        const resolvedChildren = yield Promise.all(childPromises);
                        // Return the category object with its children
                        return Object.assign(Object.assign({}, category.toObject()), { children: resolvedChildren });
                    }
                    else {
                        // if there are no children return the category object
                        return Object.assign({}, category.toObject());
                    }
                });
            }
            // Call the buildCategoryTree function for each category whose parent is null
            const categoryTreePromises = allCategories.filter((category) => !category.parent).map((category) => buildCategoryTree(category));
            // Resolve all category tree promises
            const categoryTree = yield Promise.all(categoryTreePromises);
            // Return the category tree
            return categoryTree;
        });
    }
    /**
     * *Updates a category with the given ID using the provided data.
     * @param {string} categoryId - The ID of the category to update.
     * @param {any} data - The data to update the category with.
     * @returns {Promise<any>} - A promise that resolves to the updated category.
     */
    updateCategory(categoryId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            //find and update the category and return it
            return yield category_model_1.default.findByIdAndUpdate(categoryId, data, {
                new: true
            }).exec();
        });
    }
    /**
     * *Deletes a category from the database based on the provided category ID.
     * @param {string} categoryId - The ID of the category to delete.
     * @returns {Promise} A promise that resolves to the deleted category.
     */
    deleteCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            //find and delete the category and return it
            return yield category_model_1.default.findByIdAndDelete(categoryId).exec();
        });
    }
    /**
     *
     * *Update the image of category.
     * @param {string} categoryId - The ID of the category to upload the image to.
     * @param {any} image - The image to upload.
     * @returns {Promise<Category>} A promise that resolves to the updated category object.
     */
    uploadImage(categoryId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            // Update the category image
            return yield category_model_1.default.findByIdAndUpdate(categoryId, { image: image }).exec();
        });
    }
    /**
     * *Marks a category as featured by setting the "featured" property to true.
     * @param {string} categoryId - The ID of the category to mark as featured.
     * @returns {Promise<{ message: string, category: Category }>} - A promise that resolves to an object containing a success message and the updated category.
     * @throws {Error} - If the category is not found or an error occurs during the process.
     */
    markCategoryAsFeatured(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find the category by ID
                const category = yield category_model_1.default.findById(categoryId).exec();
                // Check if the category exists
                if (!category) {
                    // Throw an error if the category is not found
                    throw new Error("Category not found");
                }
                // Update the category's status to mark it as featured
                category.featured = true;
                // Save the updated category
                yield category.save();
                // Return the updated category
                return { message: "Category marked as featured", category };
            }
            catch (error) {
                // Throw an error if an error occurs during the process
                throw new Error(error.message);
            }
        });
    }
    /**
     * *Marks a category as not featured.
     * @param {string} categoryId - The ID of the category to mark as not featured.
     * @returns {Promise<{ message: string, category: Category }>} - A promise that resolves to an object containing a message and the updated category.
     * @throws {Error} - If the category is not found or an error occurs during the process.
     */
    umMarkCategoryAsFeatured(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find the category by ID
                const category = yield category_model_1.default.findById(categoryId).exec();
                // Check if the category exists
                if (!category) {
                    // Throw an error if the category is not found
                    throw new Error("Category not found");
                }
                // Update the category's status to mark it as featured
                category.featured = false;
                // Save the updated category
                yield category.save();
                // Return the updated category
                return { message: "Category unmarked as featured", category };
            }
            catch (error) {
                // Throw an error if an error occurs during the process
                throw new Error(error.message);
            }
        });
    }
    /**
     * *Retrieves all marked featured categories from the database and builds a category tree structure.
     * @returns {Promise<ICategory[]>} - A promise that resolves to an array of featured categories.
     * @throws {Error} - If there is an error fetching the featured categories.
     */
    getAllMarkedFeaturedCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Retrieve all marked featured categories
                const allCategories = yield category_model_1.default.find().exec();
                // Builds the category tree
                function buildCategoryTree(category) {
                    return __awaiter(this, void 0, void 0, function* () {
                        // Find all children of the current category
                        const children = yield category_model_1.default.find({ parent: category._id }).exec();
                        // If there is at least one child, recursively build the tree
                        if (children.length > 0) {
                            // Recursively build the category tree for each child
                            const childPromises = children.map((child) => buildCategoryTree(child));
                            // Resolve all child promises
                            const resolvedChildren = yield Promise.all(childPromises);
                            // Return the category with its children
                            return Object.assign(Object.assign({}, category.toObject()), { children: resolvedChildren });
                        }
                        else {
                            // If there are no children, return the category
                            return Object.assign({}, category.toObject());
                        }
                    });
                }
                // Build the category tree for each marked featured category
                const featuredCategoriesPromises = allCategories.filter((category) => category.featured === true).map((category) => buildCategoryTree(category));
                // Resolve all category tree promises
                const featuredCategories = yield Promise.all(featuredCategoriesPromises);
                // Return the category tree
                return featuredCategories;
            }
            catch (error) {
                // Throw an error if there is an error fetching the featured categories
                throw new Error("Error fetching featured categories");
            }
        });
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map