const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
// const DogModel = mongoose.model("Dog");
const AdModel = mongoose.model("Ad");
const UserProfileModel = mongoose.model("UserProfile");

const addDog = (req, res) => {
    console.log(req.body)

    if (!req.body.dogname || !req.body.breed || !req.body.breed || !req.body.energyLevel || !req.body.goodWithDogs || !req.body.shedding) {
        res.send("/error");
    } else {
        console.log(res.req.file.filename);
        dataa = fs.readFileSync(path.join("public/images/" + res.req.file.filename));

        // console.log("PRINTAM")
        photo = dataa.toString("base64")
        console.log("TUKAAAAAA")
        console.log(photo);
        const newDog = {
            dogname: req.body.dogname,
            breed: req.body.breed,
            energyLevel: req.body.energyLevel,
            goodWithDogs: req.body.goodWithDogs,
            shedding: req.body.shedding,
            photourl: req.body.photourl,
            photo: photo
        }
        const newAd = new AdModel({
            username: req.body.username,
            datefrom: req.body.datefrom,
            dateto: req.body.dateto,
            price: req.body.price,
            task: req.body.task,
            city: req.body.city,
            phone: req.body.phone,
            dog: newDog
        })
        newAd.save(function (error, model) {
            if (error) {
                res.status(400).json(error);
            } else {
                UserProfileModel.findOneAndUpdate(
                    {username: req.body.username},
                    {$push: {ads: model._id}},
                    function (err, model) {
                        if (err) {
                            res.status(400).json(err);
                        } else {
                            res.status(201).json(model);
                        }
                    }
                )
            }
        })
    }
};

const getAds = (req, res) => {
    AdModel.find().exec(function(error, ads){
        if(error) {
            res.status(400).json(error);
        } else if (!ads){
            res.status(401).json(error);
        }
        else {
            res.status(200).json(ads);
        }
    })
}

const getAdById = (req, res) => {
    if(!req.query.id) {
        res.redirect("/error");
    }
    else {
        AdModel.findById(req.query.id).exec(function(error, ad){
            if(error) {
                res.status(400).json(error);
            } else if (!ad){
                res.status(401).json(error);
            }
            else {
                UserProfileModel.findOne({username: ad.username}).exec(function(error, user) {
                    if(error) {
                        res.status(400).json(error)
                    } else if(!user) {
                        res.status(401).json(error)
                    } else {
                        let p3 = JSON.parse(JSON.stringify(ad));
                        p3.lastName = user.lastName;
                        p3.firstName = user.firstName;
                        res.status(200).json(p3)
                    }
                })
            }
        })
    }
}

const deleteById = (req, res) => {
    console.log(req.body)
    if(!req.body.id){
        res.redirect("/error")
    }
    else {
        let id = mongoose.Types.ObjectId(req.body.id)
        AdModel.findByIdAndDelete(req.body.id).exec(function(error, delAd){
            if(error) {
                res.status(400).json(error);
            }
            UserProfileModel.findOneAndUpdate(
                {username: req.body.username},
                {$pull: {ads: id}, $inc: {previousAds: 1}},
                function(error, user) {
                    if(error) {
                        res.status(400).json(error);
                    } if(!user) {
                        res.status(404).json(error);
                    } else {
                        res.status(200).json("Success");
                    }
                })
        })
    }
}


const getAdsById = (req, res) => {
    // if(!req.query.ads){
    //     res.status(404).json({message: "No adds"});
    // }
    // else {
        AdModel.find().where('_id').in(req.query.ads).exec((error, records) => {
            if(error) {
                res.status(400).json(error);
            } else if (!records){
                res.status(401).json(error);
            }
            else {
                res.status(200).json(records);
            }
        });
    // }
}

const editDog = (req, res) => {
    if(!req.body.id){
        console.log(req.body)
        res.redirect("/error");
    }
    else {
        AdModel.findByIdAndUpdate(req.body.id,
            {
                'dog.0.dogname' : req.body.dogname,
                datefrom: req.body.datefrom,
                dateto: req.body.dateto,
                price: req.body.price,
                task: req.body.task,
                city: req.body.city,
                phone: req.body.phone,
            }, {},function (error, ad) {
                if(error) {
                    res.status(400).json(error);
                }
                else {
                    console.log(ad);
                    res.status(200).json("Updated");
                }

            });
    }
};


module.exports = {
    addDog,
    getAds,
    getAdById,
    getAdsById,
    deleteById,
    editDog
};