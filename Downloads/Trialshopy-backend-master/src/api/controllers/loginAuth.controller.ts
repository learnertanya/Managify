import { NextFunction, Request, Response } from "express";
import { authService } from "../../services/loginAuth.service";

export class LoginAuthController {
  static async sendOTP(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { mobileNumber } = req.body;

    try {
      // Check if the mobileNumber is not empty
      if (!mobileNumber) {
        res.status(400).json({ message: "Mobile number is required" });
        return;
      }
    
      // Check if the mobileNumber matches the format of "+91" followed by 10 digits
      const mobileNumberRegex = /^\+91\d{10}$/;
      if (!mobileNumberRegex.test(mobileNumber)) {
        res.status(400).json({ message: "Invalid mobile number format" });
        return;
      }
    
      await authService.sendOTP(mobileNumber);
      res.status(200).json({ message: "OTP sent successfully" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Failed to send OTP" });
      return;
    }
    
  }

  static async verifyOTP(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { mobileNumber, otp } = req.body;
    try {
      const result = await authService.verifyOTP(mobileNumber, otp);
      if (result.success) {
        res.json({ message: "OTP verified successfully" });
      } else {
        res.status(400).json({ message: "Invalid OTP" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to verify OTP" });
    }
  }
}