"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRoute = void 0;
const express_1 = require("express");
const health_controller_1 = require("../controllers/health.controller");
const login_controller_1 = require("../controllers/login.controller");
const user_controller_1 = require("../controllers/user.controller");
const seller_controller_1 = require("../controllers/seller.controller");
const address_controller_1 = require("../controllers/address.controller");
const product_controller_1 = require("../controllers/product.controller");
const brand_controller_1 = require("../controllers/brand.controller");
const upload_middleware_1 = __importDefault(require("../../middlewares/upload.middleware"));
const cart_controller_1 = require("../controllers/cart.controller");
const store_controller_1 = require("../controllers/store.controller");
const multer_middleware_1 = require("../../middlewares/multer.middleware");
const security_middleware_1 = require("../../middlewares/security.middleware");
const review_controller_1 = require("../controllers/review.controller");
const order_controller_1 = require("../controllers/order.controller");
const download_contoller_1 = require("../controllers/download.contoller");
const protected_controller_1 = require("../controllers/protected.controller");
const category_controller_1 = require("../controllers/category.controller");
const notification_controller_1 = require("../controllers/notification.controller");
const search_controller_1 = require("../controllers/search.controller");
const chat_controller_1 = require("../controllers/chat.controller");
const contact_controller_1 = require("../controllers/contact.controller");
const arrival_controller_1 = require("../controllers/arrival.controller");
const coupon_controller_1 = require("../controllers/coupon.controller");
const payment_controller_1 = require("../controllers/payment.controller");
const loginAuth_controller_1 = require("../controllers/loginAuth.controller");
const PortfolioController_1 = require("../controllers/PortfolioController");
const verification_controller_1 = require("../controllers/verification.controller");
const storeReview_controller_1 = require("../controllers/storeReview.controller");
const multerConfig_1 = __importDefault(require("../../middlewares/multerConfig"));
const jwt_gaurd_middleware_1 = require("../../middlewares/jwt-gaurd.middleware");
/**
 * Registers the main routes for the application.
 * @returns {Router} - The router object with the registered routes.
 */
