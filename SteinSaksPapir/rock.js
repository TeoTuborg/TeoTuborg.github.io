// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDiuCbRXDQGz0HXSA4YeV-5-Ovb8K65paQ",
    authDomain: "databaseit1-11368.firebaseapp.com",
    projectId: "databaseit1-11368",
    storageBucket: "databaseit1-11368.appspot.com",
    messagingSenderId: "25530617013",
    appId: "1:25530617013:web:e40f59eb707e4ec14b82fc"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


let db = firebase.firestore();



// Knytter alle elementene for innlogging i HTML opp mot javascript elementer
let logInBoxEl = document.querySelector('.log-in')
let signupBoxEl = document.querySelector('.signup')

let userIdEl = document.querySelector('#user-id')
let userNameEl = document.querySelector('#user-name')

let logInEl = document.querySelector('#log-in-input-id')
let logInUserEl = document.querySelector('#log-in-input-name')
let logOutEl = document.querySelector('#log-out')

let logInButtonEl = document.querySelector('#log-in-button')
let registerButtonEl = document.querySelector('#register-button')

let logInErrorEl = document.querySelector('#log-in-error')

let takeToSignupEl = document.querySelector('#signup-button')
let takeToLoginEl = document.querySelector('#log-in-change')

let signupUserEl = document.querySelector('#signup-input-name')

let footerEl = document.querySelector(".footer")

let opponentContainerEl = document.querySelector(".opponent-container")

let bodyEl = document.querySelector('body')

// Lager hendelses-lyttere
bodyEl.addEventListener('keydown', logInExt)

logInButtonEl.addEventListener('click', logInInternal)
registerButtonEl.addEventListener('click', registerUser)

logOutEl.addEventListener('click', logOut)

takeToSignupEl.addEventListener('click', takeToSignup)
takeToLoginEl.addEventListener('click', takeToLogin)


// Gir muligheten til å navigere mellom inlogging og registrering av bruker
function takeToSignup() {
    logInBoxEl.style.display = "none"
    signupBoxEl.style.display = "flex"
}
function takeToLogin() {
    logInBoxEl.style.display = "flex"
    signupBoxEl.style.display = "none"
}

initialize()

// Initialiserer nettsiden ved å vise det som skal vises og skjule det som skal skjules
function initialize() {
    footerEl.style.display = "none"
    logInErrorEl.style.display = "none"
    opponentContainerEl.style.display = "none"
}


// Logger ut ved å refreshe siden
function logOut() {
    location.reload()
}


// Registrerer ny bruker
function registerUser() {

    // Lager en 4-sifret ID til den nye brukeren
    let yourNewId = String(Math.floor(Math.random() * 9)) + String(Math.floor(Math.random() * 9)) + String(Math.floor(Math.random() * 9)) + String(Math.floor(Math.random() * 9))

    // Lager et nytt firebase dokument med de nye verdiene
    db.collection("einars-casino").add({
        name: signupUserEl.value,
        counter: 1000,
        id: yourNewId
    })

    // Fjerner og viser det som skal skjules og viser det som skal vises
    signupBoxEl.style.display = "none"
    blackoutEl.style.display = "none"
    footerEl.style.display = "flex"

    // Gir innloggingsverdiene de nye registreringsverdiene
    logInUserEl.value = signupUserEl.value
    logInEl.value = yourNewId

    // Tømmer registreringsfeltet
    signupUserEl.value = ""

    // Logger inn med den nye brukeren
    logInInternal()
}

function logIn() {
    // Finner frem og henter ut firebase filen og lagrer verdiene slik de så ut i det funksjonen ble startet
    db.collection("einars-casino").get().then(
        (snapshot) => {

            // Henter ut dokumentene
            let dokumenter = snapshot.docs;

            // Gir innloggingsvariablene verdiene som ble skrevet inn
            let logInId = logInEl.value
            let logInUser = logInUserEl.value

            // Søker gjennom hvert dokument
            for (let i = 0; i < dokumenter.length; i++) {

                // Lager en variabel for uthenting av data for hvert dokument
                let data = dokumenter[i].data()

                // Kryssjekker innloggingsverdiene mor verdiene som har blitt skrevet inn
                if (logInId === data.id && logInUser === data.name) {

                    // Endrer dokumentet slik at brukeren er logget inn
                    money = data.counter
                    userDocId = dokumenter[i].id
                    loggedIn = true
                    userNameEl.innerText = `Navn: ${logInUser}`
                    userIdEl.innerText = `Id: ${logInId}`
                    logInEl.value = ""
                    logInUserEl.value = ""
                    footerEl.style.display = "flex"
                    logInBoxEl.style.display = "none"
                    logInErrorEl.style.display = "none"
                    blackoutEl.style.display = "none"

                    // Oppdaterer pengene og motstanderene
                    updateMoney()
                    updateOpponents()
                }
            }
            return;
        });
    logInErrorEl.style.display = "block"
}

