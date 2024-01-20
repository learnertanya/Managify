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
exports.LeaveService = void 0;
const store_model_1 = __importDefault(require("../models/store.model"));
class LeaveService {
    create(data, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const leave = new store_model_1.default(data);
            return leave.save();
        });
    }
    getAll(clientId, limit, page, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const leaves = yield store_model_1.default.find({ clientId }).limit(limit)
                .skip(page * limit)
                .lean()
                .exec();
            return leaves;
        });
    }
    getOne(clientId, userId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const leave = yield store_model_1.default.findOne({ clientId, userId }).exec();
            return leave;
        });
    }
    updateOne(clientId, userId, body, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const leave = yield store_model_1.default.findOne({ clientId, userId: userId }).exec();
            if (body.leaveAvailable) {
                if (body.leaveAvailable.casualLeave)
                    leave.leaveAvailable.casualLeave = Number(leave.leaveAvailable.casualLeave) - Number(body.leaveAvailable.casualLeave);
                if (body.leaveAvailable.paidLeave)
                    leave.leaveAvailable.paidLeave = Number(leave.leaveAvailable.paidLeave) - Number(body.leaveAvailable.paidLeave);
                if (body.leaveAvailable.sickLeave)
                    leave.leaveAvailable.sickLeave = Number(leave.leaveAvailable.sickLeave) - Number(body.leaveAvailable.sickLeave);
            }
            if (body.leave) {
                if (body.leave.partialDay)
                    leave.leave.partialDay.push(body.leave.partialDay);
                if (body.leave.fullDay)
                    leave.leave.fullDay.push(body.leave.fullDay);
            }
            return yield store_model_1.default.updateOne(leave._id, leave);
        });
    }
    delete(clientId, userId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield store_model_1.default.findByIdAndRemove({ clientId, userId: userId }).exec();
        });
    }
}
exports.LeaveService = LeaveService;
//# sourceMappingURL=leave.service.js.map