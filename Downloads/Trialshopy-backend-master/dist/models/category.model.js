"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryStatus = void 0;
const mongoose_1 = require("mongoose");
var CategoryStatus;
(function (CategoryStatus) {
    CategoryStatus["ACTIVE"] = "active";
    CategoryStatus["INACTIVE"] = "inactive";
})(CategoryStatus || (exports.CategoryStatus = CategoryStatus = {}));
const categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    detailedDescription: { type: String, required: false },
    subDescriptions: [{ type: String, required: false }],
    parent: { type: String, required: false, default: null },
    image: {
        filename: { type: String, required: false },
        url: { type: String, required: false }
    },
    featured: { type: Boolean, default: false }
});
const Category = (0, mongoose_1.model)("Category", categorySchema);
exports.default = Category;
//# sourceMappingURL=category.model.js.map