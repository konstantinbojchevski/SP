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

const addUser = (req, res) => {
    axios({
        method: "post",
        url: "api/register",
        data: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            dateOfBirth: req.body.dateOfBirth,
            numberOfPets: req.body.numberOfPets,
            location: req.body.location,
            email: req.body.email
        },
    })
        .then(() => {
            res.redirect("/register/success?user=" + req.body.firstName + " " + req.body.lastName);
        })
        .catch(() => {
            res.redirect("/error");
        });
};

const login = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.redirect("/signin/error");
    } else {
        console.log(req.query.password);
        axios({
            method: "post",
            url: "api/signin",
            data: {
                username: req.body.username,
                password: req.body.password,
            },
        })
            .then(() => {
                req.session.username = req.body.username;
                console.log("Sesija");
                console.log(req.session.username);
                res.redirect('/feed')
            })
            .catch(() => {
                res.redirect("/error");
            });
    }
};

const logout = (req, res) => {
    req.session.username = "";
    res.redirect('/');
};

const clear = (req, res) => {
    axios({
        method: "delete",
        url: "api/user/clear",
        data: {},
    })

        .then(() => {
            res.send("Success");
        })
        .catch(() => {
            res.redirect("/error");
        });
};

const deleteUser = (req, res) => {
    if(!req.params.username)
        res.redirect("/error");
    axios.delete("/api/user/delete", {
        params: {
            username: req.params.username
        }
    })
        .then((data) => {
            logout(req, res);
        })
        .catch(() => {
            res.redirect("/error");
        });
}

module.exports = {
    addUser,
    login,
    logout,
    clear,
    deleteUser
};

