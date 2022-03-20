const passport = require("passport");
const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
const UserProfileModel = mongoose.model("UserProfile");

const addUser = (req, res) => {
    console.log(req.body);
    if (!req.body.username || !req.body.password || !req.body.firstName ||
        !req.body.lastName || !req.body.dateOfBirth || !req.body.numberOfPets || !req.body.location ||
        !req.body.email) {
        return res.status(400).json({ message: "Bad request" });
    }
    else {
        const newUser = new UserModel({
            username: req.body.username,
            password: req.body.password
        })

        const newUserProfile = new UserProfileModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            dateOfBirth: req.body.dateOfBirth,
            numberOfPets: req.body.numberOfPets,
            location: req.body.location,
            email: req.body.email,
            previousAds: 0
        })

        newUserProfile.save(function(error) {
            if(error) {
                console.log(error);
                res.status(500).json(error);
            } else {
                newUser.save(function(error) {
                    if(error) {
                        res.status(500).json(error);
                    } else {
                        res.status(200).json({ token: newUser.generirajJwt()});
                    }
                })
            }
        })
    }
};

const checkSignin = (req, res) => {
    if(!req.body.username || !req.body.password){
        return res.status(400).json({ message: "Bad request" });
    }
    else {
        passport.authenticate("local", (error, user, information) => {
            if(error) return res.status(500).json(error);
            if(user) res.status(200).json({token: user.generirajJwt()});
            else res.status(401).json(information);
        })(req, res);
        // UserModel.findOne({username: user}).exec(function(error, user) {
        //     if(error) {
        //         res.status(400).json(error)
        //     } else if(!user) {
        //         res.status(401).json(error)
        //     } else {
        //         user.comparePassword(password, function(matchError, isMatch) {
        //             if (matchError) {
        //                 res.status(403).send("Error")
        //             } else if (!isMatch) {
        //                 res.status(403).send("Passwords don't match")
        //             } else {
        //                 res.status(200).json("Success");
        //             }
        //         })
        //     }
        // })
    }
};

module.exports = {
    addUser,
    checkSignin
}