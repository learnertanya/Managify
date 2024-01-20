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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guard = exports.returnErrorMessage = exports.requireSignIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT = __importStar(require("jsonwebtoken"));
const requireSignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access: Token not found"
            });
        }
        else {
            JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: "Unauthorized Access: Invalid token",
                        error: err
                    });
                }
                next();
            });
        }
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized Access",
            error: error
        });
    }
});
exports.requireSignIn = requireSignIn;
const returnErrorMessage = (message = "Unauthorized", code = 401, error = "Unauthorized") => {
    return { message, code, error };
};
exports.returnErrorMessage = returnErrorMessage;
/**
 * JWT Guard Middleware :
 *
 *  The middleware checks the whether the requested user has the right permissions or not to
 * the respective route based on claims available in the access token passed in the header with key value "authorization" (Bearer Tokens are accepted)
 * @param  {string} secret
 * @param  {jsonwebtoken.VerifyOptions={complete:true}} token_options
 */
const guard = (secret, feature_permission_combinations, token_options = { complete: true }) => {
    return (request, response, next) => {
        const path = request.path;
        const params = request.params;
        let newPath = path;
        if (Object.keys(params).length >= 1) {
            Object.keys(params).forEach((key) => {
                newPath = newPath.replace(params[key], `:${key}`);
            });
        }
        const bearerToken = request.header("authorization");
        if (undefined === bearerToken) {
            const message = (0, exports.returnErrorMessage)();
            return response.status(message.code).json(message);
        }
        const token = bearerToken.replace("Bearer ", "");
        let levelOfAccess;
        try {
            const access = {
                "1": ["user_1", "address_1"],
                "2": ["user_2", "address_2", "seller_1"],
                "3": ["seller_2"]
            };
            const { payload } = jsonwebtoken_1.default.verify(token, secret, token_options);
            if (undefined === payload.access_level) {
                const message = (0, exports.returnErrorMessage)("Access Token Payload Does Not Contain the level of access Fields");
                return response.status(message.code).json(message);
            }
            levelOfAccess = payload.access_level;
            let claims = access[levelOfAccess];
            const claimIndex = claims.find((c) => c === feature_permission_combinations);
            if (undefined === claimIndex) {
                const message = (0, exports.returnErrorMessage)();
                return response.status(message.code).json(message);
            }
            const claim = claims[claimIndex];
            claim.push("*");
            let requiredClaim = "";
            switch (request.method.toLocaleLowerCase()) {
                case "delete":
                    requiredClaim = "delete";
                    break;
                case "post":
                    requiredClaim = "create";
                    break;
                case "put":
                    requiredClaim = "update";
                    break;
                default:
                    requiredClaim = "view";
                    break;
            }
            if (claim.includes("*"))
                return next();
            if (!claim.includes(requiredClaim)) {
                const message = (0, exports.returnErrorMessage)();
                return response.status(message.code).json(message);
            }
        }
        catch (error) {
            const message = (0, exports.returnErrorMessage)(error.message);
            return response.status(message.code).json(message);
        }
        next();
    };
};
exports.guard = guard;
//# sourceMappingURL=jwt-gaurd.middleware.js.map