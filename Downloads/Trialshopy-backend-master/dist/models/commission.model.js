"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommissionStatus = void 0;
const mongoose_1 = require("mongoose");
var CommissionStatus;
(function (CommissionStatus) {
    CommissionStatus["ACTIVE"] = "active";
    CommissionStatus["INACTIVE"] = "inactive";
})(CommissionStatus || (exports.CommissionStatus = CommissionStatus = {}));
const productCommissionSchema = new mongoose_1.Schema({
    productId: { type: String, required: true },
    commission: { type: Number, required: true },
    datedFrom: { type: Date, required: true },
    datedTo: { type: Date, required: true },
    status: { type: String, required: true, enum: Object.values(CommissionStatus), default: CommissionStatus.ACTIVE }
});
const ProductCommission = (0, mongoose_1.model)("productCommission", productCommissionSchema);
exports.default = ProductCommission;
//# sourceMappingURL=commission.model.js.map