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
exports.ContactUsService = void 0;
const contact_model_1 = __importDefault(require("../models/contact.model"));
class ContactUsService {
    createContactUs(contactUsData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContactUs = yield contact_model_1.default.create(contactUsData);
                return newContactUs;
            }
            catch (error) {
                throw new Error("Error creating contact us entry");
            }
        });
    }
    getContactUsEntries() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactUsEntries = yield contact_model_1.default.find().sort({ createdAt: -1 }).exec();
                return contactUsEntries;
            }
            catch (error) {
                throw new Error("Error fetching contact us entries");
            }
        });
    }
    getContactUsEntryById(contactUsId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactUsEntry = yield contact_model_1.default.findById(contactUsId).exec();
                return contactUsEntry;
            }
            catch (error) {
                throw new Error("Error fetching contact us entry");
            }
        });
    }
    updateContactUsEntry(contactUsId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedContactUsEntry = yield contact_model_1.default.findByIdAndUpdate(contactUsId, updatedData, { new: true }).exec();
                return updatedContactUsEntry;
            }
            catch (error) {
                throw new Error("Error updating contact us entry");
            }
        });
    }
    deleteContactUsEntry(contactUsId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield contact_model_1.default.findByIdAndDelete(contactUsId).exec();
            }
            catch (error) {
                throw new Error("Error deleting contact us entry");
            }
        });
    }
}
exports.ContactUsService = ContactUsService;
//# sourceMappingURL=contact.service.js.map