"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressDetails = exports.addressStatus = exports.addressType = void 0;
const mongoose_1 = require("mongoose");
var addressType;
(function (addressType) {
    addressType["user"] = "user";
    addressType["seller"] = "seller";
    addressType["store"] = "store";
})(addressType || (exports.addressType = addressType = {}));
var addressStatus;
(function (addressStatus) {
    addressStatus["active"] = "active";
    addressStatus["inactive"] = "inactive";
})(addressStatus || (exports.addressStatus = addressStatus = {}));
exports.addressDetails = new mongoose_1.Schema({
    refId: { type: String, required: true },
    type: { type: String, required: true, enum: Object.values(addressType) },
    status: { type: String, enum: Object.values(addressStatus), default: addressStatus.active },
    fullName: { type: String, required: false },
    PhoneNumber: { type: String, required: false },
    addressLine: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    landmark: { type: String, required: false },
    state: { type: String, required: true },
    country: { type: String, required: false, default: "India" },
    lastUsedAt: { type: Date },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: false
        },
        coordinates: {
            type: [Number],
            required: false
        }
    }
});
exports.addressDetails.index({ location: "2dsphere" });
exports.addressDetails.pre('save', function (next) {
    if (this.isModified()) {
        this.lastUsedAt = new Date();
    }
    next();
});
const Address = (0, mongoose_1.model)("address", exports.addressDetails);
exports.default = Address;
//# sourceMappingURL=address.model.js.map