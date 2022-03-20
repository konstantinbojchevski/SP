# Spletno programiranje 2021/2022

Lastni projekt pri predmetu **Spletno programiranje** v študijskem letu **2021/2022**.

## 1. LP

ENG: Petanny is a page for all pet owners, pet lovers and people who enjoy taking care of animals. The main idea is that when pet owners go on a holiday, have some errands or simply have no time on their hands, they can post an advertisement of their dog and another person can apply to be their pet's nanny for a certain period of time. On Petanny, the payment is done through blockchain technology, a smart solution for decentralized finance. It provides an amazing solution to all those in need of a helping hand regarding their pets' wellbeing.

SLO: Pettany je stran za vse lastnike hišnih ljubljenčkov, ljubitelje hišnih ljubljenčkov in ljudi, ki uživajo v skrbi za živali. Glavna ideja je, da ko lastniki hišnih ljubljenčkov odidejo na počitnice, imajo opravke ali preprosto nimajo časa, lahko objavijo oglas svojega ljubljenčka, druga oseba pa se lahko prijavi za varuško njihovega ljubljenčka za določen čas. Na Pettanyju se plačilo izvaja prek tehnologije blockchain, pametna rešitev za decentralizirane finance. Ponuja odlično rešitev vsem tistim, ki potrebujejo pomoč pri blaginji svojih hišnih ljubljenčkov.

1.[aboutus](docs/aboutus.html) opisuje naša stran in pove glavni cilj.<br />
2.[dogprofile](docs/dogprofile.html) prikazuje, kako bo zgledal oglas, zagotavlja informacije o hišnem ljubljenčku in, če se zahteva, več informacij o njegovi pasmi <br />
3.[faq](docs/faq.html) Frequently asked questions, vprašanja, ki nam jih običajno postavljajo <br />
4.[feed](docs/feed.html) prikazuje vse oglase in lahko poiščete hišnega ljubljenčka, za katerega bi poskrbeli.Z more info lahko odprete stran oglasa <br />
5.[homepage](docs/homepage.html), stran, ki se odpre prva in predstavlja naš projekt. Prikazuje priporočene oglase in povprečne cene <br />
6.[new](docs/new.html) vam pomaga ustvariti nov oglas<br />
7.[payment](docs/payment.html) zahteva podatke o plačilu, ko želite dodati oglas<br />
8.[personprofile](docs/personprofile.html) prikazuje vaš profil, vse vaše oglase in informacije. Lahko uredite oglase in lahko jih zbrišete<br />
9.[register](docs/register.html) vam omogoča, da ustvarite nov račun.

Na naši spletni strani se lahko prijavite kot uporabnik, ki ima hišnega ljubljenčka ali kot uporabnik, ki želi biti sitter. Če se prijavite kot lastnik hišnih ljubljenčkov, lahko ustvarite objave, da nekomu plačate, da bo sitter za vaše hišne ljubljenčke. Plačate lahko z ethereumom. Če želite biti sitter hišnih ljubljenčkov, lahko poiščete objavo in se prijavite, da skrbite za tega hišnega ljubljenčka in za to prejmete plačilo. <br />
Za zunanji vir bomo uporabljali API, ki prepozna pasmo psa, ki ga imate.

Edina razlika med brskalnikih je tisto da pole za izbira datuma na Safari ne zgleda enako kot na ostalih brskalnikih.
Na majnših napravah, elemente na zaslonski maski se ustrezno prilagajajo.
## 2. LP

Na našo spletno stran se lahko prijavite oz. registrirate prek [register](app_server/views/register.hbs). Tam lahko izpolnite uporabniška vnosna polja na naslednji način:
1. za vnos Ime in Priimek lahko uporabite samo črke (^[a-zA-Z\sčšžČŠŽ]+$)
2. lokacija ne sme biti prazna
3. za vnos username lahko uporabite črke, številke in _ , vendar se mora uporabniško ime začeti s črko (^[a-zA-Z][a-zA-Z0-9_]+$)
4. email mora vsebovati @ in . na ustrezno mesto (^[^\s@]+@[^\s@]+\.[^\s@]+$)
5. dolžina gesla mora biti najmanj 8 črk in gesla med seboj se morajo ujemati

