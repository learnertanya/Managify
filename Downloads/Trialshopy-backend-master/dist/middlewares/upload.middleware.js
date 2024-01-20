"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const cloudinary_config_1 = require("./../config/cloudinary.config");
const multer_storage_cloudinary_1 = __importDefault(require("multer-storage-cloudinary"));
// const mongoURI = process.env.MONGO_URI ?? "mongodb+srv://nikhilfirst:nikhil123@cluster0.xbhppiu.mongodb.net/Trialshopy";
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req: Request, file: Express.Multer.File) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "uploads",
//           metadata: {
//             contentType: file.mimetype,
//             size: file.size
//           }
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });
cloudinary_1.v2.config(cloudinary_config_1.cloudinaryConfig);
/**
 ** Defines the storage options for uploading files.
 * @param {Options} storageOptions - The storage options object.
 * @property {string} cloudinary - The cloudinary storage provider.
 * @property {object} params - Additional parameters for the storage provider.
 */
const storageOptions = {
    cloudinary: cloudinary_1.v2,
    params: {}
};
/**
 * *Creates a multer storage engine that uploads files to Cloudinary.
 * @param {object} storageOptions - The options for configuring the storage engine.
 * @returns The multer storage engine configured to upload files to Cloudinary.
 */
const storage = (0, multer_storage_cloudinary_1.default)(storageOptions);
/**
 * *Creates a Multer instance with the specified storage configuration.
 * @param {object} storage - The storage configuration for Multer.
 * @returns {Multer} - The Multer instance.
 */
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
//# sourceMappingURL=upload.middleware.js.map