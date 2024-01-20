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
exports.NotificationService = void 0;
const notification_model_1 = __importDefault(require("../models/notification.model"));
class NotificationService {
    createNotification(notificationData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newNotification = yield notification_model_1.default.create(notificationData);
                return newNotification;
            }
            catch (error) {
                throw new Error("Error creating notification");
            }
        });
    }
    getNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifications = yield notification_model_1.default.find({ userId }).exec();
                return notifications;
            }
            catch (error) {
                throw new Error("Error fetching notifications");
            }
        });
    }
    markNotificationAsRead(notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = yield notification_model_1.default.findByIdAndUpdate(notificationId, { status: "read" }, { new: true }).exec();
                return notification;
            }
            catch (error) {
                throw new Error("Error marking notification as read");
            }
        });
    }
    deleteNotification(notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield notification_model_1.default.findByIdAndDelete(notificationId).exec();
            }
            catch (error) {
                throw new Error("Error deleting notification");
            }
        });
    }
    updateNotification(notificationId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedNotification = yield notification_model_1.default.findByIdAndUpdate(notificationId, updatedData, { new: true }).exec();
                return updatedNotification;
            }
            catch (error) {
                throw new Error("Error updating notification");
            }
        });
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map