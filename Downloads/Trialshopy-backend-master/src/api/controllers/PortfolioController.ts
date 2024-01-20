import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";

//todo: remove this controller
export class PortfolioController {
  static async contactUs(request: Request, response: Response, next: NextFunction): Promise<void> {
    const { name, uemail, subject, message } = request.body;

    try {
      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "your-email@example.com",
          pass: "your-email-password"
        }
      });

      // Email data
      const mailOptions = {
        from: uemail,
        to: "support@trialshoppy.com",
        subject: subject,
        text: `From: ${name}\nEmail: ${uemail}\nMessage: ${message}`
      };

      await transporter.sendMail(mailOptions);

      response.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Error sending message" });
    }
  }
}
