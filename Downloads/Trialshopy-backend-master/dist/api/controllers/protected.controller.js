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
exports.ProtectedController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class ProtectedController {
    static protectedRoute(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = request.header("Authorization"); // Get token from request header
                if (!token) {
                    response.status(401).json({ message: "Unauthorized: No token provided" });
                    return;
                }
                // Verify and decode the token
                jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                    if (err) {
                        response.status(401).json({ message: "Unauthorized: Invalid token" });
                        return;
                    }
                    // Ensure decoded is an object and has the expected properties
                    if (typeof decoded !== "object" || !("id" in decoded) || !("role" in decoded) || !("access_level" in decoded)) {
                        response.status(401).json({ message: "Unauthorized: Invalid token payload" });
                        return;
                    }
                    // Token is valid, use the decoded payload as user data
                    const user = decoded; // Cast decoded as User type
                    if (user.role === "admin" || (user.role === "customer" && user.access_level >= 2)) {
                        // Authorized users can access the protected route
                        response.status(200).json({ message: "Protected route accessed successfully" });
                    }
                    else {
                        // Unauthorized users receive a 403 Forbidden response
                        response.status(403).json({ message: "Access forbidden" });
                    }
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.ProtectedController = ProtectedController;
//# sourceMappingURL=protected.controller.js.map