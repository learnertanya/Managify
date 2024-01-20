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
exports.LoginController = void 0;
const login_service_1 = require("./../../services/login.service");
const security_middleware_1 = require("../../middlewares/security.middleware");
class LoginController {
    static Login(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                const result = yield new login_service_1.LoginService().login(Object.assign({}, request.body));
                // generate token
                if (result && result.Login == "Successful") {
                    const token = (0, security_middleware_1.generateToken)(request, response, next, result.UserData);
                    const userDetails = result.UserData;
                    const userDetailsJSON = JSON.stringify(userDetails);
                    response.cookie("userDetails", userDetailsJSON, {
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                        httpOnly: true,
                        secure: true,
                        sameSite: "none"
                    });
                    response.cookie("token", token, {
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                        httpOnly: true,
                        secure: true,
                        sameSite: "none"
                    });
                    response.status(200).json({ result, token });
                }
                else {
                    response.status(200).json(result);
                }
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static checkLogin(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                const token = request.cookies.token;
                const userDetails = request.cookies.userDetails;
                console.log(userDetails);
                response.status(200).json({
                    success: true,
                    message: "Already logged in",
                    token,
                    userDetails
                });
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
    static logOutController(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                response.clearCookie("token", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                });
                response.clearCookie("userDetails", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                });
                response.status(200).send({
                    success: true,
                    message: "Logout successful"
                });
            }
            catch (err) {
                response.status(500).send({
                    success: false,
                    message: "Logout failed"
                });
            }
        });
    }
    // @validateRequestBody(updatePassword)
    static updatePassword(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = (_a = request.headers["content-lang"]) !== null && _a !== void 0 ? _a : "en";
                const result = yield new login_service_1.LoginService().passwordUpdate(Object.assign({}, request.body));
                response.status(201).json(result);
            }
            catch (err) {
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map