Za sign in velja podobno.
Za dodajanje oglasa se uporablja [newAd](app_server/views/newAd.hbs). Tam lahko izpolnite uporabniška vnosna polja na naslednji način:
1. ime psa lahko vsebuje samo črke in se mora začeti z veliko začetnico ([A-Z][a-z]*)
2. mesto lahko vsebuje samo črke in se mora začeti z veliko začetnico ([A-Z][a-z]*)
3. phone number mora biti v formtu XXX-XXX-XXX, kjer je X številka ([0-9]{3}-[0-9]{3}-[0-9]{3})

Pri urejanju oglasa velja naslednje:
1. ime psa lahko vsebuje samo črke
2. phone number mora biti v formtu XXX-XXX-XXX, kjer je X številka ([0-9]{3}-[0-9]{3}-[0-9]{3})

Za dodajanje denarnice velja da vnos uporabnika mora vsebovati 40 številke ali črke od a do f (^[a-fA-F0-9]{40}$).
Za iskanje v [feed](app_server/views/feed.hbs) morate vstaviti vsaj eno črko (.*[a-zA-Z].*)

Naša aplikacija deluje na računalnikih, tablicah in telefonih.
Aplikacija se odpre na spletno stran https://pettany.heroku.com .

Dodatne knjižnice v [package.json](package.json) ki jih uporabljamo so bcryptjs za shranjevanje gesla in multer za shranjevanje slike.

Aplikacija se zažene lokalno prek ukaza docker-compose up in do nje lahko dostopamo na http://localhost:3000/ .

## 3. LP

SPA aplikacija na eni strani.
Aplikacija se zažene lokalno prek ukaza docker-compose up in do nje lahko dostopamo na http://localhost:3000/ .
Aplikacija se odpre na spletno stran https://pettany.heroku.com .

## 4. LP

Varnostno zaščitena progresivna in porazdeljena aplikacija.

Aplikacija se zažene lokalno prek ukaza docker-compose up in do nje lahko dostopamo na http://localhost:3000/ .
Aplikacija se odpre na spletno stran https://pettany.heroku.com .

V našo aplikacijo, obstajajo 3 vrste uporabnikov. To so gost, uporabnik in admin.
Gost lahko bere oglase, vendar se ne more prijaviti in ne more obljavljati in brisati oglase.
Uporabnik se lahko prijavi, lahko objavi oglase in bere ostale oglase, pa tudi lahko briše svoje oglase.
Admin se lahko prijavi, bere in briše vse oglase.

V našo aplikacijo smo Blockchain (Dapp) uporabili za rating system za pse. Admin lahko začne pametno pogodbo in je dolžen za registracijo uporabnikov.
Registriran uporabnik lahko da oceno od 1 do 5, kar se izvaja s transakcijo Etherium. Gost lahko zgolj gleda trenutne ocene in povprečno oceno.

Aplikacija je uspešno pretvorjena v PWA. Rezultate pri preverjanju prek Lighthouse za vse vidike so v območju 80-100.
Pri revizijo na Lighthouse, smo dobili opozorilo da naše slike nimajo eksplicitna višina in širina. To opozorilo nismo upoštevali ker da bi naša strana delovala odzivo uporabljamo relativne matrike.
V načinu brez povezave, je na voljo indikator stanja in so onemogočene nekateri funkcionalnosti oz. registracija, prijava in dodajanje in brisanje oglasi.

Z orodjem OWASP ZAP smo preverili osnovno varnost naše aplikacije. Dobili smo par opozil in nekaterih smo jih opravili.
Glede opozorilo Cross-Domain Misconfiguration, smo se prepričali da za vsak api klic ki lahko vsebuje občutljivi podatki je potrebna avtentikacija.
Glede opozorilo Cookie without SameSite Attribute, smo vidli da je to težava samo pri styles.css in zato nismo nič spreminili.
Glede opozorilo Cross-Domain JavaScript Source File Inclusion, smo preverili da vse skrpte ki jih uporabljamo so varni.
Glede opozorilo Incomplete or No Cache-control Header Set, Server Leaks Information via "X-Powered-By" HTTP Response Header Field(s) in X-Content-Type-Options Header Missing, smo vidli da je to težava na url-ji ki niso našo aplikacjio.
Glede opozorilo Timestamp Disclosure - Unix, smo se prepričali da timestamp podatke niso občutljive.




