const mongoose = require("mongoose");
const PaymentModel = mongoose.model("Payment");

const addPayment = (req, res) => {
    if(!req.body.wallet){
        res.redirect("/error");
    }
    else {
        const newPayment = new PaymentModel({
            wallet: req.body.wallet
        })

        newPayment.save(function(error) {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(201).json("Success");
            }
        })
    }
};

module.exports = {
    addPayment
};