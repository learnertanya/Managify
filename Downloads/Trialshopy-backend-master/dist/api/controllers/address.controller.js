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
exports.AddressController = void 0;
const address_service_1 = require("../../services/address.service");
/**
 * *Controller class for handling address-related operations.
 */
class AddressController {
    // @validateRequestBody(addressCreation)
    /**
     * *Creates a new address using the provided request data.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next function to call in the middleware chain.
     * @returns {Promise<void>} - A promise that resolves when the address is created.
     * @throws {Error} - If there is an error creating the address.
     */
    static createAddress(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                // Create a new address using the AddressService
                const result = yield new address_service_1.AddressService().createAddress(Object.assign({}, request.body), language);
                // Respond with the created address and a status code of 201 (Created).
                response.status(201).json(result);
            }
            catch (err) {
                // Handle any errors, parse them, and pass them to the next middleware.
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     * *Retrieves all addresses with pagination.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     * @throws {Error} - If an error occurs during the operation.
     */
    static getAllAddress(request, response, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extract limit and page from request query
                const { limit = "10", page = "1" } = request.query;
                const l = parseInt(limit.toString());
                const p = parseInt(page.toString());
                // Fetch addresses
                const result = yield new address_service_1.AddressService().getAllAddress(l, p);
                // Fetch all addresses using the AddressService
                const addresses = yield new address_service_1.AddressService().getAllAddress(0, 0);
                // Prepare response
                response.status(200).json({
                    totalCount: addresses.length,
                    page: (_a = Number(page)) !== null && _a !== void 0 ? _a : 0,
                    limit: (_b = Number(limit)) !== null && _b !== void 0 ? _b : 0,
                    data: result,
                    totalAddresses: addresses
                });
            }
            catch (err) {
                // Handle error
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({
                    code: error.code,
                    message: error.message,
                    error: error.error
                });
            }
        });
    }
    /**
     * *Retrieves an address based on the provided reference ID and address type.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves to nothing.
     * @throws {Error} - If an error occurs during the address retrieval process.
     */
    static getAddress(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const type = request.params.type;
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                //Fetch address using the provided reference ID and address type
                const result = yield new address_service_1.AddressService().getAddress(request.params.refId, type, language);
                // Respond with the fetched address and a status code of 200 (OK).
                response.status(200).json(result);
            }
            catch (err) {
                // Handle any errors, parse them, and pass them to the next middleware.
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    // @validateRequestBody(addressUpdate)
    /**
     * *Updates an address based on the provided request parameters and body.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the address is updated.
     * @throws {Error} - If an error occurs during the update process.
     */
    static updateAddress(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                //Call the AddressService to update the address
                const result = yield new address_service_1.AddressService().updateOneAddress(request.params._id, request.body, language);
                // Respond with the updated address and a status code of 202 (Accepted).
                response.status(202).json(result);
            }
            catch (err) {
                // Handle any errors, parse them, and pass them to the next middleware.
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     * *Deletes an address based on the provided ID.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the address is deleted.
     * @throws {Error} - If an error occurs during the deletion process.
     */
    static deleteAddress(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                //Call the AddressService to delete the address
                const result = yield new address_service_1.AddressService().deleteAddress(request.params._id, language);
                // Respond with the deleted address and a status code of 202 (Accepted).
                response.status(202).json(result);
            }
            catch (err) {
                // Handle any errors, parse them, and pass them to the next middleware.
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    /**
     * *Revoke an address by its ID.
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the address is revoked.
     * @throws {Error} - If an error occurs during the revocation process.
     */
    static revokeAddress(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                //Call the AddressService to revoke the address
                const result = yield new address_service_1.AddressService().revokeAddress(request.params._id, language);
                // Respond with the revoked address and a status code of 202 (Accepted).
                response.status(202).json(result);
            }
            catch (err) {
                // Handle any errors, parse them, and pass them to the next middleware.
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
}
exports.AddressController = AddressController;
//# sourceMappingURL=address.controller.js.map