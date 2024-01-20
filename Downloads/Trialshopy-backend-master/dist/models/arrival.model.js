"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const arrivalSchema = new mongoose_1.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    price: { type: Number, required: true },
    productName: { type: String, required: true }
});
const Arrival = (0, mongoose_1.model)("arrival", arrivalSchema);
exports.default = Arrival;
//# sourceMappingURL=arrival.model.js.map