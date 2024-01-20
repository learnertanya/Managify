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
exports.HealthController = void 0;
const os_1 = require("os");
// import { version, name } from './../../../package.json';;
// import { logger } from '../../config/logger.config'
class HealthController {
    static health(_request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                response.status(200).json({ status: 'up', hostName: (0, os_1.hostname)(), message: 'version 2', message2: 'version 3' });
            }
            catch (error) {
                // logger.error(error);
                next(new Error('Error running health API'));
            }
        });
    }
}
exports.HealthController = HealthController;
//# sourceMappingURL=health.controller.js.map