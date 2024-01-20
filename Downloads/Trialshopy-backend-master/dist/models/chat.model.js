"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    // participants: [String],
    messages: [
        {
            sender: String,
            content: String,
            timestamp: Date,
            subject: String,
            attachment: String,
            file: String,
            description: String
        }
    ]
});
const Chat = (0, mongoose_1.model)("Chat", chatSchema);
exports.default = Chat;
//# sourceMappingURL=chat.model.js.map