class MainRoute {
    /**
     * Registers the routes for the API endpoints.
     * @returns {Router} - The router object with the registered routes.
     */
    static register() {
        // Create a new router
        const router = (0, express_1.Router)();
        //* API health
        router.route("/api/v1/health").get(health_controller_1.HealthController.health);
        //*User API routes
        // User signup
        router.route("/api/v1/userSignUp").post(user_controller_1.UserController.create);
        // User login and Logout
        router.route("/api/v1/login").post(login_controller_1.LoginController.Login);
        router.route("/api/v1/logout").post(login_controller_1.LoginController.logOutController);
        // check user login status
        router.route("/api/v1/checklogin").get(jwt_gaurd_middleware_1.requireSignIn, login_controller_1.LoginController.checkLogin);
        // update user  password
        router.route("/api/v1/updatePasword").put(login_controller_1.LoginController.updatePassword);
        // upload user profile picture
        router.route("/api/v1/users/:userId/uploadProfilePic").post(upload_middleware_1.default.single("file"), user_controller_1.UserController.uploadFile);
        router.route("/api/v1/user/:_id").get(jwt_gaurd_middleware_1.requireSignIn, user_controller_1.UserController.getOne);
        router.route("/api/v1/user/:_id").put(user_controller_1.UserController.update);
        router.route("/api/v1/user/:_id/status").delete(user_controller_1.UserController.delete);
        router.route("/api/v1/user/:_id").delete(user_controller_1.UserController.revoke);
        // *Seller API routes for CRUD operations
        // Create a new seller account.
        router.route("/api/v1/sellerSignUp").post(seller_controller_1.SellerController.sellerSignUp);
        // Create a new seller profile.
        router.route("/api/v1/sellerAdd").post(seller_controller_1.SellerController.createSeller);
        // Retrieve a list of all sellers.
        router.route("/api/v1/sellers").post(seller_controller_1.SellerController.getAllSeller);
        // Get information about a specific seller using id.
        router.route("/api/v1/sellers/:_id").get(seller_controller_1.SellerController.getOneSeller);
        // Update seller information.
        router.route("/api/v1/sellers/:_id").put(seller_controller_1.SellerController.updateSeller);
        // Delete a seller's account.
        router.route("/api/v1/sellers/:_id/status").delete(seller_controller_1.SellerController.deleteSeller);
        // Revoke a seller's account.
        router.route("/api/v1/sellers/:_id").delete(seller_controller_1.SellerController.revokeSeller);
        // Upload a profile picture for a seller.
        router.route("/api/v1/sellers/:sellerId/uploadProfilePic").post(upload_middleware_1.default.single("file"), seller_controller_1.SellerController.uploadImage);
        // Upload a document for seller verification.
        router.route("/api/v1/:sellerId/uploadDocVerify").post(seller_controller_1.SellerController.uploadDocumentVerification);
        // *Address API routes for CRUD operations
        // Create a new address.
        router.route("/api/v1/addressCreation").post(address_controller_1.AddressController.createAddress);
        // Get a list of all addresses.
        router.route("/api/v1/address").post(address_controller_1.AddressController.getAllAddress);
        // Get a specific address by type and reference ID.
        router.route("/api/v1/address/:type/:refId").get(address_controller_1.AddressController.getAddress);
        // Update an address by its ID.
        router.route("/api/v1/address/:_id").put(address_controller_1.AddressController.updateAddress);
        // (Optional) Update an address by its ID using a different route.
        router.route("/api/v1/address/updateAddress/:_id").put(address_controller_1.AddressController.updateAddress);
        // Delete an address by its ID.
        router.route("/api/v1/address/:_id/status").delete(address_controller_1.AddressController.deleteAddress);
        // Revoke an address by its ID.
        router.route("/api/v1/address/:_id").delete(address_controller_1.AddressController.revokeAddress);
        // *Review API routes for managing product reviews
        // Add a new review for a specific product by a user.
        router.route("/api/v1/reviews/:userId/products/:productId").post(review_controller_1.ReviewController.addReview);
        // Get a specific review by its ID.
        router.route("/api/v1/reviews/:productId").get(review_controller_1.ReviewController.getReview);
        // Update an existing review by its ID.
        router.route("/api/v1/reviews/:id").put(review_controller_1.ReviewController.updateReview);
        // Delete a review by its ID.
        router.route("/api/v1/reviews/delete/:id").delete(review_controller_1.ReviewController.deleteReview);
        // Revoke a review by its ID.
        router.route("/api/v1/reviews/revoke/:id").delete(review_controller_1.ReviewController.revokeReview);
        // like a review by its ID for a user.
        router.route("/api/v1/reviews/:reviewId/like/:userId").put(review_controller_1.ReviewController.likeReview);
        // dislike a review by its ID for a user.
        router.route("/api/v1/reviews/:reviewId/dislike/:userId").put(review_controller_1.ReviewController.dislikeReview);
        router.route("/api/v1/reviews/uploadImage/:reviewId").post(upload_middleware_1.default.single("file"), review_controller_1.ReviewController.uploadImage);
        // *Review API routes for managing store reviews
        // Add a new review for a specific store by a user.
        router.route("/api/v1/storeReviews/:userId/store/:storeId").post(storeReview_controller_1.StoreReviewController.addReview);
        // Get a specific reviews for store by its ID.
        router.route("/api/v1/storeReviews/:storeId").get(storeReview_controller_1.StoreReviewController.getReview);
        // Update an existing review for store  by its ID.
        router.route("/api/v1/storeReviews/update/:id").put(storeReview_controller_1.StoreReviewController.updateReview);
        // Delete a review for store  by its ID.
        router.route("/api/v1/storeReviews/delete/:id").delete(storeReview_controller_1.StoreReviewController.deleteReview);
        // Revoke a review for store  by its ID.
        router.route("/api/v1/storeReviews/revoke/:id").delete(storeReview_controller_1.StoreReviewController.revokeReview);
        //*Cart related Routes
        // Get a customer's shopping cart by customer ID.
        router.route("/api/v1/cart/:customerId").get(cart_controller_1.CartController.getCart);
        // Add an item to the shopping cart.
        router.route("/api/v1/cart/addItem").post(cart_controller_1.CartController.addItem);
        // Update the quantity of items in the shopping cart.
        router.route("/api/v1/cart/updateCount").put(cart_controller_1.CartController.updateCount);
        // Delete an item from the shopping cart.
        router.route("/api/v1/cart/deleteItem").put(cart_controller_1.CartController.deleteItem);
        // *Store related routes
        // Create a store for a specific seller.
        router.route("/api/v1/:sellerId/addStore").post(store_controller_1.StoreController.create);
        // Get information about a specific store under a seller.
        router.route("/api/v1/:sellerId/store/:_id").get(store_controller_1.StoreController.getOne);
        // Get a list of all stores under a seller.
        router.route("/api/v1/:sellerId/stores").post(store_controller_1.StoreController.getAll);
        // Update a specific store under a seller.
        router.route("/api/v1/:sellerId/updateStore/:_id").put(store_controller_1.StoreController.update);
        // Delete a specific store under a seller.
        router.route("/api/v1/:sellerId/deleteStore/:_id").delete(store_controller_1.StoreController.delete);
        // Revoke a specific store (optional: specify a seller).
        router.route("/api/v1/deleteStore/:_id").delete(store_controller_1.StoreController.revoke);
        // Upload an image for a specific store under a seller
        router.route("/api/v1/:sellerId/:storeId/addStoreImage").post(upload_middleware_1.default.single("file"), store_controller_1.StoreController.uploadImage);
        // follow a store by it's ID
        router.route("/api/v1/:sellerid/:storeId/follow").post(store_controller_1.StoreController.followStore);
        // Mark a seller as a popular merchant.
        router.route("/api/v1/:sellerId/markAsMerchantPopular").put(store_controller_1.StoreController.getMarkedPopularMerchants);
        // Get a list of all popular merchants.
        router.route("/api/v1/getAllMerchantPopular").get(store_controller_1.StoreController.getMarkedPopularMerchants);
        //*Product API related routes
        // Create a new product for a specific seller and store.
        router.route("/api/v1/:sellerId/:storeId/addProduct").post(product_controller_1.ProductController.create);
        // Get information about a specific product under a seller and store.
        router.route("/api/v1/:sellerId/:storeId/products/:_id").get(product_controller_1.ProductController.getOne);
        // Get a list of all products under a seller and store.
        router.route("/api/v1/:sellerId/:storeId/products").post(product_controller_1.ProductController.getAll);
        // Update a specific product under a seller and store.
        router.route("/api/v1/:sellerId/:storeId/updateProduct/:_id").put(product_controller_1.ProductController.update);
        // Delete a specific product under a seller and store.
        router.route("/api/v1/:sellerId/:storeId/deleteProduct/:_id").delete(product_controller_1.ProductController.delete);
        // Revoke a specific product under a seller and store.
        router.route("/api/v1/deleteProduct/:_id").delete(product_controller_1.ProductController.revoke);
        // Upload an image for a specific product under a seller and store.
        router.route("/api/v1/:sellerId/:storeId/products/:productId/addProductImage").post(upload_middleware_1.default.single("file"), product_controller_1.ProductController.uploadImage);
        // Bulk upload products for a seller and store.
        router.route("/api/v1/:sellerId/:storeId/products/bulkUpload").post(multer_middleware_1.uploadCsvFile.single("file"), product_controller_1.ProductController.bulkUpload);
        // Get the format for bulk product upload.
        router.route("/api/v1/products/bulkUploadFormat").get(product_controller_1.ProductController.bulkUploadFormat);
        //TODO: keep or not the below routes?
        // Get products by their starting letters.
        router.route("/api/v1/productsByLetters").get(product_controller_1.ProductController.getByLetters);
        // router.route("/api/v1/productsByFilters").get(ProductController.getByFilters);    
        //*public product routes
        // Get information about a specific product by its ID.
        router.route("/api/v1/products/:_id").get(product_controller_1.ProductController.getOne2);
        // Get a list of all products.
        router.route("/api/v1/products").post(product_controller_1.ProductController.getAll2);
        // Get products categorized by a specific category (_id is the category id).
        router.route("/api/v1/categoryProducts/:_id").get(product_controller_1.ProductController.categoryProduct);
        //Get whats new in the week products
        router.route("/api/v1/products/get-by-category/:categoryId").get(product_controller_1.ProductController.getNewWeeklyProducts);
        // *public store routes
        // Get information about a specific store by its ID.
        router.route("/api/v1/stores/:_id").get(store_controller_1.StoreController.getOne2);
        // Get a list of all stores.
        router.route("/api/v1/stores").post(store_controller_1.StoreController.getAll2);
        //*Neary by Stores and products routes
        // Get nearby stores.
        router.route("/api/v1/getNearByStores").get(store_controller_1.StoreController.getNearbyStores);
        // // Get nearby fashion stores products.
        // router.route("/api/v1/getNearFashion").get(StoreController.getNearbyFashion);
        // // Get nearby jewelry stores products.
        // router.route("/api/v1/getNearJewellery").get(StoreController.getNearbyJewellery);
        // // Get nearby electronics stores products.
        // router.route("/api/v1/getNearElectronics").get(StoreController.getNearbyElectronics);
        // // Get nearby furniture stores products.
        // router.route("/api/v1/getNearFurniture").get(StoreController.getNearbyFurniture);
        // *Store offer routes
        // Create an offer for a specific seller's store
        router.route("/api/v1/:sellerId/stores/:storeId/offers").post(store_controller_1.StoreController.createOffer);
        // Update an offer for a specific seller's store.
        router.route("/api/v1/:sellerId/stores/:storeId/offers/:offerId").put(store_controller_1.StoreController.updateOffer);
        //*Offer API routes for managing product offers/ discount
        // for offers get projects whose discount>0
        router.route("/api/v1/getAllOffers").get(product_controller_1.ProductController.getAllOffers);
        // for offer deletion set discount=0
        router.route("/api/v1/deleteOffer/:productId").put(product_controller_1.ProductController.deleteOffer);
        //*Category API routes
        // Create a new category
        router.route("/api/v1/categories/addCategory").post(category_controller_1.CategoryController.create);
        // Get category information
        router.route("/api/v1/categories/:_id").get(category_controller_1.CategoryController.getOne);
        // Get a list of all categories
        router.route("/api/v1/categories").post(category_controller_1.CategoryController.getAll);
        // Update a category
        router.route("/api/v1/categories/update/:_id").put(category_controller_1.CategoryController.update);
        // Delete a category
        router.route("/api/v1/categories/delete/:_id").delete(category_controller_1.CategoryController.delete);
        // Upload an image for a category
        router.route("/api/v1/categories/:categoryId/uploadImage").put(upload_middleware_1.default.single("file"), category_controller_1.CategoryController.uploadImage);
        //*Featured categories
        // Mark a category as featured
        router.route("/api/v1/createFeatured/:categoryId").post(category_controller_1.CategoryController.markAsFeatured);
        //Unmark a category as featured
        router.route("/api/v1/deleteFeatured/:categoryId").put(category_controller_1.CategoryController.unMarkAsFeatured);
        // Get all marked featured categories
        router.route("/api/v1/getFeatured").get(category_controller_1.CategoryController.getAllMarkedFeaturedCategories);
        // Home categories API routes
        // Get categories for the home dashboard / navbar.
        router.route("/api/v1/homeCategories").get(category_controller_1.CategoryController.dashboardCategories);
        // Get homepage categories to show on the home page.
        router.route("/api/v1/homePageCategories").get(category_controller_1.CategoryController.homepageCategories);
        //*Brand API routes
        // Create a new brand.
        router.route("/api/v1/brands/addBrand").post(brand_controller_1.BrandController.addBrand);
        // Get brand information by name.
        router.route("/api/v1/brands/:name").get(brand_controller_1.BrandController.getBrand);
        // Upload a brand's logo.
        router.route("/api/v1/brands/uploadLogo").post(brand_controller_1.BrandController.uploadImage);
        // Upload a brand's video.
        router.route("/api/v1/brands/uploadVideo").post(brand_controller_1.BrandController.uploadVideo);
        // Delete a brand by its ID.
        router.route("/api/v1/brands/deleteBrand/:_id").delete(brand_controller_1.BrandController.deleteBrand);
        // Mark a brand as popular by its ID.
        router.route("/api/v1/brands/markAsPopular/:brandId").put(brand_controller_1.BrandController.markBrandAsPopular);
        // Get a list of popular brands.
        router.route("/api/v1/getPopularBrand").get(brand_controller_1.BrandController.getAllMarkedPopularBrands);
        //*Order API routes
        // Create a new order for a specific user.
        router.route("/api/v1/:userId/addOrder").post(order_controller_1.OrderController.create);
        // Get a list of orders for a specific user.
        router.route("/api/v1/:userId/myOrders").get(order_controller_1.OrderController.getMyOrder);
        // Get a list of all orders.
        router.route("/api/v1/getAllOrders").get(order_controller_1.OrderController.getAll);
        // Update a specific order by its ID.
        router.route("/api/v1/updateOrder/:_id").put(order_controller_1.OrderController.update);
        // Delete a specific order by its ID.
        router.route("/api/v1/deleteOrder/:_id").delete(order_controller_1.OrderController.delete);
        // Protected route with authorization check
        router.route("/api/v1/protected-route").get(security_middleware_1.securityCheck, protected_controller_1.ProtectedController.protectedRoute);
        //send otp for a mobile number
        router.route("/api/v1/send-otp").post(loginAuth_controller_1.LoginAuthController.sendOTP);
        //verify otp for a mobile number
        router.route("/api/v1/verify-otp").post(loginAuth_controller_1.LoginAuthController.verifyOTP);
        //*Coupon API routes
        // Create a new coupon.
        router.route("/api/v1/coupons/createCoupon").post(coupon_controller_1.CouponController.createCoupon);
        // Get a list of all coupons.
        router.route("/api/v1/coupons/getAll").get(coupon_controller_1.CouponController.getCoupons);
        // Get a specific coupon by its ID.
        router.route("/api/v1/coupons/getCouponById/:id").get(coupon_controller_1.CouponController.getCouponById);
        // Update a specific coupon by its ID.
        router.route("/api/v1/coupons/updateCoupon/:id").put(coupon_controller_1.CouponController.updateCoupon);
        // Delete a specific coupon by its ID.
        router.route("/api/v1/coupons/deleteCoupon/:id").delete(coupon_controller_1.CouponController.deleteCoupon);
        // Apply a coupon to an order.
        router.route("/api/v1/coupons/applyCoupon").post(coupon_controller_1.CouponController.applyCoupon);
        //*Notification API routes
        // Create a new notification.
        router.route("/api/v1/notifications/addNotification").post(notification_controller_1.NotificationController.createNotification);
        // Get a list of notifications for a specific user.
        router.route("/api/v1/notifications/getAll/:userId").get(notification_controller_1.NotificationController.getNotifications);
        // Mark a specific notification as read by its ID.
        router.route("/api/v1/notifications/markRead/:id").put(notification_controller_1.NotificationController.markNotificationAsRead);
        // Delete a specific notification by its ID.
        router.route("/api/v1/notifications/deleteNotification/:id").delete(notification_controller_1.NotificationController.deleteNotification);
        // Update a specific notification by its ID.
        router.route("/api/v1/notifications/updateNotification/:id").put(notification_controller_1.NotificationController.updateNotification);
        //*Search API routes
        //Search product
        router.route("/api/v1/search").get(search_controller_1.SearchController.search);
        //*Chat API routes
        // Create a new chat.
        router.route("/api/v1/chat/addChat").post(chat_controller_1.ChatController.createChat);
        // Get a specific chat by its ID.
        router.route("/api/v1/chat/:id").get(chat_controller_1.ChatController.getChatById);
        // Update a specific chat by its ID.
        router.route("/api/v1/chat/:id").put(chat_controller_1.ChatController.updateChat);
        // Delete a specific chat by its ID.
        router.route("/api/v1/chat/:id").delete(chat_controller_1.ChatController.deleteChat);
        //*Contact Us API routes
        // Create a new contact us entry.
        router.route("/api/v1/contactUs/addContact").post(contact_controller_1.ContactUsController.createContactUs);
        // Get a list of all contact us entries.
        router.route("/api/v1/contactUs/getAll").get(contact_controller_1.ContactUsController.getContactUsEntries);
        // Get a specific contact us entry by its ID.
        router.route("/api/v1/contactUs/getById/:id").get(contact_controller_1.ContactUsController.getContactUsEntryById);
        // Update a specific contact us entry by its ID.
        router.route("/api/v1/contactUs/updateContact/:id").put(contact_controller_1.ContactUsController.updateContactUsEntry);
        // Delete a specific contact us entry by its ID.
        router.route("/api/v1/contactUs/deleteContact/:id").delete(contact_controller_1.ContactUsController.deleteContactUsEntry);
        //?what is this API for?
        //Todo: change or remove it
        router.route("/api/v1/arrivals").get(arrival_controller_1.ArrivalController.getAll);
        router.route("/api/v1/arrivals/addArrival").post(arrival_controller_1.ArrivalController.create);
        router.route("/api/v1/arrivals/getOne/:id").get(arrival_controller_1.ArrivalController.getOne);
        router.route("/api/v1/arrivals/getAll").get(arrival_controller_1.ArrivalController.getAll);
        router.route("/api/v1/arrivals/updateArrival/:id").put(arrival_controller_1.ArrivalController.update);
        router.route("/api/v1/arrivals/deleteArrival/:id").delete(arrival_controller_1.ArrivalController.delete);
        // * Paymentgateway Phonepe
        //*Payment API routes
        // Create a new payment entry.
        router.route("/api/v1/payments/create").post(payment_controller_1.PaymentController.createPayment);
        // Get a list of all payment entries.
        router.route("/api/v1/payments/getAll").get(payment_controller_1.PaymentController.getPayments);
        // Get a specific payment entry by its ID.
        router.route("/api/v1/payments/getPaymentById/:id").get(payment_controller_1.PaymentController.getPaymentById);
        // Update a specific payment entry by its ID.
        router.route("/api/v1/payments/updatePayment/:id").put(payment_controller_1.PaymentController.updatePayment);
        // Delete a specific payment entry by its ID.
        router.route("/api/v1/payments/deletePayment/:id").delete(payment_controller_1.PaymentController.deletePayment);
        // Download/ Retrieve an image by its name.
        router.route("/api/v1/uploads/:name").get(download_contoller_1.DownloadController.downloadImage);
        //*User wishlist API routes
        // Add a product to a user's wishlist.
        router.route("/api/v1/addWishList/:userId/:productId").post(user_controller_1.UserController.addWishList);
        // Delete a product from a user's wishlist.
        router.route("/api/v1/deleteWishList/:userId/:productId").delete(user_controller_1.UserController.deleteWishList);
        //?already ther are order routes above
        //todo: change or remove below routes
        router.route("/api/v1/order/:userId").post(order_controller_1.OrderController.create);
        router.route("/api/v1/order/user/:userId").get(order_controller_1.OrderController.getMyOrder);
        router.route("/api/v1/order").get(order_controller_1.OrderController.getAll);
        router.route("/api/v1/order/:id").put(order_controller_1.OrderController.update);
        router.route("/api/v1/order/:id").delete(order_controller_1.OrderController.delete);
        // router.route("/api/v1/user/recommended/:id").get(OrderController.getRecommendedProducts);
        // *Submit a contact form in a portfolio.
        router.route("/api/v1/portfolio/contactform").post(PortfolioController_1.PortfolioController.contactUs);
        //pdf verification
        // router.route("/api/v1/saveFormData").post(uploads.single('aadharUpload'),VerificationController.mainVerification); //for single upload
        router.route("/api/v1/saveFormData/:sellerId").post(multerConfig_1.default.any(), verification_controller_1.VerificationController.mainVerification);
        router.route("/api/v1/getFormData/:sellerId").get(verification_controller_1.VerificationController.getFile);
        return router;
    }
}
exports.MainRoute = MainRoute;
//# sourceMappingURL=main.routes.js.map