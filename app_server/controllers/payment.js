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

const addPayment = (req, res) => {
    if (!req.body.wallet) {
        res.redirect("/register/error");
    } else {
        axios({
            method: "post",
            url: "api/addPayment",
            data: {
                wallet: req.body.wallet,
            },
        })
    }
};

module.exports = {
    addPayment
};
