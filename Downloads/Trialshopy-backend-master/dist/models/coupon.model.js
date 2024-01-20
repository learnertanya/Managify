"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponStatus = void 0;
const mongoose_1 = require("mongoose");
var CouponStatus;
(function (CouponStatus) {
    CouponStatus["ACTIVE"] = "active";
    CouponStatus["INACTIVE"] = "inactive";
})(CouponStatus || (exports.CouponStatus = CouponStatus = {}));
const couponSchema = new mongoose_1.Schema({
    data: { type: String, required: true },
    code: { type: String, required: true },
    discount: { type: Number, required: true },
    validFrom: { type: Date, required: true },
    validTo: { type: Date, required: true },
    status: { type: String, required: true, enum: Object.values(CouponStatus), default: CouponStatus.ACTIVE },
    minimumPurchaseAmount: { type: Number, required: true, default: 0 }
});
const Coupon = (0, mongoose_1.model)("Coupon", couponSchema);
exports.default = Coupon;
//# sourceMappingURL=coupon.model.js.map