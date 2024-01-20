"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["read", "unread"], default: "unread" }
});
const Notification = (0, mongoose_1.model)("Notification", notificationSchema);
exports.default = Notification;
//# sourceMappingURL=notification.model.js.map