// Logger inn gjennom knappen
function logInInternal() {
    if (loggedIn === false) {
        logIn()
    }
}


// Logger inn gjennom "enter" på tastaturet
function logInExt(e) {
    if (e.which == 13 && loggedIn === false) {
        logIn()
    }
}


// Lager de nødvendig variablene for spill-funksjonener, og knytter disse HTML elementene mot javascript variabler
let money = 0
let oppMoney = 0

let opponentMoneyEl = document.querySelector("#opponent-account")
let yourOpponentEl = document.querySelector("#your-opponent")
let lockOpponentEl = document.querySelector("#lock-opponent")
let oppNameEl = document.querySelector("#einar-choice")
let oppNameFooterEl = document.querySelector("#opponent-name")


let theirChoiceEl = document.querySelector(".random")
let yourChoiceEl = document.querySelector("#yourChoice")

let moneyCountEl = document.querySelector("#moneyCount")
let gambleCountEl = document.querySelector("#gamble-count")

let potEl = document.querySelector("#pot")

let runEl = document.querySelector("#run")
let betEl = document.querySelector("#bet")

let einarEl = document.querySelector("#einar-choice")

let fistEl = document.querySelector("#fist")
let peaceEl = document.querySelector("#peace")
let palmEl = document.querySelector("#palm")

let fist2El = document.querySelector("#fist2")
let peace2El = document.querySelector("#peace2")
let palm2El = document.querySelector("#palm2")
let blackoutEl = document.querySelector(".blackout")

let opponentButtonEl = document.querySelector("#container-button")

let delEl = document.querySelector("#del-user")


// Lager flere hendelseslyttere
opponentButtonEl.addEventListener('click', showOpponentSelector)
runEl.addEventListener('click', runGame)
betEl.addEventListener('click', addToPot)
lockOpponentEl.addEventListener('click', saveOpponent)

// Nye relevante variabler
let theirChoice = 0
let yourChoice = 0

let gamble = 0

let pot = 0

let userDocId = ""
let oppDocId = ""
let loggedIn = false
let choseOpp = false

let showOpp = false

updateIcons()

// Endrer mellom å vise og å ikke vise motstander-velgeren
function showOpponentSelector() {
    if (!showOpp) {
        opponentContainerEl.style.display = "flex"
        showOpp = true
        opponentButtonEl.style.color = "black"
    } else {
        opponentContainerEl.style.display = "none"
        showOpp = false
        opponentButtonEl.style.color = "white"
    }
}

// Legger til alle brukerene fra firebase inn i input-et for valg av motstander
function updateOpponents() {
    db.collection("einars-casino").get().then((snapshot) => {
        let dokumenter = snapshot.docs
        for (let i = 0; i < dokumenter.length; i++) {
            let data = dokumenter[i].data()
            if (dokumenter[i].id != userDocId) {
                yourOpponentEl.innerHTML += `<option class="opp" value="${dokumenter[i].id}">${data.name}</option>`
            }
        }
    })
}


// Funksjon for valg av motstander
function saveOpponent(e) {

    // Lukker motstandervalget
    showOpponentSelector()
    if (yourOpponentEl.value != 0) {
        oppDocId = yourOpponentEl.value

        // Legger til nødvendig motstanderinformasjon i HTMLen
        db.collection("einars-casino").get().then((snapshot) => {
            let dokumenter = snapshot.docs

            for (let i = 0; i < dokumenter.length; i++) {
                if (dokumenter[i].id === oppDocId) {
                    let data = dokumenter[i].data()
                    oppMoney = data.counter
                    oppNameEl.innerText = `${data.name} velger:`
                    oppNameFooterEl.innerText = `Navn: ${data.name}`
                }
            }

            opponentMoneyEl.innerText = `${oppMoney}kr`
            choseOpp = true
            updateMoney()
        })
    }
}


