
const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectId;


/**
 * @swagger
 * components:
 *  schemas:
 *   setWallet:
 *    description: Set wallet.
 *    type: object
 *    properties:
 *     body:
 *      type: object
 *      properties:
 *       id:
 *        type: integer
 *       wallet:
 *        type: integer
 *        example: 71c7656ec7ab88b098defb751b7401b5f6d8976f
 *    required:
 *     - body
 *   getWallet:
 *    description: Get wallet.
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      example: 5e04bfb6a3aff223697cbbcb
 *     wallet:
 *      type: integer
 *      example: 71c7656ec7ab88b098defb751b7401b5f6d8976f
 *    required:
 *     - _id
 *     - wallet
 */

const PaymentsSchema = new mongoose.Schema({
    wallet: {type: String, required: true}
})


/**
 * @swagger
 * components:
 *  schemas:
 *   setUserProfile:
 *    description: Set user.
 *    type: object
 *    properties:
 *     username:
 *      type: string
 *      example: myusername
 *     firstName:
 *      type: string
 *      example: Petar
 *     lastName:
 *      type: string
 *      example: Petrov
 *     dateOfBirth:
 *      type: string
 *      format: date
 *      example: 2017-07-21
 *     email:
 *      type: string
 *      example: myemail@gmail.com
 *     numberOfPets:
 *      type: integer
 *      example: 2
 *     location:
 *      type: string
 *      example: Ljubljana
 *    required:
 *     - username
 *     - firstName
 *     - lastName
 *     - dateOfBirth
 *     - email
 *     - numberOfPets
 *     - location
 *   getUserProfile:
 *    description: Get user.
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      example: 5e04bfb6a3aff223697cbbcb
 *     username:
 *      type: string
 *      example: myusername
 *     firstName:
 *      type: string
 *      example: Petar
 *     lastName:
 *      type: string
 *      example: Petrov
 *     dateOfBirth:
 *      type: string
 *      format: date
 *      example: 2017-07-21
 *     email:
 *      type: string
 *      example: myemail@gmail.com
 *     numberOfPets:
 *      type: integer
 *      example: 2
 *     location:
 *      type: string
 *      example: Ljubljana
 *    required:
 *     - username
 *     - firstName
 *     - lastName
 *     - dateOfBirth
 *     - email
 *     - numberOfPets
 *     - location
 */

const UserProfileSchema = new mongoose.Schema({
    username: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    email: {type: String, required: true},
    numberOfPets: {type: Number, required: true},
    location: {type: String, required: true},
    ads: [ObjectId],
    previousAds: Number,
    wallet: PaymentsSchema
    //profilePicture: {type: String, required: true},
    //payments: [PaymentsSchema]
})

mongoose.model("UserProfile", UserProfileSchema, "UserProfiles");
