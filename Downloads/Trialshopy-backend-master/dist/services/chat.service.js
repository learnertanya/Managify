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
exports.ChatService = void 0;
const chat_model_1 = __importDefault(require("../models/chat.model"));
class ChatService {
    createChat(participants, messages) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newChat = yield chat_model_1.default.create({ participants, messages });
                return newChat;
            }
            catch (error) {
                throw new Error("Error creating chat");
            }
        });
    }
    getChatById(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chat = yield chat_model_1.default.findById(chatId).exec();
                return chat;
            }
            catch (error) {
                throw new Error("Error fetching chat");
            }
        });
    }
    updateChat(chatId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedChat = yield chat_model_1.default.findByIdAndUpdate(chatId, updatedData, { new: true }).exec();
                return updatedChat;
            }
            catch (error) {
                throw new Error("Error updating chat");
            }
        });
    }
    deleteChat(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield chat_model_1.default.findByIdAndDelete(chatId).exec();
            }
            catch (error) {
                throw new Error("Error deleting chat");
            }
        });
    }
}
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map