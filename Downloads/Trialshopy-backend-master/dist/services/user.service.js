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
exports.UserService = void 0;
const user_interface_1 = require("../interfaces/user.interface");
const user_model_1 = __importDefault(require("../models/user.model"));
const address_model_1 = __importDefault(require("../models/address.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * *A service class for managing user-related operations.
 */
class UserService {
    /**
     * Creates a new user with the given data and saves it to the database.
     * @param {IUser} data - The user data object.
     * @param {string} [language] - The language of the user.
     * @returns {Promise<User>} A promise that resolves to the saved user object.
     */
    create(data, language) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.paymentDetails) {
                if (data.paymentDetails.paymentMethod === "card")
                    data.paymentDetails.paymentMethod = user_interface_1.PaymentMethod.card;
                if (data.paymentDetails.paymentMethod === "upi")
                    data.paymentDetails.paymentMethod = user_interface_1.PaymentMethod.upi;
                if (data.paymentDetails.paymentMethod === "netbanking")
                    data.paymentDetails.paymentMethod = user_interface_1.PaymentMethod.netbanking;
                if (data.paymentDetails.paymentMethod === "paypal")
                    data.paymentDetails.paymentMethod = user_interface_1.PaymentMethod.paypal;
                if (!data.paymentDetails.paymentMethod)
                    data.paymentDetails.paymentMethod = user_interface_1.PaymentMethod.default;
            }
            // Hash the password
            const saltRounds = 10; // Adjust this according to your security requirements
            const hashedPassword = yield bcrypt_1.default.hash(data.password, saltRounds);
            // Create a new user with the hashed password
            const user = new user_model_1.default(Object.assign(Object.assign({}, data), { password: hashedPassword, phone_number: "" }));
            // Save the user to the database
            return user.save();
        });
    }
    /**
     * *Retrieves a list of users with optional pagination and language filtering.
     * @param {number} limit - The maximum number of users to retrieve.
     * @param {number} page - The page number of the results to retrieve.
     * @param {string} [language] - Optional language filter for the users.
     * @returns {Promise<Array<Object>>} - A promise that resolves to an array of user objects with their address details.
     */
    getAll(limit, page, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.default.find()
                .limit(limit)
                .skip(page * limit)
                .lean()
                .exec();
            // Fetch address details for all users in parallel
            const userIds = users.map((user) => user._id);
            const addressDetails = yield address_model_1.default.find({ refId: { $in: userIds } }).exec();
            // Create a map of user IDs to address details for efficient lookup
            const addressMap = new Map();
            addressDetails.forEach((address) => {
                addressMap.set(address.refId.toString(), address);
            });
            // Merge user and address details
            const result = users.map((user) => {
                const address = addressMap.get(user._id.toString());
                return Object.assign(Object.assign({}, user), { addressDetails: address || null // Handle cases where address is not found
                 });
            });
            // Return the result
            return result;
        });
    }
    /**
     * *Retrieves a user and their associated address details from the database.
     * @param {string} userId - The ID of the user to retrieve.
     * @param {string} [language] - The language of the user.
     * @returns {Promise<User>} A promise that resolves to the user object with their address details.
     */
    getOne(userId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch user and address details
            const [user, address] = yield Promise.all([user_model_1.default.findOne({ _id: userId }).exec(), address_model_1.default.findOne({ refId: userId }).exec()]);
            if (user) {
                user.addressDetails = address || null; // Handle cases where address is not found
            }
            // Return the user
            return user;
        });
    }
    /**
     * *Updates a user's information in the database.
     * @param {string} userId - The ID of the user to update.
     * @param {IUserUpdate} body - The updated user information.
     * @param {string} [language] - The language of the user.
     * @returns An object containing the updated user data and address details.
     * @throws Error if password hashing fails.
     */
    updateOne(userId, body, language) {
        return __awaiter(this, void 0, void 0, function* () {
            let updatedFields = {};
            if (body.name)
                updatedFields.name = body.name;
            if (body.phone_number)
                updatedFields.phone_number = body.phone_number;
            if (body.dateOfBirth)
                updatedFields.dateOfBirth = body.dateOfBirth;
            if (body.gender)
                updatedFields.gender = body.gender;
            if (body.password) {
                const saltRounds = 10; // Adjust this according to your security requirements
                const hashedPassword = yield bcrypt_1.default.hash(body.password, saltRounds).catch((err) => {
                    throw new Error("Password hashing failed: " + err.message);
                });
                updatedFields.password = hashedPassword;
            }
            // Update the user document
            const userUpdateResult = yield user_model_1.default.findByIdAndUpdate(userId, updatedFields, { new: true }).exec();
            console.log(userUpdateResult);
            // Return the updated user
            return userUpdateResult;
        });
    }
    /**
     * Deletes a user with the specified userId and updates their status to "inactive".
     * @param {string} userId - The ID of the user to delete.
     * @param {string} [language] - The language of the user.
     * @returns {Promise<User>} A promise that resolves to the updated user object.
     */
    delete(userId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            // Set the status of the user to "inactive"
            const result = yield user_model_1.default.findOneAndUpdate({ _id: userId }, { $set: { status: "inactive" } }, { new: true }).exec();
            return result;
        });
    }
    /**
     * Revoke a user by their ID.
     * @param {string} userId - The ID of the user to revoke.
     * @param {string} [language] - The language of the user.
     * @returns {Promise<void>} - A promise that resolves when the user is revoked.
     */
    revoke(userId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            // Remove the user from the database
            return yield user_model_1.default.findByIdAndRemove({ _id: userId }).exec();
        });
    }
    /**
     * Uploads an image and updates the profile picture of a user.
     * @param {string} userId - The ID of the user.
     * @param {any} image - The image to upload.
     * @returns {Promise<any>} - A promise that resolves to the updated user object.
     */
    uploadImage(userId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            // Update the user image
            return yield user_model_1.default.findByIdAndUpdate(userId, { profilePic: image }).exec();
        });
    }
    /**
     * Updates the password for a user with the given user ID.
     * @param {string} userId - The ID of the user to update the password for.
     * @param {string} newPassword - The new password to set for the user.
     * @returns None
     */
    updatePassword(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            // Hash the new password
            const saltRounds = 10;
            const hashedPassword = yield bcrypt_1.default.hash(newPassword, saltRounds);
            // Update the password in the database
            yield user_model_1.default.updateOne({ _id: userId }, { password: hashedPassword });
        });
    }
    /**
     * Adds a product to the wishlist of a user.
     * @param {string} userId - The ID of the user.
     * @param {string} productId - The ID of the product to add to the wishlist.
     * @param {string} [language] - The language of the user.
     * @returns {Promise<User>} A promise that resolves to the updated user object with the added product in the wishlist.
     */
    static addWishList(userId, productId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            // Add the product to the user's wish list
            const add = yield user_model_1.default.findOneAndUpdate({ _id: userId }, { $push: { wishList: productId } }, { new: true }).exec();
            // Return the updated user
            return add;
        });
    }
    /**
     * Deletes a product from a user's wish list.
     * @param {string} userId - The ID of the user.
     * @param {string} productId - The ID of the product to be deleted.
     * @param {string} [language] - The language of the user.
     * @returns {Promise<object>} - A promise that resolves to the updated user object.
     */
    static deleteWishList(userId, productId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            // Delete the product from the user's wish list
            const result = yield user_model_1.default.findOneAndUpdate({ _id: userId }, { $pull: { wishList: productId } }, { new: true }).exec();
            return result;
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map