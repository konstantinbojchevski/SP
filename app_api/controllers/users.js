const mongoose = require("mongoose");
const {mongo} = require("mongoose");
const UserModel = mongoose.model("User");
const UserProfileModel = mongoose.model("UserProfile");
const AdModel = mongoose.model("Ad");
const PaymentModel = mongoose.model("Payment");
const execSync = require('child_process').execSync;
const fs = require("fs");
const {ObjectID, ObjectId} = require("mongodb");


const addUser = (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.firstName ||
        !req.body.lastName || !req.body.dateOfBirth || !req.body.numberOfPets || !req.body.location ||
        !req.body.email) {
        res.redirect("/error");
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
                res.status(400).json(error);
            } else {
                newUser.save(function(error) {
                    if(error) {
                        res.status(400).json(error);
                    } else {
                        res.status(201).json("Success");
                    }
                })
            }
        })
    }
};

const error = (req, res) => {
    res.redirect("/error");
}

const checkSignin = (req, res) => {
    if(!req.body.username || !req.body.password){
        res.redirect("/error");
    }
    else {
        let user = req.body.username;
        let password = req.body.password;
        UserModel.findOne({username: user}).exec(function(error, user) {
            if(error) {
                res.status(400).json(error)
            } else if(!user) {
                res.status(401).json(error)
            } else {
                user.comparePassword(password, function(matchError, isMatch) {
                    if (matchError) {
                        res.status(403).send("Error")
                    } else if (!isMatch) {
                        res.status(403).send("Passwords don't match")
                    } else {
                        res.status(200).json("Success");
                    }
                })
            }
        })
    }
};

const getUser = (req, res) => {
    if(!req.query.username){
        res.redirect("/error");
    }
    else {
        let username = req.query.username;
        UserProfileModel.findOne({username: username}).exec(function(error, user) {
            if(error) {
                res.status(400).json(error)
            } else if(!user) {
                res.status(401).json(error)
            } else {
                res.status(200).json(user)
            }
        })
    }
};

const getAdsSearch = (req, res) => {
    if(!req.query.search){
        res.redirect("/error");
    }
    else {
        const search = req.query.search;
        const searchRgx = new RegExp(search);

        AdModel.find({
            $or:[
                { 'dog.dogname': { $regex: searchRgx, $options: 'i' } },
                { city: { $regex: searchRgx, $options: "i"}}]
        }).exec(function(error, ads) {
            if(error) {
                console.log("error u api");
                console.log(error)
                res.status(400).json(error)
            } else if(!ads) {
                console.log("error u api no ads");
                res.status(401).json(error)
            } else {
                res.status(200).json(ads)
            }
        })
    }
};

const filter = (req, res) => {
    const city = req.query.city;
    const searchCity = new RegExp(city);
    const task= parseInt(req.query.task);
    const price = req.query.price;
    AdModel.find({
        $and:[
            { price: { $lte: price } },
            { city: { $regex: searchCity, $options: "i"}},
            { 'dog.breed' : req.query.breed},
            { task:  req.query.task }]
    }).exec(function(error, ads) {
        if(error) {
            console.log("error u api");
            console.log(error)
            res.status(400).json(error)
        } else if(!ads) {
            console.log("error u api no ads");
            res.status(401).json(error)
        } else {
            res.status(200).json(ads)
        }
    })
};


const clearCollections = (req, res) => {
    mongoose.connection.dropCollection('Users',function (error) {

        if(error) {
            res.status(400).json(error);
        }
        else {
            mongoose.connection.dropCollection('UserProfiles',function (error) {

                if(error) {
                    res.status(400).json(error);
                }
                else {
                    mongoose.connection.dropCollection('Ads',function (error) {

                        if(error) {
                            res.status(400).json(error);
                        }
                        else {
                            res.status(201).json("Success");
                        }
                    });
                }
            });
        }
    });

}

const wallet = (req, res) => {
    console.log(req.body.body)
    if(!req.body.body.id){
        res.redirect("/error");
    }
    else {
        let wallet = new PaymentModel({
            wallet: req.body.body.wallet
        })
        UserProfileModel.findByIdAndUpdate(req.body.body.id,
            {
                wallet: wallet

            }, {},function (error, wallet) {
                if(error) {
                    console.log("Greska vo api!!!!!!!!!!!!!!")
                    console.log(error);
                    res.status(400).json(error);
                }
                else {
                    res.status(200).json("Updated");
                }

            });
    }
};

const deleteUser = (req, res) => {
    if(!req.query.username) {
        res.status(400).json("Error");
    } else {
        UserModel.findOneAndDelete({username: req.query.username}).exec(function(error, delUser) {
            if(error)
                res.status(400).json("Error");
            else {
                UserProfileModel.findOneAndDelete({username: req.query.username}).exec(function(error, delProf) {
                    if(error)
                        res.status(400).json("Error");
                    else {
                        AdModel.deleteMany({_id: delProf.ads}, function(error, result) {
                            if(error)
                                res.status(400).json("Error");
                            else {
                                res.status(204).json(null);
                            }
                        })
                    }
                })
            }
        })
    }

}

const db = (req, res) => {
    fs.readFile('userss.json', 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
        data = data.trim();
        var json = JSON.parse(data);
        console.log(json);

        json.forEach(element => {
            element._id = ObjectId(element._id);
            UserModel.collection.insertOne(element)
        })
        fs.readFile("Users.json", 'utf8', function(err, dataa) {
            dataa = dataa.trim();
            var jsonn = JSON.parse(dataa);
            jsonn.forEach(element => {
                element._id = ObjectId(element._id);
                UserProfileModel.collection.insertOne(element)
            })
            fs.readFile("Adss.json", 'utf8', function(err, dataaa) {
                dataaa = dataaa.trim();
                var jsonnn = JSON.parse(dataaa);
                jsonnn.forEach(element => {
                    element._id = ObjectId(element._id);
                    AdModel.collection.insertOne(element)
                })
                res.status(200).send({message:"success"});
            })
        })
})
}



module.exports = {
    addUser,
    checkSignin,
    getUser,
    getAdsSearch,
    filter,
    clearCollections,
    error,
    wallet,
    deleteUser,
    db
};