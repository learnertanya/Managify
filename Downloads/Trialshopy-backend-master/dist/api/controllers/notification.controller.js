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
exports.NotificationController = void 0;
const notification_service_1 = require("../../services/notification.service");
class NotificationController {
    static createNotification(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const notificationData = request.body;
            const notificationService = new notification_service_1.NotificationService();
            try {
                const newNotification = yield notificationService.createNotification(notificationData);
                response.json(newNotification);
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static getNotifications(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = request.params;
            const notificationService = new notification_service_1.NotificationService();
            try {
                const notifications = yield notificationService.getNotifications(userId);
                response.json(notifications);
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static markNotificationAsRead(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const notificationService = new notification_service_1.NotificationService();
            try {
                const updatedNotification = yield notificationService.markNotificationAsRead(id);
                response.json(updatedNotification);
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static deleteNotification(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const notificationService = new notification_service_1.NotificationService();
            try {
                yield notificationService.deleteNotification(id);
                response.json({ message: "Notification deleted successfully" });
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static updateNotification(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const updatedData = request.body;
            console.log("Updating notification with ID:", id);
            console.log("Updated data:", updatedData);
            const notificationService = new notification_service_1.NotificationService();
            try {
                const updatedNotification = yield notificationService.updateNotification(id, updatedData);
                console.log("Updated notification:", updatedNotification);
                response.json(updatedNotification);
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map