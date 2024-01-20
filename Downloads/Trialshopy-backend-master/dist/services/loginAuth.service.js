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
exports.authService = void 0;
const loginAuth_model_1 = __importDefault(require("../models/loginAuth.model"));
const twilio_1 = __importDefault(require("twilio"));
const accountSid = 'AC164e6d0e5b0d704c15f9a88a67d1d8bb';
const authToken = '6d219018b5249b41a115b9e3b39ebb11';
const twilioClient = (0, twilio_1.default)(accountSid, authToken);
class authService {
    static sendOTP(mobileNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            const otpExpiration = new Date(Date.now() + 2 * 60 * 1000); // OTP valid for 2 minutes
            try {
                // Send SMS OTP using Twilio
                yield twilioClient.messages.create({
                    body: `Your OTP is: ${otp}`,
                    from: `+14705704179`,
                    to: mobileNumber,
                });
                // Save OTP and expiration time in the database
                yield loginAuth_model_1.default.findOneAndUpdate({ mobileNumber }, { otp, otpExpiration }, { upsert: true });
            }
            catch (error) {
                throw new Error('Failed to send OTP');
            }
        });
    }
    static verifyOTP(mobileNumber, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield loginAuth_model_1.default.findOne({ mobileNumber });
            if (!user || user.otp !== otp || user.otpExpiration < new Date()) {
                return { success: false };
            }
            // Clear OTP and expiration time after successful verification
            user.otp = undefined;
            user.otpExpiration = undefined;
            yield user.save();
            return { success: true };
        });
    }
}
exports.authService = authService;
//# sourceMappingURL=loginAuth.service.js.map