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
exports.ChatController = void 0;
const chat_service_1 = require("../../services/chat.service");
class ChatController {
    static createChat(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { participants, messages } = request.body;
            const chatService = new chat_service_1.ChatService();
            try {
                const newChat = yield chatService.createChat(participants, messages);
                response.json(newChat);
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static getChatById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const chatService = new chat_service_1.ChatService();
            try {
                const chat = yield chatService.getChatById(id);
                response.json(chat);
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static updateChat(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const updatedData = request.body;
            const chatService = new chat_service_1.ChatService();
            try {
                const updatedChat = yield chatService.updateChat(id, updatedData);
                response.json(updatedChat);
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static deleteChat(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const chatService = new chat_service_1.ChatService();
            try {
                yield chatService.deleteChat(id);
                response.json({ message: "Chat deleted successfully" });
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map