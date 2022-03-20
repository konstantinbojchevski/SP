const passport = require("passport");
const LokalnaStrategija = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("User");

passport.use(
    new LokalnaStrategija(
        {
        usernameField: "username",
        passwordField: "password",
    },
        (usernam, pass, pkFinal) => {
            User.findOne(
                {username: usernam},
                (error, user) => {
                    if(error) return pkFinal(error);
                    console.log(user);
                    if(!user)
                        return pkFinal(null, false, {
                            message: "Wrong usrename",
                        });
                    else {
                        user.comparePassword(pass, function(matchError, isMatch) {
                            if (!isMatch) {
                                return pkFinal(null, false, {message: "Wrong password"});
                            } else {
                                return pkFinal(null, user);
                            }
                        })
                    }

                }
            )
        }
    )
)