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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
// import { logger } from "./config/logger.config";
const main_routes_1 = require("./api/routes/main.routes");
const seller_routes_1 = require("./api/routes/seller.routes");
const request_middleware_1 = require("./middlewares/request.middleware");
const body_parser_1 = __importDefault(require("body-parser"));
const method_override_1 = __importDefault(require("method-override"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: ".env" });
/**
 * *Represents the main application class.
 */
class App {
    //* Creates a new instance of the application class.
    constructor() {
        console.info("Creating app instance");
        this.app = (0, express_1.default)();
        // this.app.use(
        //   cors({
        //     origin: ["http://localhost:5173", "http://localhost:3000"],
        //     method: ["GET", "POST", "DELETE", "PUT"]
        //   })
        // );
        this.app.use(request_middleware_1.middlewares);
        this.app.use("/seller", seller_routes_1.SellerRoute.register());
        this.app.use("", main_routes_1.MainRoute.register());
        this.app.use(body_parser_1.default.json());
        this.app.use((0, method_override_1.default)("_method"));
        this.app.use("/uploads", express_1.default.static("uploads"));
    }
    /**
     * *Sets up a connection to the MongoDB database using the provided database name or the
     * *environment variable MONGODB_URI. If neither is provided, a default connection string
     * *is used. Prints a success message if the connection is successful, otherwise logs an
     * *error and exits the process.
     * @param {string} [dbName] - The name of the database to connect to.
     * @returns None
     */
    setupDatabase(dbName) {
        var _a;
        //
        return mongoose_1.default
            .connect((_a = dbName !== null && dbName !== void 0 ? dbName : process.env.MONGODB_URI) !== null && _a !== void 0 ? _a : "mongodb+srv://nikhilfirst:nikhil123@cluster0.xbhppiu.mongodb.net/Trialshopy")
            .then(() => {
            console.info("Connected to the database");
        })
            .catch((error) => {
            console.error({ error });
            process.exit(1);
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map