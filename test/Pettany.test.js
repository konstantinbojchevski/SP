(async function Pettany() {
    const { execSync } = require("child_process");
    const { describe, it, after, before } = require("mocha");
    const { Builder, By, Key } = require("selenium-webdriver");
    const chrome = require("selenium-webdriver/chrome");
    const expect = require("chai").expect;
    const remote = require("selenium-webdriver/remote");

    let aplikacijaUrl = "https://pettany.herokuapp.com/";
    let seleniumStreznikUrl = "http://localhost:4445/wd/hub";
    let brskalnik, jwtZeton;

    const axios = require("axios").create({
        baseURL: aplikacijaUrl + "api/",
        timeout: 5000,
    });

    process.on("unhandledRejection", (napaka) => {
        console.log(napaka);
    });

    let pocakajStranNalozena = async (brskalnik, casVS, xpath) => {
        await brskalnik.wait(
            () => {
                return brskalnik.findElements(By.xpath(xpath)).then((elementi) => {
                    return elementi[0];
                });
            },
            casVS * 1000,
            `Stran se ni naložila v ${casVS} s.`
        );
    };

    try {
        before(() => {
            brskalnik = new Builder()
                .forBrowser("chrome")
                .setChromeOptions(
                    new chrome.Options()
                        .addArguments("start-maximized")
                        .addArguments("disable-infobars")
                        .addArguments("allow-insecure-localhost")
                        .addArguments("allow-running-insecure-content")
                        .addArguments("--disable-extensions")
                )
                .usingServer(seleniumStreznikUrl)
                .build();
        });

        describe("Information about app", function () {
            this.timeout(30 * 1000);
            before(() => {
                brskalnik.get(aplikacijaUrl);
            });

            it("izberi informacije o aplikaciji", async function () {
                await pocakajStranNalozena(brskalnik, 10, "//p");
                let povezava = await brskalnik.findElement(
                    By.xpath("//a[contains(text(), 'About')]")
                );
                expect(povezava).to.not.be.empty;
                await povezava.click();
            });

            context("ustreznost podatkov na strani z informacijami", function () {
                it("naslov strani", async function () {
                    await pocakajStranNalozena(brskalnik, 10, "//h1");
                    let naslov = await brskalnik.findElement(By.css("h1"));
                    expect(naslov).to.not.be.empty;
                    await naslov.getText().then(function (vsebina) {
                        expect(vsebina).to.be.equal("About us");
                    });
                });

                it("besedilo informacij o aplikaciji", async function () {
                    let besedilo = await brskalnik.findElement(
                        By.xpath("//p[contains(text(), 'arcu vitae fringilla')]")
                    );
                    expect(besedilo).to.not.be.empty;
                    expect(await besedilo.getText()).to.have.string(
                        "Duis vestibulum odio nec erat sodales, eu " +
                        "ultrices arcu fermentum. Praesent eget sodales libero, " +
                        "sit amet tincidunt ante."
                    );
                });

                it("kontakt", async function() {
                    let besedilo = await brskalnik.findElement(
                        By.xpath("//h4[contains(text(), 'Contact us')]")
                    );
                    expect(besedilo).to.not.be.empty;
                    expect(await besedilo.getText()).to.have.string(
                        "petanny@gmail.com"
                    );
                })
            });
        });

        describe("Sign in", function () {
            this.timeout(0);

            context("Open modal", function() {
                it("There is sing in button", async function() {
                    await pocakajStranNalozena(brskalnik, 10, "//p");
                    let button = await brskalnik.findElement(By.xpath("//button[contains(text(), 'Sign in')]"))
                    expect(button).to.not.be.empty;
                    await button.click();
                });

                it("Sign in modal opens", async function() {
                    await pocakajStranNalozena(brskalnik, 10, "//h5");
                    let welcome = await brskalnik.findElement(By.xpath("//h5[contains(text(), 'Welcome')]"))
                    expect(welcome).to.not.be.empty;
                    expect(await welcome.getText()).to.have.string(
                        "Welcome back!"
                    );
                });
            })

            context("Sign in proccess", function() {
                it("Enter sign in info", async function() {
                    let ime = await brskalnik.findElement(By.css("input[name='username']"));
                    expect(ime).to.not.be.empty;
                    ime.sendKeys("petar_petrov");

                    let pass = await brskalnik.findElement(By.css("input[name='password']"));
                    expect(pass).to.not.be.empty;
                    pass.sendKeys("12345678");

                    await brskalnik.executeScript(
                        "document.querySelector(\"button[type='submit']\").click()"
                    );
                })

                it("Check if signed", async  function() {
                    await brskalnik.manage().setTimeouts({implicit: 15000, pageLoad: 7500})
                    await pocakajStranNalozena(brskalnik, 10, "//h1[contains(text(), 'Your')]");
                    let buttonProfile = await brskalnik.findElement(By.xpath("//button[contains(text(), 'Your profile')]"))
                    expect(buttonProfile).to.not.be.empty;
                })
            });
            })

        describe("Add ad", function() {
            this.timeout(0);
            context("Open newAd page", function () {
                it("Check if newad button", async function() {
                    let button = await brskalnik.findElement(By.xpath("//button[contains(text(), 'HERE')]"))
                    expect(button).to.not.be.empty;
                    await button.click()
                })

                it("Check if on newAd page", async function() {
                    await pocakajStranNalozena(brskalnik, 10, "//h3");
                    let header = await brskalnik.findElement(By.xpath("//h3[contains(text(), 'publish')]"))
                    expect(header).to.not.be.empty;
                    expect(await header.getText()).to.have.string(
                        "Fill the form and publish your new ad:"
                    );
                });
            });

            context("Add new ad", function() {
                it("Fill form", async function() {
                    let name = await brskalnik.findElement(By.css("input[name='dogname']"));
                    expect(name).to.not.be.empty;
                    await name.sendKeys("Lana");

                    let datefr = await brskalnik.findElement(By.css("input[name='datefrom']"));
                    expect(name).to.not.be.empty;
                    await datefr.sendKeys("01/20/2022");

                    let dateto = await brskalnik.findElement(By.css("input[name='dateto']"));
                    expect(name).to.not.be.empty;
                    await dateto.sendKeys("01/27/2022");

                    let price = await brskalnik.findElement(By.css("input[name='price']"));
                    expect(price).to.not.be.empty;
                    await price.sendKeys(Key.RIGHT);

                    let taskButt = await brskalnik.findElement(By.css("select[name='task']"));
                    expect(taskButt).to.not.be.empty;
                    await taskButt.click();

                    let task = await brskalnik.findElement(By.xpath("//option[contains(text(), 'Walking')]"));
                    expect(task).to.not.be.empty;
                    await task.click();
                    //
                    let en = await brskalnik.findElement(By.css("input[name='energyLevel']"));
                    expect(en).to.not.be.empty;
                    await en.sendKeys(Key.RIGHT);
                    //
                    let gd = await brskalnik.findElement(By.css("input[name='goodWithDogs']"));
                    expect(gd).to.not.be.empty;
                    await gd.sendKeys(Key.RIGHT);

                    let sh = await brskalnik.findElement(By.css("input[name='shedding']"));
                    expect(sh).to.not.be.empty;
                    await sh.sendKeys(Key.RIGHT);

                    let breedButt = await brskalnik.findElement(By.css("select[name='breed']"));
                    expect(breedButt).to.not.be.empty;
                    await breedButt.click();

                    let breed = await brskalnik.findElement(By.xpath("//option[contains(text(), 'Australian')]"));
                    expect(breed).to.not.be.empty;
                    await breed.click();

                    let city = await brskalnik.findElement(By.css("input[name='city']"));
                    expect(city).to.not.be.empty;
                    await city.sendKeys("Ljubljana");

                    let ph = await brskalnik.findElement(By.css("input[name='phone']"));
                    expect(ph).to.not.be.empty;
                    await ph.sendKeys("123-456-789");
                })

                it("Upload file", async function() {
                    brskalnik.setFileDetector(new remote.FileDetector());
                    let upl = await brskalnik.findElement(By.css("input[name='dog_pic']"))
                    await upl.sendKeys("/tmp/ara.jpg")
                })

                it("Submit form", async function() {
                    await brskalnik.executeScript(
                        "document.querySelector(\"button[type='submit']\").click()"
                    );
                })

                it("Check if uploaded", async function() {
                    await pocakajStranNalozena(brskalnik, 30, "//h1[contains(text(), 'Petar')]");
                    await brskalnik.manage().setTimeouts({implicit: 15000, pageLoad: 7500})
                    let ad = await brskalnik.findElement(By.css("div[id='post1']"))
                    console.log(ad.getText());
                    expect(ad).to.not.be.empty;
                })
            });
        });
        //
        describe("Edit ad", function() {
            this.timeout(0);
            it("Click button", async function() {
                let button = await brskalnik.findElement(By.xpath("//button[contains(text(), 'Edit')]"))
                expect(button).to.not.be.empty;
                await button.click();
            })

            it("Check if modal open and fill", async function() {
                await pocakajStranNalozena(brskalnik, 10, "//h2");
                let head = await brskalnik.findElement(By.xpath("//h2[contains(text(), 'Edit')]"))
                expect(head).to.not.be.empty;

                let name = await brskalnik.findElement(By.css("input[name='dogname']"));
                expect(name).to.not.be.empty;
                await name.clear()
                await name.sendKeys("Ara");

                let datefr = await brskalnik.findElement(By.css("input[name='datefrom']"));
                expect(name).to.not.be.empty;
                await datefr.sendKeys("01/20/2022");

                let dateto = await brskalnik.findElement(By.css("input[name='dateto']"));
                expect(name).to.not.be.empty;
                await dateto.sendKeys("01/27/2022");

                let price = await brskalnik.findElement(By.css("input[name='price']"));
                expect(price).to.not.be.empty;
                await price.sendKeys(Key.RIGHT);

                let taskButt = await brskalnik.findElement(By.css("select[name='task']"));
                expect(taskButt).to.not.be.empty;
                await taskButt.click();

                let task = await brskalnik.findElement(By.xpath("//option[contains(text(), 'Walking')]"));
                expect(task).to.not.be.empty;
                await task.click();

                let city = await brskalnik.findElement(By.css("input[name='city']"));
                expect(city).to.not.be.empty;
                await city.clear()
                await city.sendKeys("Ljubljana");

                let ph = await brskalnik.findElement(By.css("input[name='phone']"));
                expect(ph).to.not.be.empty;
                await ph.clear()
                await ph.sendKeys("123-456-789");

            });
            it("Submit form", async function() {
                await brskalnik.executeScript(
                    "document.querySelectorAll(\"button[type='submit']\")[1].click()"
                );
                // let button = await brskalnik.findElement(By.xpath("//button[contains(text(), 'Save')]"))
                // expect(button).to.not.be.empty;
                // await button.click();
                await brskalnik.navigate().refresh();
            });
        });

        describe("Search", function () {
            this.timeout(30 * 1000);
            before(() => {
                brskalnik.get(aplikacijaUrl+"feed");
            });

            it("Select search and enter", async function () {
                await pocakajStranNalozena(brskalnik, 10, "//p");
                let search = await brskalnik.findElement(
                    By.css("input[name='search']")
                );
                expect(search).to.not.be.empty;
                search.sendKeys("Ara");
            });

            it("Click search", async function () {
                await brskalnik.executeScript(
                    "document.querySelector(\"button[type='submit']\").click()"
                );
            });

            it("Check ad", async function() {
                await brskalnik.manage().setTimeouts({implicit: 15000, pageLoad: 7500})
                let ad = await brskalnik.findElement(By.css("div[class='post']"))
                expect(ad).to.not.be.empty;
            })
        });

    } catch(e) {
        console.log("Error in testing");
    }
})();