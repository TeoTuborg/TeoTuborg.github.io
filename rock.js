

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



let logInBoxEl = document.querySelector('.log-in')
let signupBoxEl = document.querySelector('.signup')

let userIdEl = document.querySelector('#user-id')
let userNameEl = document.querySelector('#user-name')

let logInEl = document.querySelector('#log-in-input-id')
let logInUserEl = document.querySelector('#log-in-input-name')
let logOutEl = document.querySelector('.log-out')

let logInButtonEl = document.querySelector('#log-in-button')
let registerButtonEl = document.querySelector('#register-button')

let logInErrorEl = document.querySelector('#log-in-error')

let takeToSignupEl = document.querySelector('#signup-button')
let takeToLoginEl = document.querySelector('#log-in-change')

let signupUserEl = document.querySelector('#signup-input-name')


let bodyEl = document.querySelector('body')
bodyEl.addEventListener('keydown', logIn)

logInButtonEl.addEventListener('click', logInInternal)
registerButtonEl.addEventListener('click', registerUser)

logOutEl.addEventListener('click', logOut)

takeToSignupEl.addEventListener('click', takeToSignup)
takeToLoginEl.addEventListener('click', takeToLogin)

function takeToSignup(){
    logInBoxEl.style.display = "none"
    signupBoxEl.style.display = "flex"
}
function takeToLogin(){
    logInBoxEl.style.display = "flex"
    signupBoxEl.style.display = "none"
}

initialize()

function initialize (){
    logInErrorEl.style.display = "none"
}

function logOut(){
    loggedIn = false
    logInBoxEl.style.display = "flex"
    userNameEl.innerText = ``
    userIdEl.innerText = ``
    money = 0
    moneyCountEl.innerText = ``
    logInErrorEl.style.display = "none"
    blackoutEl.style.display = "block"
    yourOpponentEl.innerHTML = `<option value="0"></option>`
}

function registerUser(){
    console.log("hei")
    let yourNewId = String(Math.floor(Math.random()*9))+String(Math.floor(Math.random()*9))+String(Math.floor(Math.random()*9))+String(Math.floor(Math.random()*9))
    db.collection("einars-casino").add({
        name: signupUserEl.value,
        counter: 1000,
        id: yourNewId
    })
    signupBoxEl.style.display = "none"
    blackoutEl.style.display = "none"
    logInUserEl.value = signupUserEl.value
    logInEl.value = yourNewId

    signupUserEl.value = ""
    logInInternal()
}

function logInInternal(){
    db.collection("einars-casino").get().then(
        (snapshot) => {
    
        // henter ut dokumentene
        let dokumenter = snapshot.docs;
    
        // skriver dokumentene til konsoll
        console.log(dokumenter);
    
        let logInId = logInEl.value
        let logInUser = logInUserEl.value
        for(let i = 0; i < dokumenter.length; i++){
            let data = dokumenter[i].data()
            if(logInId === data.id && logInUser === data.name){
                money = data.counter
                userDocId = dokumenter[i].id
                console.log(userDocId)
                loggedIn = true
                userNameEl.innerText = `Name: ${logInUser}`
                userIdEl.innerText = `Id: ${logInId}`
                logInEl.value = ""
                logInUserEl.value = ""
                logInBoxEl.style.display = "none"
                logInErrorEl.style.display = "none"
                blackoutEl.style.display = "none"
                updateMoney()
                updateOpponents()
            } 
        }
        return;
    });
    logInErrorEl.style.display = "block"
}

function logIn(e){
    if(e.which == 13 && loggedIn === false){
        db.collection("einars-casino").get().then(
            (snapshot) => {
        
            // henter ut dokumentene
            let dokumenter = snapshot.docs;
        
            // skriver dokumentene til konsoll
            console.log(dokumenter);
        
            let logInId = logInEl.value
            let logInUser = logInUserEl.value
            for(let i = 0; i < dokumenter.length; i++){
                let data = dokumenter[i].data()
                if(logInId === data.id && logInUser === data.name){
                    money = data.counter
                    userDocId = dokumenter[i].id
                    console.log(userDocId)
                    loggedIn = true
                    userNameEl.innerText = `Name: ${logInUser}`
                    userIdEl.innerText = `Id: ${logInId}`
                    logInEl.value = ""
                    logInUserEl.value = ""
                    logInBoxEl.style.display = "none"
                    blackoutEl.style.display = "none"
                    updateMoney()
                    updateOpponents()
                } 
            }
            return;
        });
        logInErrorEl.style.display = "block"
    }
}



let money = 0
let oppMoney = 0

let opponentMoneyEl = document.querySelector("#opponent-account")
let yourOpponentEl = document.querySelector("#your-opponent")
let lockOpponentEl = document.querySelector("#lock-opponent")

let theirChoiceEl = document.querySelector(".random")
let yourChoiceEl = document.querySelector("#yourChoice")

let moneyCountEl = document.querySelector("#moneyCount")
let gambleCountEl = document.querySelector("#gamble-count")

let potEl = document.querySelector("#pot")

let runEl = document.querySelector("#run")
let betEl = document.querySelector("#bet")

let resultsEl = document.querySelector("#win")

