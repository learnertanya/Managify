"use strict";
// import multer from 'multer';
// import { Request } from 'express';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const storage = multer.diskStorage({
//   destination: function (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
//     // Specify the destination folder for uploaded files
//     cb(null, './uploads'); // You may need to create the 'uploads' folder in your project
//   },
//   filename: function (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
//     // Generate a unique filename for the uploaded file
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   }
// });
// const uploads = multer({ storage: storage });
// export default uploads;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        const uploadFolder = './uploads';
        // Create the 'uploads' folder if it doesn't exist
        if (!fs_1.default.existsSync(uploadFolder)) {
            fs_1.default.mkdirSync(uploadFolder);
        }
        cb(null, uploadFolder);
    },
    filename: function (_req, file, cb) {
        // Generate a unique filename for the uploaded file
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const uploads = (0, multer_1.default)({ storage: storage });
exports.default = uploads;
//# sourceMappingURL=multerConfig.js.map