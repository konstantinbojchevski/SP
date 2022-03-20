var fs = require('fs');

var apiParameters = {
    server: "http://localhost:" + (process.env.PORT || 3000),
};
if (process.env.NODE_ENV === "production") {
    apiParameters.server = "https://pettany.herokuapp.com/";
}
const axios = require("axios").create({
    baseURL: apiParameters.server,
    timeout: 5000,
});

const addDog = (req, res) => {

    console.log(req.body)
    if (!req.file) {
        return res.send('Please select an image to upload');
    }

    axios({
        method: "post",
        url: "api/newad",
        data: {
            username: req.session.username,
            dogname: req.body.dogname,
            breed: req.body.breed,
            energyLevel: req.body.energyLevel,
            goodWithDogs: req.body.goodWithDogs,
            shedding: req.body.shedding,
            datefrom: req.body.datefrom,
            dateto: req.body.dateto,
            price: req.body.price,
            task: req.body.task,
            city: req.body.city,
            phone: req.body.phone,
            photourl: res.req.file.filename
        },
    })
        .then(() => {
            res.redirect("/personprofile");
        })
        .catch(() => {
            res.redirect("/error");
        });
};

const deleteDog = (req, res) => {
    console.log(req.params.id)
    axios({
        method: "delete",
        url: "api/deleteDog",
        data: {
            username: req.session.username,
            id: req.params.id
        },
    })
        .then((data) => {
            let url = "../public/images/" + data.data.url
            console.log(url);
            if(!url) {
                res.send("Error while deleting photo")
            } else {
                fs.unlink(url, function(err) {
                    if(err) {
                        console.log("GRESKA");
                        console.log(err);
                    }
                    res.redirect("/personprofile");
                });

            }
        })
        .catch(() => {
            res.redirect("/error");
        });
}

const editDog = (req, res) => {

    console.log(req.params.id)

    if (!req.body.dogname || !req.body.datefrom || !req.body.dateto
    || !req.body.price || !req.body.task || !req.body.city || !req.body.phone) {
        res.send("/error");
    }
    else {
        axios({
            method: "post",
            url: "api/editDog",
            data: {
                id: req.params.id,
                dog: {dogname: req.body.dogname, breed: req.body.breed},
                datefrom: req.body.datefrom,
                dateto: req.body.dateto,
                price: req.body.price,
                task: req.body.task,
                city: req.body.city,
                phone: req.body.phone
            },
        })
            .then(() => {
                res.redirect("/personprofile");
            })
            .catch(() => {
                res.redirect("/error");
            });
    }
};

module.exports = {
    addDog,
    deleteDog,
    editDog
};
