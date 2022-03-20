let Rating = artifacts.require("RatingSystem");

module.exports = (postavitev) => {
    postavitev.deploy(Rating)
}