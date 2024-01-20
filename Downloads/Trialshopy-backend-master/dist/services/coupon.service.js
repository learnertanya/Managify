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
exports.getCouponByCode = exports.applyCoupon = exports.deleteCoupon = exports.updateCoupon = exports.getCouponById = exports.getAllCoupons = exports.createCoupon = void 0;
const coupon_model_1 = __importDefault(require("../models/coupon.model"));
const coupon_utils_1 = require("../coupon.utils");
const createCoupon = (couponData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coupon = yield coupon_model_1.default.create(couponData);
        return coupon;
    }
    catch (error) {
        throw new Error("Failed to create coupon");
    }
});
exports.createCoupon = createCoupon;
const getAllCoupons = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coupons = yield coupon_model_1.default.find();
        return coupons;
    }
    catch (error) {
        throw new Error("Failed to fetch coupons");
    }
});
exports.getAllCoupons = getAllCoupons;
const getCouponById = (couponId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coupon = yield coupon_model_1.default.findById(couponId);
        return coupon;
    }
    catch (error) {
        throw new Error("Failed to fetch coupon");
    }
});
exports.getCouponById = getCouponById;
const updateCoupon = (couponId, couponData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCoupon = yield coupon_model_1.default.findByIdAndUpdate(couponId, couponData, { new: true });
        if (!updatedCoupon) {
            throw new Error("Coupon not found");
        }
        return updatedCoupon;
    }
    catch (error) {
        throw new Error("Failed to update coupon");
    }
});
exports.updateCoupon = updateCoupon;
const deleteCoupon = (couponId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCoupon = yield coupon_model_1.default.findByIdAndDelete(couponId);
        if (!deletedCoupon) {
            throw new Error("Coupon not found");
        }
    }
    catch (error) {
        throw new Error("Failed to delete coupon");
    }
});
exports.deleteCoupon = deleteCoupon;
const applyCoupon = (couponCode, purchaseAmount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coupon = yield (0, exports.getCouponByCode)(couponCode); // Make sure you've defined and imported this function
        if (!coupon) {
            return { statusCode: 404, error: "Coupon not found" };
        }
        if (!(0, coupon_utils_1.canApplyCoupon)(coupon, purchaseAmount)) {
            // Make sure you've defined and imported this function
            return { statusCode: 400, error: "Purchase amount is below the minimum required for this coupon" };
        }
        // Apply the coupon logic here...
        return { statusCode: 200 };
    }
    catch (error) {
        return { statusCode: 500, error: "Failed to apply coupon" };
    }
});
exports.applyCoupon = applyCoupon;
const getCouponByCode = (couponCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coupon = yield coupon_model_1.default.findOne({ code: couponCode });
        return coupon;
    }
    catch (error) {
        throw new Error("Failed to fetch coupon by code");
    }
});
exports.getCouponByCode = getCouponByCode;
//# sourceMappingURL=coupon.service.js.map