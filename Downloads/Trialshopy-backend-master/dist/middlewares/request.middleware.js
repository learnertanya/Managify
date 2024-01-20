"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRequestHeader = exports.middlewares = exports.RequestStatus = void 0;
// import { requestHeader } from "./../responses/all-constants.response.json";
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const language_middleware_1 = require("./../middlewares/language.middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const origins = [
    "https://localhost:3000",
    "http://localhost:3000",
    "http://localhost:3001",
    "https://localhost:3001",
    "http://localhost:5173",
    "https://trialshopy.com",
    "http://trialshopy.com",
    "https://trialshopy-frontend.netlify.app",
    "https://trialshopy-frontend-integration.netlify.app"
];
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["processing"] = "PROCESSING";
    RequestStatus["processed"] = "PROCESSED";
})(RequestStatus || (exports.RequestStatus = RequestStatus = {}));
exports.middlewares = [
    (0, compression_1.default)(),
    (0, helmet_1.default)(),
    (0, cors_1.default)({
        origin: origins,
        credentials: true,
        optionSuccessStatus: 200
    }),
    language_middleware_1.languageCheckUp,
    // verifyRequestHeader,
    body_parser_1.default.json({ limit: "50mb" }),
    body_parser_1.default.urlencoded({ extended: false }),
    (0, cookie_parser_1.default)()
    // morgan(
    //   'Input Request:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" req-Id: :req[x-requested-with] :status :res[content-length] ":referrer" ":user-agent"',
    //   {
    //     stream: new LoggerStream(requestLogger),
    //     skip: (req: express.Request, _res: express.Response) => {
    //       return req.url.includes("metrics");
    //     }
    //   }
    // )
];
function verifyRequestHeader(request, _response, next) {
    const l = request.headers["content-language"];
    const requestId = request.header("x-requested-with");
    if (requestId) {
        return next();
    }
    next(new Error("Invalid requestID"));
}
exports.verifyRequestHeader = verifyRequestHeader;
//# sourceMappingURL=request.middleware.js.map