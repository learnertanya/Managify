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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("../../services/category.service");
// import Category from "../../models/category.model";
const database_config_1 = require("../../config/database.config");
/**
 * *Controller class for managing categories.
 */
class CategoryController {
    /**
     * *Creates a new category by handling the HTTP POST request.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next function to be called in the middleware chain.
     * @returns {Promise<void>} - A promise that resolves when the category is successfully created.
     * @throws {Error} - If there is an error while creating the category.
     */
    static create(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Add a new category using the CategoryService
                const result = yield new category_service_1.CategoryService().addCategory(request.body);
                // Responde with the created category and status code of 201 (created)
                response.status(201).json(result);
            }
            catch (err) {
                //Handle any error, if any ,parse them and pass to next midddleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     * *Retrieves a single category based on the provided ID.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves to nothing.
     * @throws {Error} - If an error occurs while retrieving the category.
     */
    static getOne(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch category details using CategoryService by ID
                const category = yield new category_service_1.CategoryService().getOne(request.params._id);
                // Respond with the fetched details and status code 200(success)
                response.status(200).json(category);
            }
            catch (err) {
                //Handle any error, if any ,parse them and pass to next midddleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     * *Retrieves all categories based on the provided filters.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves to void.
     * @throws {Error} - If an error occurs while retrieving the categories.
     */
    static getAll(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //destructure filters from request body
                const { filters } = request.body;
                // Fetch category details using CategoryService passing the filters
                const categories = yield new category_service_1.CategoryService().getAll(filters);
                // Respond with the fetched details and status code 200(success)
                response.status(200).json(categories);
            }
            catch (err) {
                //Handle any error, if any ,parse them and pass to next midddleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     * *Handles the dashboard Categories request and returns the categories hierarchy.
     * @param {Request} request - The request object.
     * @param {Response} response - The response object.
     * @param {NextFunction} next - The next function to call in the middleware chain.
     * @returns {Promise<void>} - None
     * @throws {Error} - If an error occurs during the process.
     */
    static dashboardCategories(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // fetch the cached dashboard categories from redis
                const cachedResult = yield database_config_1.db.get("dashboardCategories");
                // if the cached result is not null, return it
                if (cachedResult) {
                    // return the cached result
                    response.status(200).json(JSON.parse(cachedResult));
                }
                else {
                    // if the cached result is null, fetch the dashboard categories from the database using CategoryService
                    const result = yield new category_service_1.CategoryService().getCategoriesHierarchy();
                    // cache the result in redis
                    yield database_config_1.db.set("dashboardCategories", JSON.stringify(result));
                    // return the result
                    response.status(200).json(result);
                }
            }
            catch (err) {
                //Handle any error, if any ,parse them and pass to next midddleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     * *Updates a category with the given ID using the data from the request body.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next function to call in the middleware chain.
     * @returns {Promise<void>} - A promise that resolves when the category is updated.
     * @throws {Error} - If there is an error updating the category.
     */
    static update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Update the category using CategoryService
                const result = yield new category_service_1.CategoryService().updateCategory(request.params._id, Object.assign({}, request.body));
                // Respond with the updated category and status code 202(accepted)
                response.status(202).json(result);
            }
            catch (err) {
                //Handle any error, if any ,parse them and pass to next midddleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     * *Deletes a category based on the provided ID.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the category is deleted.
     * @throws {Error} - If there is an error deleting the category.
     */
    static delete(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Delete the category using CategoryService
                const result = yield new category_service_1.CategoryService().deleteCategory(request.params._id);
                // Respond with the deleted category and status code 202(accepted)
                response.status(202).json({ message: "Category deleted successfully", data: result });
            }
            catch (err) {
                //Handle any error, if any ,parse them and pass to next midddleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     *
     * *Uploads an image file and add its details to that specific category.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the image is uploaded successfully.
     * @throws {Error} - If there is an error during the upload process.
     */
    static uploadImage(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Retrieve the uploaded file from the request.
                const file = request.file;
                // Create a new image object with the filename and URL.
                const image = {
                    filename: file.filename,
                    url: file.path
                };
                // Save the image and get the result using CategoryService
                const result = yield new category_service_1.CategoryService().uploadImage(request.params.categoryId, image);
                // Respond with the image and status code 200(OK)
                response.status(200).json({ comment: "file uploaded successfully", data: result, newFile: image });
            }
            catch (err) {
                //Handle any error, if any ,parse them and pass to next midddleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     *
     * *Marks a category as featured.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the category is marked as featured.
     * @throws {Error} - If the category is not found, an error is thrown with a message "Category not found".
     *                   If any other error occurs, an error object is passed to the next middleware function.
     */
    static markAsFeatured(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Retrieve the category ID from the request parameters
                const { categoryId } = request.params;
                // Mark the category as featured using CategoryService
                const result = yield new category_service_1.CategoryService().markCategoryAsFeatured(categoryId);
                // Respond with the marked category and status code 200(OK)
                response.status(200).json(result);
            }
            catch (err) {
                //Handle any error, if any ,parse them and pass to next midddleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     *
     * *Marks a category as not featured.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the category is successfully unmarked as featured.
     * @throws {Error} - If the category is not found, an error with a message "Category not found" is thrown.
     *                   If any other error occurs, an error object with properties code, message, and error is passed to the next middleware.
     */
    static unMarkAsFeatured(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Retrieve the category ID from the request parameters
                const { categoryId } = request.params;
                // Mark the category as not featured using CategoryService
                const result = yield new category_service_1.CategoryService().umMarkCategoryAsFeatured(categoryId);
                // Respond with the unmarked category and status code 200(OK)
                response.status(200).json(result);
            }
            catch (err) {
                //Handle any error, if any ,parse them and pass to next midddleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     *
     * *Retrieves all marked featured categories from the database and returns them as a JSON response.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves to void.
     * @throws {Error} - If there is an error retrieving the categories from the database.
     */
    static getAllMarkedFeaturedCategories(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Retrieve all marked featured categories from the redis cache
                const cachedResult = yield database_config_1.db.get("featuredCategories");
                // if the cachedResult is not null, return it as a JSON response
                if (cachedResult) {
                    // return the cached result
                    response.status(200).json(JSON.parse(cachedResult));
                }
                else {
                    //if the cachedResult is null Retrieve all marked featured categories from the database
                    const result = yield new category_service_1.CategoryService().getAllMarkedFeaturedCategories();
                    // Save the result in the redis cache
                    yield database_config_1.db.set("featuredCategories", JSON.stringify(result));
                    // return the result
                    response.status(200).json(result);
                }
            }
            catch (err) {
                //Handle any error, if any ,parse them and pass to next midddleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     * *Handles the request for the homepage categories.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns None
     * @throws {Error} If an error occurs while handling the request.
     */
    static homepageCategories(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Todo: implement the home page category logic to show categories on homepage
                //Todo: subactegories for each category needs to be added in the databse for this purpose
            }
            catch (err) {
                //Handle any error, if any ,parse them and pass to next midddleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map