"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const app_1 = require("./app");
const cronjob_service_1 = require("./services/cronjob.service");
// import { logger } from "./config/logger.config";
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: ".env" });
const appInstance = new app_1.App();
// Setting up the port for the server
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 7000;
// Firing up the server
appInstance
    .setupDatabase()
    /**
     * *Starts the server and listens for incoming requests on the specified port.
     * *Initializes a cron job service to run scheduled tasks.
     * @param {number} port - The port number to listen on.
     * @returns None
     */
    .then((_) => {
    const app = appInstance.app;
    app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
        //setup cron job service
        const cronJobService = new cronjob_service_1.CronJobService();
        cronJobService.cronJob();
        console.info(`Server is running ❤️ at localhost :${port}`);
    }));
})
    .catch((error) => {
    console.error({ error });
    process.exit(1);
});
//# sourceMappingURL=server.js.map