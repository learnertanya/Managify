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
exports.PortfolioController = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
//todo: remove this controller
class PortfolioController {
    static contactUs(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, uemail, subject, message } = request.body;
            try {
                // Create a Nodemailer transporter
                const transporter = nodemailer_1.default.createTransport({
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
                yield transporter.sendMail(mailOptions);
                response.status(200).json({ message: "Message sent successfully" });
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ error: "Error sending message" });
            }
        });
    }
}
exports.PortfolioController = PortfolioController;
//# sourceMappingURL=PortfolioController.js.map