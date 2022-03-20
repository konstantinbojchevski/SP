const RatingSystem = artifacts.require("./RatingSystem.sol");

contract("RatingSystem", () => {
    contract(
        "Add rating",
        (racuni) => {
            it("Not registered users cannot add ratings.", async () => {
                // Arrange
                let rat = await RatingSystem.deployed();
                try {
                    let data = await rat.add("Dog Name", 3, {from:racuni[1]});
                    assert.isTrue(false);
                } catch (error) {
                    assert.equal(error.reason, "Function must be called by registered user")
                }
            });

            it("Registered users can add ratings.", async () => {
                let rat = await RatingSystem.deployed();
                let res = await rat.registerUser(racuni[1])
                let data = await rat.add("Dog Name", 3, {from:racuni[1]});
                assert.isTrue(!data.status);
            })
        });

    contract(
        "Register user",
        (racuni) => {
            it("Admin can register users", async () => {
                // Arrange
                let rat = await RatingSystem.deployed();
                let res = await rat.registerUser(racuni[1])
                assert.isTrue(!res.status)
            });

            it("Non-admin cannot register users", async () => {
                // Arrange
                let rat = await RatingSystem.deployed();
                try {
                    let res = await rat.registerUser(racuni[2], {from: racuni[1]})
                    assert.isTrue(false);
                } catch (error) {
                    assert.equal(error.reason, "Function must be called by admin")
                }
            });

        });
});