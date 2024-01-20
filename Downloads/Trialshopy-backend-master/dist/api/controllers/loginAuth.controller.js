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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAuthController = void 0;
const loginAuth_service_1 = require("../../services/loginAuth.service");
class LoginAuthController {
    static sendOTP(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield loginAuth_service_1.authService.sendOTP(mobileNumber);
                res.status(200).json({ message: "OTP sent successfully" });
                return;
            }
            catch (error) {
                res.status(500).json({ message: "Failed to send OTP" });
                return;
            }
        });
    }
    static verifyOTP(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mobileNumber, otp } = req.body;
            try {
                const result = yield loginAuth_service_1.authService.verifyOTP(mobileNumber, otp);
                if (result.success) {
                    res.json({ message: "OTP verified successfully" });
                }
                else {
                    res.status(400).json({ message: "Invalid OTP" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Failed to verify OTP" });
            }
        });
    }
}
exports.LoginAuthController = LoginAuthController;
//# sourceMappingURL=loginAuth.controller.js.map