import loginAuth, { LoginAuthDocument } from '../models/loginAuth.model';
import twilio from 'twilio';

const accountSid = 'AC164e6d0e5b0d704c15f9a88a67d1d8bb';
const authToken = '6d219018b5249b41a115b9e3b39ebb11';
const twilioClient = twilio(accountSid, authToken);

export class authService {
  static async sendOTP(mobileNumber: string): Promise<void> {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiration = new Date(Date.now() + 2 * 60 * 1000); // OTP valid for 2 minutes

    try {
      // Send SMS OTP using Twilio
      await twilioClient.messages.create({
        body: `Your OTP is: ${otp}`,
        from: `+14705704179`,
        to: mobileNumber,
      });

      // Save OTP and expiration time in the database
      await loginAuth.findOneAndUpdate({ mobileNumber }, { otp, otpExpiration }, { upsert: true });
    } catch (error) {
      throw new Error('Failed to send OTP');
    }
  }

  static async verifyOTP(mobileNumber: string, otp: string): Promise<{ success: boolean }> {
    const user: LoginAuthDocument | null = await loginAuth.findOne({ mobileNumber });
    
    if (!user || user.otp !== otp ||user.otpExpiration < new Date()) {
      return { success: false};
    }

    // Clear OTP and expiration time after successful verification
    user.otp = undefined;
    user.otpExpiration = undefined;
    await user.save();

    return { success: true };
  }
}