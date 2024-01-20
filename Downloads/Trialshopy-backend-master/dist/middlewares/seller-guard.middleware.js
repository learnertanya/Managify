"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateToken(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    //   console.log(token);
    if (!token)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, "trialshopy", (err, user) => {
        if (err)
            return res.sendStatus(403);
        // Make user data available in the request
        req.user = user;
        next();
    });
}
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=seller-guard.middleware.js.map