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
exports.CronJobService = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const database_config_1 = require("../config/database.config");
const category_service_1 = require("./category.service");
/**
 * *A service class that handles running a cron job daily at midnight.
 */
class CronJobService {
    /**
     * Runs a cron job that executes a set of tasks daily at midnight.
     * The tasks include fetching category hierarchy data and storing it in the database,
     * as well as fetching featured categories data and storing it in the database.
     * @returns None
     */
    cronJob() {
        return __awaiter(this, void 0, void 0, function* () {
            // Runs a cron job that executes a set of tasks daily at midnight
            node_cron_1.default.schedule("0 0 * * *", () => __awaiter(this, void 0, void 0, function* () {
                console.log("Cron job is running daily at midnight");
                try {
                    // Fetch category hierarchy data from the database
                    const dashboardcategoryData = yield new category_service_1.CategoryService().getCategoriesHierarchy();
                    // console.log(categoryData)
                    // Store the category hierarchy data in the redis database
                    yield database_config_1.db.set("dashboardCategories", JSON.stringify(dashboardcategoryData));
                    // Fetch featured categories data from the database
                    const featuredCategoriesData = yield new category_service_1.CategoryService().getAllMarkedFeaturedCategories();
                    // Store the featured categories data in the redis database
                    yield database_config_1.db.set("featuredCategories", JSON.stringify(featuredCategoriesData));
                }
                catch (err) {
                    // Handle any error that occurs during the cron job
                    console.error(err);
                }
            }));
            node_cron_1.default.schedule("*/14 * * * *", () => __awaiter(this, void 0, void 0, function* () {
                console.log("Cron job is running every 14 minutes");
                fetch("https://trialshopy-backend-rk8d.onrender.com/api/v1/health")
                    .then((res) => {
                    console.log(res);
                })
                    .catch((err) => console.error(err));
            }));
        });
    }
}
exports.CronJobService = CronJobService;
//# sourceMappingURL=cronjob.service.js.map