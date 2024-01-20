"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginCheck = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginCheck = (request, response, next) => {
    var _a;
    const token = (_a = request.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        response.status(401).json({ error: 'Unauthorized - Please log in to give a review' });
        return;
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key
        // Attach the decoded user data to the request
        request.user = decodedToken;
        next();
    }
    catch (error) {
        response.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
};
exports.loginCheck = loginCheck;
//# sourceMappingURL=logincheck.middleware.js.map