"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = void 0;
const mongoose_1 = require("mongoose");
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["ACTIVE"] = "active";
    PaymentStatus["INACTIVE"] = "inactive";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
const paymentSchema = new mongoose_1.Schema({
    storeId: { type: String, required: true },
    totalItems: { type: Number, required: true },
    balance: { type: Number, required: true },
    totalRevenue: { type: Number, required: true },
    status: {
        type: String,
        required: true,
        enum: Object.values(PaymentStatus),
        default: PaymentStatus.ACTIVE
    }
});
const PaymentModel = (0, mongoose_1.model)("Payment", paymentSchema);
exports.default = PaymentModel;
//# sourceMappingURL=payment.model.js.map