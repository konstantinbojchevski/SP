
const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *   setWallet:
 *    description: Set wallet.
 *    type: object
 *    properties:
 *     wallet:
 *      type: integer
 *      example: 71c7656ec7ab88b098defb751b7401b5f6d8976f
 *    required:
 *     - wallet
 *   getAd:
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

mongoose.model("Payment", PaymentsSchema, "Payments");
