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
exports.ContactUsController = void 0;
const contact_service_1 = require("../../services/contact.service");
class ContactUsController {
    static createContactUs(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactUsData = request.body;
            const contactUsService = new contact_service_1.ContactUsService();
            try {
                const newContactUs = yield contactUsService.createContactUs(contactUsData);
                response.status(201).json(newContactUs);
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static getContactUsEntries(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactUsService = new contact_service_1.ContactUsService();
            try {
                const contactUsEntries = yield contactUsService.getContactUsEntries();
                response.json(contactUsEntries);
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static getContactUsEntryById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const contactUsService = new contact_service_1.ContactUsService();
            try {
                const contactUsEntry = yield contactUsService.getContactUsEntryById(id);
                response.json(contactUsEntry);
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static updateContactUsEntry(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const updatedData = request.body;
            const contactUsService = new contact_service_1.ContactUsService();
            try {
                const updatedContactUsEntry = yield contactUsService.updateContactUsEntry(id, updatedData);
                response.json(updatedContactUsEntry);
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static deleteContactUsEntry(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const contactUsService = new contact_service_1.ContactUsService();
            try {
                yield contactUsService.deleteContactUsEntry(id);
                response.json({ message: "Contact us entry deleted successfully" });
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.ContactUsController = ContactUsController;
//# sourceMappingURL=contact.controller.js.map