let pogodba;
const gasLimit = 200000;
const provider = {
    server: "http://sensei.lavbic.net",
    port: 8545,
};

function loadJSON(pot) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    if (error) reject(xhr);
                }
            }
        };
        xhr.open("GET", pot, true);
        xhr.send();
    });
}

window.onload = async () => {
    let RatingSystem = await TruffleContract(await loadJSON("/ABI/RatingSystem.json"));
    RatingSystem.setProvider(
        // new Web3.providers.WebsocketProvider(
        //     "ws://" + provider.server + ":" + provider.port
        // )
        window.ethereum
    );
    pogodba = await RatingSystem.deployed();
    getRatings();

};

const registerUser = async () => {
    let admin = await getUser();

    let userAddr = document.getElementById("ethAddressReg").value;
    let isAdmin = await pogodba.isAdmin(admin);

    if(admin && userAddr && isAdmin) {
        await pogodba.registerUser(userAddr, {
            from: admin,
            gas: gasLimit
        })
    }
    else {
        notAllowed();
    }
    document.getElementById("ethAddressReg").value = "";
}

const addRating = async () => {
    let usrAddr = await getUser();
    let dogname = document.getElementById("dogName").value;
    let ocena = document.getElementById("rate").value;
    let isRegistered = await pogodba.isRegistered(usrAddr);

    if(dogname && ocena && isRegistered) {
        await pogodba.add(dogname, ocena, {
            from: usrAddr,
            gas: gasLimit
        })
        getRatings();
    } else {
        notAllowed();
    }
}

const notAllowed = () => {
    alert("Action not allowed");
}

const getUser = async () => {
    if (typeof window.ethereum !== "undefined") {
        // Poveži se na MetaMask
        const racuni = await ethereum.request({ method: "eth_requestAccounts" });
        return racuni[0];
    } else return null;
};

const getRatings = async() => {
    let rateCount = await pogodba.getRatingCount();

    let ratings = "";

    if(rateCount) {
        document.getElementById("ratingList").innerHTML = "";
        ratings = "<table> <tr><th>Dog name</th> <th>Rating</th></tr>";
        for(let i = 0; i < rateCount; i++) {
            let rateObj = await pogodba.getRating(i);
            let item = "<tr>";
            item += "<td>" + rateObj.dogName + "</td><td>";
            item += rateObj.rating + "</td>"
            item += "</tr>"
            ratings += item;
        }
        ratings += "</table>"
    }
    document.getElementById("ratingList").innerHTML = ratings;
    let avg = await pogodba.getAverageRating();
    document.getElementById("avg").innerHTML = "Average rating of all dogs " + avg;
}