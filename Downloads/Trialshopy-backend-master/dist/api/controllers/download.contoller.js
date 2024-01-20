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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadController = void 0;
const mongodb_1 = require("mongodb");
class DownloadController {
    static downloadImage(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mongoURI = (_a = process.env.MONGO_URI) !== null && _a !== void 0 ? _a : "mongodb+srv://nikhilfirst:nikhil123@cluster0.xbhppiu.mongodb.net/Trialshopy";
                const client = yield mongodb_1.MongoClient.connect(mongoURI);
                const db = client.db();
                const bucket = new mongodb_1.GridFSBucket(db, {
                    bucketName: "uploads"
                });
                const filename = request.params.name;
                const downloadStream = bucket.openDownloadStreamByName(filename);
                downloadStream.on("error", (err) => {
                    client.close();
                    response.status(404).json({ message: "Cannot download the Image!", error: err });
                });
                response.setHeader("Content-Type", "image/png");
                downloadStream.pipe(response);
                downloadStream.on("end", () => {
                    client.close();
                    response.end();
                });
            }
            catch (err) {
                const e = err !== null && err !== void 0 ? err : new Error(null);
                const error = JSON.parse(err.message);
                next({ code: error.code, message: error.message, error: error.error });
            }
        });
    }
}
exports.DownloadController = DownloadController;
//# sourceMappingURL=download.contoller.js.map