"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponController = void 0;
const coupon_model_1 = __importStar(require("../../models/coupon.model"));
const coupon_service_1 = require("../../services/coupon.service");
class CouponController {
}
exports.CouponController = CouponController;
_a = CouponController;
CouponController.createCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const couponData = {
            code: req.body.code,
            discount: req.body.discount,
            validFrom: req.body.validFrom,
            validTo: req.body.validTo,
            status: coupon_model_1.CouponStatus.ACTIVE,
            minimumPurchaseAmount: req.body.minimumPurchaseAmount
        };
        const coupon = yield coupon_model_1.default.create(couponData);
        res.status(201).json(coupon);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create coupon" });
    }
});
CouponController.getCoupons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coupons = yield coupon_model_1.default.find();
        res.status(200).json(coupons);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch coupons" });
    }
});
CouponController.getCouponById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const couponId = req.params.id;
        const coupon = yield coupon_model_1.default.findById(couponId);
        if (!coupon) {
            res.status(404).json({ message: "Coupon not found" });
            return;
        }
        res.status(200).json(coupon);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch coupon" });
    }
});
CouponController.updateCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const couponId = req.params.id;
        const couponData = req.body;
        const updatedCoupon = yield coupon_model_1.default.findByIdAndUpdate(couponId, couponData, { new: true });
        if (!updatedCoupon) {
            res.status(404).json({ message: "Coupon not found" });
            return;
        }
        res.status(200).json(updatedCoupon);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update coupon" });
    }
});
CouponController.deleteCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const couponId = req.params.id;
        const deletedCoupon = yield coupon_model_1.default.findByIdAndDelete(couponId);
        if (!deletedCoupon) {
            res.status(404).json({ message: "Coupon not found" });
            return;
        }
        res.status(200).json({ message: "Coupon deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete coupon" });
    }
});
CouponController.applyCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { couponCode, purchaseAmount } = req.body;
        const response = yield (0, coupon_service_1.applyCoupon)(couponCode, purchaseAmount);
        if (response.error) {
            res.status(response.statusCode).json({ error: response.error });
        }
        else {
            res.status(200).json({ message: "Coupon applied successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to apply coupon" });
    }
});
//# sourceMappingURL=coupon.controller.js.map