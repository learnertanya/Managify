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
exports.AddressService = void 0;
const address_model_1 = __importDefault(require("../models/address.model"));
/**
 * *Service class for managing addresses.
 */
class AddressService {
    /**
     * *Creates a new address record in the database.
     * @param {IAddress} data - The data object containing the address information.
     * @param {string} [language] - The language code for the address.
     * @returns {Promise<Address>} A promise that resolves to the saved address record.
     */
    createAddress(data, language) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create a new address
            const address = new address_model_1.default(data);
            // Save the address
            return address.save();
        });
    }
    /**
     ** Retrieves a list of addresses from the database.
     * @param {number} limit - The maximum number of addresses to retrieve.
     * @param {number} page - The page number of addresses to retrieve.
     * @param {string} [language] - The language of the addresses to retrieve. (optional)
     * @returns {Promise<Address[]>} - A promise that resolves to an array of addresses.
     */
    getAllAddress(limit, page, language) {
        return __awaiter(this, void 0, void 0, function* () {
            // Retrieve all addresses from the database with pagination
            const addresses = yield address_model_1.default.find()
                .limit(limit)
                .skip(page * limit)
                .lean()
                .exec();
            // Return the addresses
            return addresses;
        });
    }
    /**
     ** Retrieves addresses based on the provided reference ID and address type.
     * @param {string} refId - The reference ID to search for.
     * @param {addressType} type - The type of address to retrieve.
     * @param {string} [language] - Optional language parameter to filter addresses by language.
     * @returns {Promise<Address[]>} - A promise that resolves to an array of addresses matching the criteria.
     */
    getAddress(refId, type, language) {
        return __awaiter(this, void 0, void 0, function* () {
            // Retrieve addresses based on the provided reference ID and address type
            const addresses = yield address_model_1.default.find({ type: type, refId: refId, status: "active" }).exec();
            // Return the addresses
            return addresses;
        });
    }
    /**
     * *Updates an address with the given ID using the provided updated data.
     * @param {string} addressId - The ID of the address to update.
     * @param {any} updatedData - The updated data to apply to the address.
     * @param {string} language - The language to use for error messages.
     * @returns {Promise<any>} - A promise that resolves to the updated address.
     * @throws {Error} - If the address is not found or an error occurs during the update.
     */
    updateOneAddress(addressId, updatedData, language) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find the address by ID and update
                const result = yield address_model_1.default.findOneAndUpdate({ _id: addressId }, updatedData, { new: true }).exec();
                return result;
            }
            catch (error) {
                // Handle any errors
                console.error("Error in updateOneAddress:", error);
                throw new Error(`Error updating address: ${error.message}`);
            }
        });
    }
    /**
     * *Deletes an address with the specified addressId and updates its status to "inactive".
     * @param {string} addressId - The ID of the address to delete.
     * @param {string} [language] - The language to use for the operation.
     * @returns {Promise<Address>} A promise that resolves to the updated address object.
     */
    deleteAddress(addressId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            // Set the status of the address to "inactive"
            const result = yield address_model_1.default.findOneAndUpdate({ _id: addressId }, { $set: { status: "inactive" } }, { new: true }).exec();
            // Return the result
            return result;
        });
    }
    /**
     * *Revoke an address by its ID.
     * @param {string} addressId - The ID of the address to revoke.
     * @param {string} [language] - The language to use for error messages (optional).
     * @returns {Promise} A promise that resolves to the removed address.
     */
    revokeAddress(addressId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            // Remove the address from the database and return the removed address
            return yield address_model_1.default.findByIdAndRemove({ _id: addressId }).exec();
        });
    }
}
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map