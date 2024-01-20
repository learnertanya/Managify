import { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";
import Coupon, { ICoupon, CouponStatus } from "../../models/coupon.model";
import { applyCoupon } from "../../services/coupon.service";

export class CouponController {
  static createCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
      const couponData: any = {
        code: req.body.code,
        discount: req.body.discount,
        validFrom: req.body.validFrom,
        validTo: req.body.validTo,
        status: CouponStatus.ACTIVE,
        minimumPurchaseAmount: req.body.minimumPurchaseAmount
      };

      const coupon = await Coupon.create(couponData);
      res.status(201).json(coupon);
    } catch (error) {
      res.status(500).json({ error: "Failed to create coupon" });
    }
  };

  static getCoupons = async (req: Request, res: Response): Promise<void> => {
    try {
      const coupons = await Coupon.find();
      res.status(200).json(coupons);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch coupons" });
    }
  };

  static getCouponById = async (req: Request, res: Response): Promise<void> => {
    try {
      const couponId = req.params.id;

      const coupon = await Coupon.findById(couponId);
      if (!coupon) {
        res.status(404).json({ message: "Coupon not found" });
        return;
      }

      res.status(200).json(coupon);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch coupon" });
    }
  };

  static updateCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
      const couponId = req.params.id;
      const couponData: Partial<ICoupon> = req.body;

      const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, couponData, { new: true });
      if (!updatedCoupon) {
        res.status(404).json({ message: "Coupon not found" });
        return;
      }
      res.status(200).json(updatedCoupon);
    } catch (error) {
      res.status(500).json({ error: "Failed to update coupon" });
    }
  };

  static deleteCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
      const couponId = req.params.id;

      const deletedCoupon = await Coupon.findByIdAndDelete(couponId);
      if (!deletedCoupon) {
        res.status(404).json({ message: "Coupon not found" });
        return;
      }
      res.status(200).json({ message: "Coupon deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete coupon" });
    }
  };

  static applyCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
      const { couponCode, purchaseAmount } = req.body;

      const response = await applyCoupon(couponCode, purchaseAmount);

      if (response.error) {
        res.status(response.statusCode).json({ error: response.error });
      } else {
        res.status(200).json({ message: "Coupon applied successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to apply coupon" });
    }
  };
}
