
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * components:
 *  schemas:
 *   UserSignIn:
 *    type: object
 *    description: User info for sign in.
 *    properties:
 *     username:
 *      type: string
 *      description: username
 *      example: myusername
 *     password:
 *      type: string
 *      format: password
 *      example: 12345678
 *    required:
 *     - username
 *     - password
 *   UserRegistration:
 *    type: object
 *    description: User info for registration.
 *    properties:
 *     username:
 *      type: string
 *      description: username
 *      example: myusername
 *     password:
 *      type: string
 *      format: password
 *      example: 12345678
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
 *     - password
 *     - firstName
 *     - lastName
 *     - dateOfBirth
 *     - email
 *     - numberOfPets
 *     - location
 *   AvtentikacijaOdgovor:
 *    type: object
 *    description: Rezultat uspešne avtentikacije uporabnika
 *    properties:
 *     žeton:
 *      type: string
 *      description: JWT žeton
 *      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGZhMjBlZDlhZGM0MzIyNmY0NjhkZjMiLCJlbGVrdHJvbnNraU5hc2xvdiI6ImRlamFuQGxhdmJpYy5uZXQiLCJpbWUiOiJEZWphbiBMYXZiacSNIiwiZGF0dW1Qb3Rla2EiOjE1Nzc5NTU2NjMsImlhdCI6MTU3NzM1MDg2M30.PgSpqjK8qD2dHUsXKwmqzhcBOJXUUwtIOHP3Xt6tbBA
 *    required:
 *     - žeton
 *   Error:
 *    type: object
 *    description: Error description
 *    required:
 *     - message
 *    properties:
 *     message:
 *      type: string
 *   Success:
 *      type: string
 *      description: Success.
 *
 *
 */
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
})

UserSchema.pre("save", function (next) {
    const user = this
    console.log("HERE")

    bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
            return next(saltError)
        } else {
            bcrypt.hash(user.password, salt, function(hashError, hash) {
                if (hashError) {
                    return next(hashError)
                }
                console.log(hash)
                user.password = hash
                next()
            })
        }
    })
})

UserSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
        if (error) {
            return callback(error)
        } else {
            callback(null, isMatch)
        }
    })
}

UserSchema.methods.generirajJwt = function () {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 10);
    console.log(process.env)
    role = "user"
    if(this.username === "admin") {
        role = "admin"
    }

    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            exp: parseInt(expiryDate.getTime() / 1000),
            role: role
        },
        "ShhItsASecret"
    );
};


mongoose.model("User", UserSchema, "Users");
