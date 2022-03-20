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

const axs = require("axios").create({
    baseURL: "https://dog.ceo/api",
    timeout: 15000,
});

let buttons = "";

const checkIfSigned = (req) => {
    console.log("Tuka");
    console.log(req.session.username);
    if(req.session.username) {
        buttons = "<a href=\"/signout\" ><button type=\"button\" class=\"btn btn-outline-light me-2\">" +
            "<i class=\"bi bi-box-arrow-right\"></i> Sign out</button></a>\n" +
            "<a href=\"/personprofile\"><button type=\"button\" class=\"btn btn-light\">" +
            "<i class=\"bi bi-person-circle\"></i> Your profile</button></a>";
    } else {
        buttons = "<button type=\"button\" class=\"btn btn-outline-light me-2\" " +
            "data-toggle=\"modal\" data-target=\"#signInPopup\">Sign in</button>\n" +
            "<a href=\"/register\"><button type=\"button\" class=\"btn btn-light\">Register</button></a>";
    }
}

/* GET home page */
// const homepage = (res, data) => {
//     res.render("homepage", { title: "Pettany",
//         profileButtons: buttons});
// };

const feed = (res, ads) => {
    const axs = require("axios").create({
        baseURL: "https://dog.ceo/api",
        timeout: 5000,
    });
    axs.get("/breeds/list/all", {
    })
        .then((data) => {
            console.log("U FEED SIGNED TREBA DA E");
            res.render("feed", { title: "Pettany",
                profileButtons: buttons,
                ads: ads.data,
                breeds: data.data.message});
        })
        .catch(() => {
            res.redirect("/error");
        });

};

const ads = (req, res) => {
    checkIfSigned(req);
    axios.get("/api/ads", {})
        .then((data) => {
            feed(res, data);
        })
        .catch(() => {
            res.redirect("/error");
        });
};

const ads2 = (req, res) => {
    checkIfSigned(req);
    axios.get("/api/ads", {})
        .then((data) => {
            res.render("homepage", { title: "Pettany",
                profileButtons: buttons,
                ads: [data.data[0], data.data[1], data.data[2]]});
        })
        .catch(() => {
            res.redirect("/error");
        });
};


const adsSearch = (req, res) => {
    checkIfSigned(req);
    axios.get("/api/search", {
        params: {
            search: req.query.search
        }
    })
        .then((data) => {
            //console.log(data.data);
            feed(res, data);
        })
        .catch(() => {
            res.redirect("/error");
        });
}

const filter = (req, res) => {
    checkIfSigned(req);
    axios.get("/api/filter", {
        params: {
            city: req.query.location,
            price: req.query.price,
            breed: req.query.breed,
            task: req.query.task
        }
    })
        .then((data) => {
            //console.log(data.data);
            feed(res, data);
        })
        .catch(() => {
            res.redirect("/error");
        });
}


const aboutUs = (req, res) => {
    checkIfSigned(req);
    res.render("aboutUs", { title: "Pettany",
        profileButtons: buttons});
};

const register = (req, res) => {
    res.render("register",
        {
            title: "Pettany | Register",
            profileButtons: "<button type=\"button\" class=\"btn btn-light\" data-toggle=\"modal\" data-target=\"#signInPopup\">Sign in</button>\n"
        });
};

const newAd = (res, data) => {

    res.render("newAd", { title: "Pettany",
        profileButtons: buttons,
        breeds: data});
};

const newAdBreeds = (req, res) => {
    checkIfSigned(req);
    axs.get("/breeds/list/all", {
    })
        .then((data) => {
            //console.log(data.data.message);
            newAd(res, data.data.message);
        })
        .catch(() => {
            res.redirect("/error");
        });
}

const faq = (req, res) => {
    checkIfSigned(req);
    res.render("faq", { title: "Pettany",
        profileButtons: buttons});
};

const ad = (req, res) => {
    checkIfSigned(req);
    axios.get("/api/ad", {
        params: {
            id: req.params.idAd,
        },
    })
        .then((data) => {
            dogprofile(res, data);
        })
        .catch(() => {
            res.redirect("/error");
        });
};

const dogprofile = (res, ad) => {
    res.render("dogprofile", { title: "Pettany",
        profileButtons: buttons,
        ad: ad.data});
};

const renderProfile = (res, user, ads) => {
    res.render("personprofile", { title: "Pettany",
        profileButtons: buttons,
        user: user,
        ads: ads});
};

const personprofile = (req, res) => {
    checkIfSigned(req);
    console.log("Person profile");
    console.log(req.session.username);
    axios.get("/api/user", {
        params: {
            username: req.session.username
        },
    })
        .then((data) => {
            getUserAds(res, data.data);
        })
        .catch(() => {
            res.redirect("/error");
        });
};

const getUserAds = (res, user) => {
    axios.get("/api/adsById", {
        params: {
            ads: user.ads
        },
    })
        .then((data) => {
            //console.log(data.data);
            renderProfile(res, user, data.data);
        })
        .catch(() => {
            res.redirect("/error");
        });
};

const payment = (req, res) => {
    checkIfSigned(req);
    res.render("payment", { title: "Pettany",
        profileButtons: buttons});
};

const success = (req, res) => {
    checkIfSigned(req);
    res.render("success",
        {
            title: "Pettany | Register",
            profileButtons: buttons,
            name: req.query.user
        });
};

const initial = (req, res) => {
    res.render("initial", { title: "Pettany",
        profileButtons: buttons
    });
};

const error = (req, res) => {
    res.render("error", { title: "Pettany",
        profileButtons: buttons
    });
}

const wallet = (req, res) => {
    checkIfSigned(req);
    if (!req.body.wallet) {
        res.send("/error");
    }
    else {
        console.log(req.params.id);
        console.log(req.body.wallet);
        axios({
            method: "post",
            url: "/api/wallet",
            data: {
                id: req.params.id,
                wallet: {wallet: req.body.wallet}
            },
        })
            .then(() => {
                res.redirect("/personprofile");
            })
            .catch(() => {
                console.log("Greska vo server!!!!!!!!!!!!!!!")
                res.redirect("/error");
            });
    }
};

module.exports = {
    // homepage,
    feed,
    aboutUs,
    register,
    newAd,
    faq,
    dogprofile,
    personprofile,
    payment,
    success,
    ads,
    ad,
    adsSearch,
    filter,
    initial,
    newAdBreeds,
    ads2,
    error,
    wallet
};