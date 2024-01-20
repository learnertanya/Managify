"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerRoute = void 0;
const express_1 = require("express");
const SellersController_1 = require("../controllers/seller/SellersController");
const seller_guard_middleware_1 = require("../../middlewares/seller-guard.middleware");
class SellerRoute {
    static register() {
        const router = (0, express_1.Router)();
        // Route for Login
        router.route("/login").post(SellersController_1.SellersController.login);
        router.route("/logout").get(SellersController_1.SellersController.logout);
        // Route to get all products
        router.route("/allProducts").post(seller_guard_middleware_1.authenticateToken, SellersController_1.SellersController.getAllProducts);
        return router;
    }
}
exports.SellerRoute = SellerRoute;
//# sourceMappingURL=seller.routes.js.map