let einarEl = document.querySelector("#einar-choice")

let fistEl = document.querySelector("#fist")
let peaceEl = document.querySelector("#peace")
let palmEl = document.querySelector("#palm")

let fist2El = document.querySelector("#fist2")
let peace2El = document.querySelector("#peace2")
let palm2El = document.querySelector("#palm2")
let blackoutEl = document.querySelector(".blackout")



runEl.addEventListener('click', runGame)
betEl.addEventListener('click', addToPot)
lockOpponentEl.addEventListener('click', saveOpponent)

let theirChoice = 0
let yourChoice = 0

let gamble = 0

let pot = 0

let userDocId = ""
let oppDocId = ""
let loggedIn = false
let choseOpp = false

updateIcons()

function updateOpponents(){
    db.collection("einars-casino").get().then((snapshot)=> {
        let dokumenter = snapshot.docs

        console.log(dokumenter.length)
        for(let i = 0; i < dokumenter.length; i++){
            let data = dokumenter[i].data()
            console.log(data.id)
            if(dokumenter[i].id != userDocId){
                yourOpponentEl.innerHTML += `<option class="opp" value="${dokumenter[i].id}">${data.name}</option>`
            }
        }
    })
}

function saveOpponent(e){
    if(yourOpponentEl.value != 0){
        oppDocId = yourOpponentEl.value
        
        db.collection("einars-casino").get().then((snapshot)=> {
            let dokumenter = snapshot.docs

            for(let i = 0; i < dokumenter.length; i++){
                if(dokumenter[i].id === oppDocId){
                    let data = dokumenter[i].data()
                    oppMoney = data.counter
                }
            }

            opponentMoneyEl.innerText = `${oppMoney}kr`
            choseOpp = true
            updateMoney()
        })
    }
}

function updateMoney(e){
    db.collection("einars-casino").doc(userDocId).get().then(doc => {
        let saldo = doc.data().counter;
    
        // Bytter verdien til counter (counter er lik money)
        saldo = money;
        
        // Oppdaterer elementet
        db.collection("einars-casino").doc(userDocId).update({
          counter: saldo
        });
    });
    if(choseOpp === true){
        console.log("jada")
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
    
    opponentMoneyEl.innerText = `${oppMoney}kr`
    moneyCountEl.innerText = `${money}kr`
    potEl.innerText = `Pot is: ${pot}kr`
}

function updateIcons(){
    einarEl.style.display = "block"
    fistEl.style.display = "none"
    peaceEl.style.display = "none"
    palmEl.style.display = "none"
    fist2El.style.display = "none"
    peace2El.style.display = "none"
    palm2El.style.display = "none"
}

function addToPot(){
    if(loggedIn === true && gambleCountEl.value <= money && gambleCountEl.value <= oppMoney && gambleCountEl.value > 0){
        oppMoney -= gambleCountEl.value
        money -= gambleCountEl.value
        pot = gambleCountEl.value*2
        gambleCountEl.value = 0 
        potEl.innerText = `Pot is: ${pot}kr`
        updateMoney()
    }
}

function runGame(){
    if(loggedIn === true){
        updateIcons()
        theirChoice = Math.floor(Math.random()*3)
        console.log(theirChoice)
        if(yourChoiceEl.value === "stein"){
            yourChoice = 0
        }
        if(yourChoiceEl.value === "saks"){
            yourChoice = 1
        }
        if(yourChoiceEl.value === "papir"){
            yourChoice = 2
        }
        if(theirChoice == 0){
            einarEl.style.display = "block"
            fistEl.style.display = "block"
        }
        if(theirChoice == 1){
            einarEl.style.display = "block"
            peaceEl.style.display = "block"
        }
        if(theirChoice == 2){
            einarEl.style.display = "block"
            palmEl.style.display = "block"
        }
        if(yourChoice == 0){
            fist2El.style.display = "block"
        }
        if(yourChoice == 1){
            peace2El.style.display = "block"
        }
        if(yourChoice == 2){
            palm2El.style.display = "block"
        }
        console.log(yourChoice)
        if(theirChoice == yourChoice){
            resultsEl.innerText = `Draw`
            gamble = 0
            updateMoney()
        } else  if(theirChoice == 2 && yourChoice == 0){
            resultsEl.innerText = `you loose`
            lossFunction()
        } else  if(theirChoice == 1 && yourChoice == 2){
            resultsEl.innerText = `you loose`
            lossFunction()
        } else  if(theirChoice == 0 && yourChoice == 1){
            resultsEl.innerText = `you loose`
            lossFunction()
        } else  if(yourChoice == 2 && theirChoice == 0){
            resultsEl.innerText = `YOU WIN!`
            winFunction()
        } else  if(yourChoice == 1 && theirChoice == 2){
            resultsEl.innerText = `YOU WIN!`
            winFunction()
        } else  if(yourChoice == 0 && theirChoice == 1){
            resultsEl.innerText = `YOU WIN!`
            winFunction()
        } 
    }
}

function lossFunction(){
    oppMoney += pot
    gamble = 0
    pot = 0
    updateMoney()
}
function winFunction(){
    money += pot
    gamble = 0
    pot = 0
    updateMoney()
}


