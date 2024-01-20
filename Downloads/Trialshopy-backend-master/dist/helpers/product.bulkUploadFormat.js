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
exports.generateTemplateFileCSV = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const fs_1 = __importDefault(require("fs"));
const stream_1 = require("stream");
function generateTemplateFileCSV() {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const productSchema = product_model_1.default.schema;
            const headers = [];
            const exampleRow = [];
            for (const path in productSchema.paths) {
                if (path !== "__v" && path !== "_id" && productSchema.paths[path].instance !== "ObjectId") {
                    headers.push(path);
                    exampleRow.push(yield generateExampleValue(productSchema.paths[path]));
                }
            }
            const csvContent = convertToCSV([headers, exampleRow]);
            const filePath = "./template.csv";
            const writeStream = fs_1.default.createWriteStream(filePath);
            const readableStream = stream_1.Readable.from(csvContent);
            readableStream.pipe(writeStream);
            writeStream.on("finish", () => {
                resolve();
            });
            writeStream.on("error", (error) => {
                reject(error);
            });
        }
        catch (error) {
            reject(error);
        }
    }));
}
exports.generateTemplateFileCSV = generateTemplateFileCSV;
function convertToCSV(data) {
    const csvRows = [];
    for (const row of data) {
        const values = row.map((value) => (value ? `"${value}"` : ""));
        csvRows.push(values.join(","));
    }
    return csvRows.join("\n");
}
const generateExampleValue = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const fieldType = path.instance;
    switch (fieldType) {
        case "String":
            return "String";
        case "Number":
            return 0;
        case "Boolean":
            return true;
        case "Date":
            return new Date().toISOString();
        case "ObjectId":
            // Handle any specific logic for ObjectId fields if needed
            return "ObjectId Example";
        default:
            return "Value";
    }
});
//# sourceMappingURL=product.bulkUploadFormat.js.map