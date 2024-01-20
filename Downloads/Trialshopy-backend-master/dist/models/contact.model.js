"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const contactUsSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const ContactUs = (0, mongoose_1.model)("ContactUs", contactUsSchema);
exports.default = ContactUs;
//# sourceMappingURL=contact.model.js.map