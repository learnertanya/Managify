"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerDetails = exports.roleType = exports.level = exports.sellerStatus = void 0;
const mongoose_1 = require("mongoose");
var sellerStatus;
(function (sellerStatus) {
    sellerStatus["active"] = "active";
    sellerStatus["inactive"] = "inactive";
    sellerStatus["pending"] = "pending";
})(sellerStatus || (exports.sellerStatus = sellerStatus = {}));
var level;
(function (level) {
    level["one"] = "1";
    level["two"] = "2";
    level["three"] = "3";
})(level || (exports.level = level = {}));
var roleType;
(function (roleType) {
    roleType["seller"] = "seller";
    roleType["admin"] = "admin";
    roleType["storeManager"] = "storeManager";
    roleType["storeEmployee"] = "storeEmployee";
})(roleType || (exports.roleType = roleType = {}));
exports.sellerDetails = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    alternatePhoneNumber: { type: String },
    password: { type: String, default: "00000000", required: true },
    access_level: { type: String, required: true, enum: Object.values(level), default: level.one },
    role: { type: String, required: true, enum: Object.values(roleType), default: roleType.seller },
    profilePic: {
        filename: { type: String, required: false },
        url: { type: String, required: false }
    },
    status: { type: String, enum: Object.values(sellerStatus), default: sellerStatus.active },
    language: [{ type: String, required: false }],
    documentVerification: {
        status: { type: String, enum: Object.values(sellerStatus), default: sellerStatus.inactive },
        documents: [
            {
                name: { type: String, required: false },
                url: { type: String, required: false }
            }
        ]
    }
});
const Seller = (0, mongoose_1.model)("seller", exports.sellerDetails);
exports.default = Seller;
//# sourceMappingURL=seller.model.js.map