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
exports.SellerImporter = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const seller_model_1 = __importDefault(require("../models/seller.model"));
class SellerImporter {
    constructor(filePath) {
        this.filePath = filePath;
    }
    importSellersFromCSV() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                fs_1.default.createReadStream(this.filePath)
                    .pipe((0, csv_parser_1.default)())
                    .on("data", (data) => __awaiter(this, void 0, void 0, function* () {
                    const sellerData = {
                        phone_number: data.phone_number,
                        email: data.email,
                        name: data.name,
                        password: data.password,
                        addressDetails: data.addressDetails,
                        profilePic: data.profilePic,
                        gstId: data.gstId,
                        language: data.language ? data.language.split(";") : [],
                        document: data.document ? data.document.split(";") : []
                    };
                    console.log("Seller Data :", sellerData);
                    const existingSeller = yield seller_model_1.default.findOne({ email: sellerData.email });
                    if (!existingSeller) {
                        const seller = new seller_model_1.default(sellerData);
                        yield seller.save();
                    }
                }))
                    .on("end", () => {
                    console.log("Users imported successfully!");
                })
                    .on("error", (error) => {
                    console.error(error);
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.SellerImporter = SellerImporter;
//# sourceMappingURL=sellersImporter.js.map