
const express = require("express");
const router = express.Router();
const ctrlUsers = require("../controllers/users");
const ctrlPayments = require("../controllers/payments");
const ctrlDogs = require("../controllers/dogs");
const multer = require("multer");
const path = require("path");
const ctrlAuth = require("../controllers/authentication");
const jwt = require("express-jwt");

/**
 * Kategorije dostopnih točk
 * @swagger
 * tags:
 *  - name: Users
 *  - name: Ads
 *  - name: Authentication
 */

/**
 * Varnostna shema dostopa
 * @swagger
 * components:
 *  securitySchemes:
 *   jwt:
 *    type: http
 *    scheme: bearer
 *    in: header
 *    bearerFormat: JWT
 */

const authentication = jwt({
    secret: "ShhItsASecret",
    userProperty: "payload",
    algorithms: ["HS256"],
});


const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        console.log("TUKAAA")
        cb(null, 'public/images');
    },

    filename: function(req, file, cb) {
        console.log("TUKAAAAAAAAAAA")
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({storage: storage}).single('photo');

// router.post("/register", ctrlUsers.addUser)
/**
 * @swagger
 *   /register:
 *     post:
 *       summary: Register new user
 *       description: Register new user
 *       tags: [Authentication]
 *       requestBody:
 *         description: Registration data
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/UserRegistration"
 *       responses:
 *         "200":
 *           description: Success.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Success"
 *         "400":
 *           description: Bad request.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Error"
 */
router.post("/register", ctrlAuth.addUser)
/**
 * @swagger
 *   /signin:
 *     post:
 *       summary: User sign in
 *       description: User sign in
 *       tags: [Authentication]
 *       requestBody:
 *         description: Sign in data
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/UserSignIn"
 *       responses:
 *         "200":
 *           description: Successful sign in.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Success"
 *         "400":
 *           description: Bad request.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Error"
 *               example:
 *                 message: Invalid data.
 *         "401":
 *           description: Unauthorised.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Error"
 */
router.post("/signin", ctrlAuth.checkSignin)


/**
 * @swagger
 *  /newAd:
 *   post:
 *    summary: Add new ad.
 *    description: Adding new ad.
 *    tags: [Ads]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Ad data
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/setAd"
 *    responses:
 *     "201":
 *      description: Successfully added new ad.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/getAd"
 *     "400":
 *      description: Bad request.
 *     "401":
 *      description: Unauthorized.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 */
router.post("/newad", [authentication, upload], ctrlDogs.addDog)
// router.post('/newad', (req, res, next) => {
//
//     // here the req.body will turn out {}
//     upload(req, res, (err) => {
//         console.log(res.req.file)
//         if(err)
//             console.log(err);
//
//     })
//
// })
// router.post("/signin", ctrlUsers.checkSignin)
/**
 * @swagger
 *  /user?username={username}:
 *   get:
 *    summary: Get user.
 *    description: Get user by username.
 *    tags: [Users]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: username
 *       description: username of user
 *       schema:
 *        type: string
 *       required: true
 *       example: myusername
 *    responses:
 *     "200":
 *      description: Successfully got user.
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/getUserProfile"
 *     "400":
 *      description: Bad request.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        example:
 *         message: Parameters are required.
 *     "401":
 *           description: Unauthorised.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Error"
 */
router.get("/user", authentication, ctrlUsers.getUser)
/**
 * @swagger
 *  /ads:
 *   get:
 *    summary: Get ads.
 *    description: Get all ads.
 *    tags: [Ads]
 *    responses:
 *     "200":
 *      description: Successfully got all the ads.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/getAd"
 *     "400":
 *      description: Bad request.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        example:
 *         message: Parameters are required.
 */
router.get("/ads", ctrlDogs.getAds)
router.get("/ads2", ctrlDogs.getAds)

/**
 * @swagger
 *  /ad?id={id}:
 *   get:
 *    summary: Get ad by id.
 *    description: Get ad by id.
 *    tags: [Ads]
 *    parameters:
 *     - in: path
 *       name: id
 *       description: id of the ad
 *       schema:
 *        type: string
 *       required: true
 *       example: 5ded18eb51386c3799833191
 *    responses:
 *     "200":
 *      description: Successfully got ad by id.
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/getAd"
 *     "400":
 *      description: Bad request.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        example:
 *         message: Parameters are required.
 */
router.get("/ad", ctrlDogs.getAdById)
router.get("/adsById", ctrlDogs.getAdsById)

/**
 * @swagger
 *  /deleteDog:
 *   delete:
 *    summary: Delete ad
 *    description: Delete ad.
 *    tags: [Ads]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description:
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/deleteAd"
 *    responses:
 *     "204":
 *      description: Successfully deleted ad.
 *     "400":
 *      description: Bad request.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        example:
 *         message: Parameters are required.
 *     "401":
 *      description: Unauthorised.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *
 */
router.delete("/deleteDog", authentication, ctrlDogs.deleteById);

/**
 * @swagger
 *  /search?search={search}:
 *   get:
 *    summary: Search ads.
 *    description: Search ads by location and names.
 *    tags: [Ads]
 *    parameters:
 *     - in: path
 *       name: search
 *       description: search
 *       schema:
 *        type: string
 *       required: true
 *       example: Ljubljana
 *    responses:
 *     "200":
 *      description: Successfully searched ads.
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/getAd"
 *     "400":
 *      description: Bad request.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        example:
 *         message: Parameters are required.
 */
router.get("/search", ctrlUsers.getAdsSearch);
/**
 * @swagger
 *  /filter?city={city}&task={task}&breed={breed}&price={price}:
 *   get:
 *    summary: Filter ads.
 *    description: Search ads by city, task, breed and price.
 *    tags: [Ads]
 *    parameters:
 *     - in: path
 *       name: city
 *       description: location
 *       schema:
 *        type: string
 *       required: true
 *       example: Ljubljana
 *     - in: path
 *       name: task
 *       description: task
 *       schema:
 *        type: integer
 *       required: true
 *       example: 1
 *     - in: path
 *       name: breed
 *       description: breed
 *       schema:
 *        type: string
 *       required: true
 *       example: bulldog
 *     - in: path
 *       name: price
 *       description: price
 *       schema:
 *        type: integer
 *       required: true
 *       example: 30
 *    responses:
 *     "200":
 *      description: Successfully searched ads.
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/getAd"
 *     "400":
 *      description: Bad request.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        example:
 *         message: Parameters are required.
 */
router.get("/filter", ctrlUsers.filter);
router.get("/user/clear", ctrlUsers.clearCollections);

router.post("/editDog", authentication, ctrlDogs.editDog);
router.get("/error", ctrlUsers.error);


/**
 * @swagger
 *  /wallet:
 *   post:
 *    summary: Add wallet to user.
 *    description: Adding wallet for user.
 *    tags: [Users]
 *    requestBody:
 *     description: Wallet data
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/setWallet"
 *    responses:
 *     "201":
 *      description: Successfully added wallet.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/getWallet"
 *     "400":
 *      description: Bad request.
 */
router.post("/wallet", ctrlUsers.wallet);
router.delete("/user/delete", authentication, ctrlUsers.deleteUser)
router.get("/db", ctrlUsers.db)

module.exports = router;
