"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canApplyCoupon = void 0;
const coupon_model_1 = require("./models/coupon.model");
const canApplyCoupon = (coupon, purchaseAmount) => {
    return coupon.status === coupon_model_1.CouponStatus.ACTIVE && purchaseAmount >= coupon.minimumPurchaseAmount;
};
exports.canApplyCoupon = canApplyCoupon;
//# sourceMappingURL=coupon.utils.js.map