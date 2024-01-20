"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sellersImporter_1 = require("./helpers/sellersImporter");
const sellerImporter = new sellersImporter_1.SellerImporter("./data/sellers.csv");
sellerImporter
    .importSellersFromCSV()
    .then(() => {
    console.log("Sellers import completed.");
})
    .catch((error) => {
    console.error("Error importing sellers:", error);
});
//# sourceMappingURL=dataImport.js.map