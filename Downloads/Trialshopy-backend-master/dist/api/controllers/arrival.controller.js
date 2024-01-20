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
exports.ArrivalController = void 0;
const arrival_service_1 = require("../../services/arrival.service");
class ArrivalController {
    static create(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new arrival_service_1.ArrivalService().createArrival(request.body);
                response.status(201).json(result);
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static getOne(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const arrival = yield new arrival_service_1.ArrivalService().getArrival(request.params.id);
                response.status(200).json(arrival);
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static getAll(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const arrivals = yield new arrival_service_1.ArrivalService().getAllArrivals();
                response.status(200).json(arrivals);
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new arrival_service_1.ArrivalService().updateArrival(request.params.id, request.body);
                response.status(201).json(result);
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static delete(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new arrival_service_1.ArrivalService().deleteArrival(request.params.id);
                response.status(200).json({ message: "Arrival deleted successfully", data: result });
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
}
exports.ArrivalController = ArrivalController;
//# sourceMappingURL=arrival.controller.js.map