// Matcher pengene i spillet med pengene i firebase
function updateMoney(e) {

    // Henter ut dokumentet brukeren allerede har logget inn med
    db.collection("einars-casino").doc(userDocId).get().then(doc => {
        let saldo = doc.data().counter;

        // Bytter verdien til counter (counter er lik money)
        saldo = money;

        // Oppdaterer elementet i firebase
        db.collection("einars-casino").doc(userDocId).update({
            counter: saldo
        });
    });
    if (choseOpp === true) {

        // Henter ut dokumentet til den valgte motstanderen
        db.collection("einars-casino").doc(oppDocId).get().then(doc => {
            let oppSaldo = doc.data().counter;

            // Bytter verdien til counter (counter er lik money)
            oppSaldo = oppMoney;

            // Oppdaterer elementet
            db.collection("einars-casino").doc(oppDocId).update({
                counter: oppSaldo
            });
        });
    }

    // Oppdaterer all HTML knyttet til penger
    played = false
    opponentMoneyEl.innerText = `${oppMoney}kr`
    moneyCountEl.innerText = `${money}kr`
    potEl.innerText = `Pot is: ${pot}kr`
}

// Skjuler alle spillikonene
function updateIcons() {
    einarEl.style.display = "block"
    fistEl.style.display = "none"
    peaceEl.style.display = "none"
    palmEl.style.display = "none"
    fist2El.style.display = "none"
    peace2El.style.display = "none"
    palm2El.style.display = "none"
}

// Legger til penger fra deg og motstanderen i potten
function addToPot() {
    if (loggedIn === true && gambleCountEl.value <= money && gambleCountEl.value <= oppMoney && gambleCountEl.value > 0 && choseOpp === true) {
        oppMoney -= gambleCountEl.value
        money -= gambleCountEl.value
        pot = gambleCountEl.value * 2
        gambleCountEl.value = 0
        potEl.innerText = `Pot is: ${pot}kr`
        updateMoney()
        updateIcons()
    }
}

// Kjører spillet
function runGame() {
    if (loggedIn === true) {
        updateIcons()

        // Motstanderens spillvalg
        theirChoice = Math.floor(Math.random() * 3)

        // Endrer spillikonene og brukeren sin spillverdi til den du har angitt gjennom input elementet
        if (yourChoiceEl.value === "stein") {
            yourChoice = 0
        }
        if (yourChoiceEl.value === "saks") {
            yourChoice = 1
        }
        if (yourChoiceEl.value === "papir") {
            yourChoice = 2
        }

        // Viser motstanderens spillikoner
        if (theirChoice == 0) {
            einarEl.style.display = "block"
            fistEl.style.display = "block"
        }
        if (theirChoice == 1) {
            einarEl.style.display = "block"
            peaceEl.style.display = "block"
        }
        if (theirChoice == 2) {
            einarEl.style.display = "block"
            palmEl.style.display = "block"
        }

        // Viser dine spillikoner
        if (yourChoice == 0) {
            fist2El.style.display = "block"
        }
        if (yourChoice == 1) {
            peace2El.style.display = "block"
        }
        if (yourChoice == 2) {
            palm2El.style.display = "block"
        }

        // Velger vinneren og velger hvilken funksjon som skal utføres på dette grunnlaget
        if (theirChoice == yourChoice) {
            gamble = 0
            updateMoney()
        } else if (theirChoice == 2 && yourChoice == 0) {
            lossFunction()
        } else if (theirChoice == 1 && yourChoice == 2) {
            lossFunction()
        } else if (theirChoice == 0 && yourChoice == 1) {
            lossFunction()
        } else if (yourChoice == 2 && theirChoice == 0) {
            winFunction()
        } else if (yourChoice == 1 && theirChoice == 2) {
            winFunction()
        } else if (yourChoice == 0 && theirChoice == 1) {
            winFunction()
        }
    }
}

let played = false


// Funksjonen hvis du taper (motstanderen får pengene dine)
function lossFunction(e) {
    oppMoney += pot
    gamble = 0
    pot = 0
    played = true
    updateMoney()
}

// Funksjonen hvis du vinner (Du får motstanderen sine penger)
function winFunction() {
    money += pot
    gamble = 0
    pot = 0
    played = true
    updateMoney()
}


// Sletter brukeren din hvis du er logget inn
delEl.addEventListener('click', poopFunc)

function poopFunc() {
    db.collection("einars-casino").doc(userDocId).delete();
    logOut()
}
