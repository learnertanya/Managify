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
exports.updateRequestIdResponse = exports.updateResponseStatus = exports.RequestStatus = void 0;
const database_config_1 = require("./../config/database.config");
// import { logger } from "./../config/logger.config";
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["processing"] = "PROCESSING";
    RequestStatus["processed"] = "PROCESSED";
})(RequestStatus || (exports.RequestStatus = RequestStatus = {}));
// todo :- loop back discussion
function updateResponseStatus(_request, response, next) {
    const sendData = response.send;
    const request_id = _request.header("x-requested-with");
    const version = _request.baseUrl.split("/")[2];
    // Seting CORS headers
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type');
    if (request_id) {
        response.send = function (data) {
            // const code = response.status
            // logger.info({ code: response.statusCode });
            updateRequestIdResponse(request_id + _request.method + version, data, response.statusCode)
                .then((_) => {
                // logger.info({ message: 'Response Updated Successfully' });
            })
                .catch((error) => console.error({ message: "Unable to update response", error }));
            sendData.apply(response, arguments);
        };
    }
    next();
}
exports.updateResponseStatus = updateResponseStatus;
function updateRequestIdResponse(request_id, data, code) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const expire = parseInt(process.env.RESPONSE_EXPIRE ? process.env.RESPONSE_EXPIRE : "3600");
            const request = yield database_config_1.db.get(request_id);
            if (request) {
                const result = JSON.parse(request);
                result.body = data;
                result.code = code;
                result.status = RequestStatus.processed;
                const res = yield database_config_1.db.set(request_id, JSON.stringify(result));
                resolve(res);
            }
        }
        catch (error) {
            reject(error);
        }
    }));
}
exports.updateRequestIdResponse = updateRequestIdResponse;
//# sourceMappingURL=response.middleware.js.map