const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *   Dog:
 *    type: object
 *    properties:
 *     dogname:
 *      type: string
 *     breed:
 *      type: string
 *     energyLevel:
 *      type: integer
 *     goodWithDogs:
 *      type: integer
 *     shedding:
 *      type: integer
 *     photoUrl:
 *      type: string
 *     photo:
 *      type: object
 *      properties:
 *       data:
 *        type: string
 *        format: file
 *       contentType:
 *        type: string
 *    required:
 *     - dogname
 *     - breed
 *     - energyLevel
 *     - goodWithDogs
 *     - shedding
 */

const DogSchema = new mongoose.Schema({
    dogname: {type: String, required: true},
    breed: {type: String, required: true},
    energyLevel: {type: Number, required: true},
    goodWithDogs: {type: Number, required: true},
    shedding: {type: Number, required: true},
    photourl: {type: String},
    photo:
        {
            type: String
        }
})

/**
 * @swagger
 * components:
 *  schemas:
 *   setAd:
 *    description: Set ad.
 *    type: object
 *    properties:
 *     username:
 *      type: string
 *      example: myusername
 *     datefrom:
 *      type: string
 *      format: date
 *      example: 2017-07-21
 *     dateto:
 *      type: string
 *      format: date
 *      example: 2017-07-21
 *     price:
 *      type: integer
 *      example: 30
 *     task:
 *      type: string
 *      example: walking
 *     city:
 *      type: string
 *      example: Ljubljana
 *     phone:
 *      type: string
 *      example: 000-000-000
 *     dog:
 *      type: object
 *      $ref: "#/components/schemas/Dog"
 *    required:
 *     - username
 *     - datefrom
 *     - dateto
 *     - price
 *     - task
 *     - city
 *     - phone
 *     - dog
 *   getAd:
 *    description: Get ad.
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      example: 5e04bfb6a3aff223697cbbcb
 *     username:
 *      type: string
 *      example: myusername
 *     datefrom:
 *      type: string
 *      format: date
 *      example: 2017-07-21
 *     dateto:
 *      type: string
 *      format: date
 *      example: 2017-07-21
 *     price:
 *      type: integer
 *      example: 30
 *     task:
 *      type: string
 *      example: walking
 *     city:
 *      type: string
 *      example: Ljubljana
 *     phone:
 *      type: string
 *      example: 000-000-000
 *     dog:
 *      type: object
 *      $ref: "#/components/schemas/Dog"
 *    required:
 *     - _id
 *     - username
 *     - datefrom
 *     - dateto
 *     - price
 *     - task
 *     - city
 *     - phone
 *     - dog
 *   deleteAd:
 *    description: Delete ad.
 *    type: object
 *    properties:
 *     id:
 *      type: number
 *    required:
 *     - id
 */

const AdSchema = new mongoose.Schema({
    username: {type: String, required: true},
    datefrom: {type: Date, required: true},
    dateto: {type: Date, required: true},
    price: {type: Number, required: true},
    task: {type: String, required: true},
    city: {type: String, required: true},
    phone: {type: String, required: true},
    dog: [DogSchema]
})

mongoose.model("Ad", AdSchema, "Ads");
