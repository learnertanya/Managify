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
exports.UserController = void 0;
const user_service_1 = require("./../../services/user.service");
const cart_model_1 = __importDefault(require("../../models/cart.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
// import { Reject } from "twilio/lib/twiml/VoiceResponse";
// import Address from "../../models/address.model";
/**
 * *Controller class for handling user-related operations.
 */
class UserController {
    // @validateRequestBody(userCreation)
    /**
     * *Creates a new user and adds them to the database.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the user is created.
     * @throws {Error} - If there is an error creating the user.
     */
    static create(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                //search in database if user with given email exixts
                const user = yield user_model_1.default.findOne({ email: request.body.email });
                // console.log(user);
                if (user) {
                    //if user with same email exists responde with error message
                    response.status(401).json({ message: "email already exist" });
                }
                else {
                    //else if user with smae email doesn't exist create new user using UserService
                    const result = yield new user_service_1.UserService().create(Object.assign({}, request.body), language);
                    //initialize an empty cart for the user
                    const userCart = {
                        customerId: result._id,
                        items: [],
                        document: []
                    };
                    //save cart in database
                    yield cart_model_1.default.create(userCart);
                    //respond with success message
                    response.status(201).json(result);
                }
            }
            catch (err) {
                //Handle any error and pass to the next middleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    // @validateRequestBody(userAdd)
    /**
     * *Adds a new user to the system.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next function to call in the middleware chain.
     * @returns {Promise<void>} - A promise that resolves when the user is added successfully.
     * @throws {Error} - If there is an error during the user creation process.
     */
    static add(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                const user = yield user_model_1.default.find({ email: request.body.email });
                if (user) {
                    response.status(401).json({ message: "email already exist" });
                }
                else {
                    const result = yield new user_service_1.UserService().create(Object.assign({}, request.body), language);
                    const userCart = {
                        customerId: result._id,
                        items: [],
                        document: []
                    };
                    yield cart_model_1.default.create(userCart);
                    response.status(201).json(result);
                }
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     * *Retrieves all users from the UserService based on the provided request parameters.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     * @throws {Error} - If an error occurs during the operation.
     */
    static getAll(request, response, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Destructure limit and page number from request
                const { limit = "0", page = "1" } = request.query;
                // Parse them to integers
                const l = parseInt(limit.toString());
                const p = parseInt(page.toString());
                // Call the UserService's getAll method
                const result = yield new user_service_1.UserService().getAll(l, p);
                // Send the response with status code 200 and the result
                response.status(200).json({ page: (_a = Number(page)) !== null && _a !== void 0 ? _a : 0, limit: (_b = Number(limit)) !== null && _b !== void 0 ? _b : 0, data: result });
            }
            catch (err) {
                // Pass the error to the next middleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     * *Retrieves a single user based on the provided ID
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the user is retrieved and the response is sent.
     * @throws {Error} - If an error occurs during the retrieval process.
     */
    static getOne(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                // Call the UserService's getOne method passing the userId from request params
                const result = yield new user_service_1.UserService().getOne(request.params._id, language);
                // Send the response with status code 200 and the result
                response.status(200).json(result);
            }
            catch (err) {
                // Pass the error to the next middleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    // @validateRequestBody(userUpdate)
    /**
     * *Updates a user's information based on the provided request parameters and body.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next function to call in the middleware chain.
     * @returns {Promise<void>} - A promise that resolves when the update is complete.
     * @throws {Error} - If an error occurs during the update process.
     */
    static update(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                // Call the UserService's updateOne method passing the userId from request params and body
                const result = yield new user_service_1.UserService().updateOne(request.params._id, request.body, language);
                // Send the response with status code 202 and the result
                response.status(202).json(result);
            }
            catch (err) {
                // Pass the error to the next middleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     * *Deletes a user based on the provided ID.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the user is deleted.
     * @throws {Error} - If there is an error during the deletion process.
     */
    static delete(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                // Call the UserService's delete method passing the userId from request params
                const result = yield new user_service_1.UserService().delete(request.params._id, language);
                // Send the response with status code 202 and the result
                response.status(202).json(result);
            }
            catch (err) {
                // Pass the error to the next middleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     * *Revoke a user based on the provided  user ID.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the user's access is revoked.
     * @throws {Error} - If an error occurs during the revocation process.
     */
    static revoke(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                // Call the UserService's revoke method passing the userId from request params
                const result = yield new user_service_1.UserService().revoke(request.params._id, language);
                // Send the response with status code 202 and the result
                response.status(202).json(result);
            }
            catch (err) {
                //Pass the error to the next middleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     * *Handles the upload of user Profile picture from a request and stores it in the user's collection.
     * @param {Request} request - The request object.
     * @param {Response} response - The response object.
     * @param {NextFunction} next - The next function to call in the middleware chain.
     * @returns {Promise<void>} - A promise that resolves when the file is uploaded and stored successfully.
     * @throws {Error} - If there is an error during the upload process.
     */
    static uploadFile(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if a file was uploaded
                if (request.file === undefined)
                    response.json("you must select a file.");
                // Create an image object
                const file = request.file;
                const image = {
                    filename: file.filename,
                    url: file.path
                };
                // Call the UserService's uploadImage method passing the userId from request params and image to save the image details in user's collection
                const result = yield new user_service_1.UserService().uploadImage(request.params.userId, image);
                // Send the response with status code 202 and the result
                response.status(202).json({ comment: "File stored successfully", newFile: image, data: result });
            }
            catch (err) {
                // Pass the error to the next middleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     * *Adds a product to the user's wishlist.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the wishlist is successfully updated.
     * @throws {Error} - If there is an error adding the product to the wishlist.
     */
    static addWishList(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                // Call the UserService's addWishList method passing the userId from request params and productId from request params
                const result = yield user_service_1.UserService.addWishList(request.params.userId, request.params.productId, language);
                // Send the response with status code 201 and the result
                response.status(201).json(result);
            }
            catch (err) {
                // Pass the error to the next middleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     * *Deletes a product from a user's wishlist.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the wishlist is successfully deleted.
     * @throws {Error} - If there is an error during the deletion process.
     */
    static deleteWishList(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                // Call the UserService's deleteWishList method passing the userId from request params and productId from request params
                const result = yield user_service_1.UserService.deleteWishList(request.params.userId, request.params.productId, language);
                // Send the response with status code 202 and the result
                response.status(202).json(result);
            }
            catch (err) {
                // Pass the error to the next middleware
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map