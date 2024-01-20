"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCsvFile = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const storage = {
    _handleFile: (_req, file, cb) => {
        console.log(file.originalname);
        const dir = "./uploads";
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        const filename = `${Date.now()}-${file.originalname}`;
        const destination = `${dir}/${filename}`;
        file.stream.pipe(fs_1.default.createWriteStream(destination));
        cb(null, {
            destination: destination,
            filename: filename,
            path: destination,
            size: file.size,
        });
    },
    _removeFile: (_req, file, cb) => {
        fs_1.default.unlink(file.path, cb);
    }
};
const csvFilter = (_req, file, cb) => {
    console.log("Reading file in middleware", file.originalname);
    if (file == undefined) {
        cb(null, false);
    }
    else if (file.mimetype.includes("csv")) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.uploadCsvFile = (0, multer_1.default)({
    storage: storage,
    fileFilter: csvFilter
});
//# sourceMappingURL=multer.middleware.js.map