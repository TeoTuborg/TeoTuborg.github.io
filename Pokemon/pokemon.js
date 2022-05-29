// Lager en variabel for high-scoren
let highScoreVar = 0

// Lager en localstorage fil til lagring av high-score hvis den ikke allerede eksisterer, hvis den derimot eksisterer er high-scoren i dokumentet det samme som i localStorage filen
if (!localStorage.highScore) {
    localStorage.highScore = 0
} else {
    highScoreVar = Number(localStorage.highScore)
}

// Knytter nødvendige HTML elementer til javascripten 
let inputEl = document.querySelector('#words-form')

let resetEl = document.querySelector('#resetButton')

let countEl = document.querySelector('#counter')

let highScoreEl = document.querySelector('#high-score')

let correctEl = document.querySelector('#correct')

let finishEl = document.querySelector('#congratulations')

let bodyEl = document.querySelector('body')

let lettersEl = document.querySelector('#letters')


// Lager nødvendige variabler
let now = ''

let count = 0;

let many = 0


// Lager en ordliste som inneholder alle first-gen pokemonsa
const wordListOg = [
    'Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate', 'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu', 'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran', 'Nidorina', 'Nidoqueen', 'Nidorino', 'Nidoking', 'Clefairy', 'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff', 'Wigglytuff', 'Zubat', 'Golbat', 'Oddish', 'Gloom', 'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth', 'Diglett', 'Dugtrio', 'Meowth', 'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra', 'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Bellsprout', 'Weepinbell', 'Victreebel', 'Tentacool', 'Tentacruel', 'Geodude', 'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke', 'Slowbro', 'Magnemite', 'Magneton', 'Farfetch’d', 'Doduo', 'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk', 'Shellder', 'Cloyster', 'Gastly', 'Haunter', 'Gengar', 'Onix', 'Drowzee', 'Hypno', 'Krabby', 'Kingler', 'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone', 'Marowak', 'Hitmonlee', 'Hitmonchan', 'Lickitung', 'Koffing', 'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela', 'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking', 'Staryu', 'Starmie', 'Mr. Mime', 'Scyther', 'Jynx', 'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp', 'Gyarados', 'Lapras', 'Ditto', 'Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax', 'Articuno', 'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite', 'Mewtwo', 'Mew'
]

// Lager et array hvor ordene man skal gjette kommer til å ligge
let wordList = []

// Lager et array for ordene du allerede har skrevet
let written = []

// Lagger et array med forbokstavene til ordene du skal gjette
let letterArray = []


updateStorage()

// Legger til 10 ord fra ordlisten i arrayet med pokemonsa du må gjette
function updateStorage() {
    let m
    let shufflerWords
    for (let i = 0; i < 10; i++) {
        m = Math.floor(Math.random() * 150)
        if (!wordList.includes(wordListOg[m])) {
            wordList.push(wordListOg[m])
        } else {
            i--
        }
    }

    restartSite()
}

// Funksjon for oppstart av nettsiden
function restartSite() {

    // Endrer HTMLen slik at nettsiden er klar til bruk
    correctEl.innerText = "START"
    correctEl.style.color = "blue"
    count = written.length
    countEl.innerText = `Pokemons Gjettet: ${count}/${wordList.length}`
    highScoreEl.innerText = `High Score: ${highScoreVar}`

    giveHelp()
}

// En hjelpefunksjon som viser forbokstaven til alle pokemonsa du skal gjette
function giveHelp() {
    for (let i = 0; i < wordList.length; i++) {
        let pEl = document.createElement('p')
        pEl.id = `p-${i}`
        let letter = wordList[i].charAt(0)
        pEl.innerHTML = letter
        letterArray.push(letter)
        lettersEl.appendChild(pEl)
    }
}

// Funksjonen kalles når du trykker knappen enter og avgjør om ordet var riktig, galt eller allerede skrevet inn og hva man skal gjøre heretter
function submit(e) {
    if (e.which == 13) {
        now = String(inputEl.value.toLowerCase())
        inputEl.value = ''
        for (let i = 0; i < wordList.length; i++) {
            if (now == wordList[i].toLowerCase()) {
                if (written.length !== 0) {
                    for (let j = 0; j < written.length; j++) {
                        if (wordList[i].toLowerCase() == written[j]) {
                            console.log(i, j)
                            used()
                            return;
                        }
                    }
                    correct(wordList[i].toLowerCase())
                    return;
                } else {
                    correct(wordList[i].toLowerCase())
                    return;
                }
            }
        }
        wrong()
        return;
    }
}

let right = true

// Funksjonen som kjøres hvis du gjetter riktig
function correct(n) {

    // Legger til ordet du har skrevet i arrayet for allerede skrevede ord
    written.push(n)

    // Endrer HTMLen for å indikere at ordet var riktig
    correctEl.innerText = "RIKTIG!"
    correctEl.style.color = "green"

    // Oppdaterer scoren din
    count = written.length
    countEl.innerText = `Pokemons Gjettet: ${count}/${wordList.length}`

    // Hvis scoren er høyere enn din tidligere high-score øker high-scoren din
    if (count > Number(localStorage.highScore)) {
        highScoreVar = count
        localStorage.highScore = highScoreVar
    }

    highScoreEl.innerText = `High Score: ${highScoreVar}`

    // Fjerner forbokstavene på pokemonsa du allerede har gjettet
    for (let i = 0; i < letterArray.length + 1; i++) {

        // Lager et javascript element til hver bokstav etter tur slik at man kan endre på bokstavenes egenskaper en etter en
        let pEl = document.getElementById(`p-${i}`)

        // Hvis du allerede har fjernet en bokstav vil alle de etterkommende bokstavene få en id med ett lavere tall slik at koden kan kjøre fritt på nytt hver gang du gjetter en ny pokemon
        if (right === false) {
            pEl.id = `p-${i - many}`
        }

        // Hvis kodden ikke har fjernet en bokstav enda og forbokstaven til ordet du skrev inn matcher bokstaven i HTML-hjelpeelementet vil denne koden utføres
        if (n.charAt(0).toUpperCase() === pEl.innerText && right === true) {

            // Bokstaven blir skjult
            pEl.id = "hide"

            // Bokstaven blir fjernet fra forbokstavaarayet
            letterArray.splice(i, 1)

            // Variablen som sjekker om et ord allerede er skrevet endres
            right = false

            // Denne variablen bidrar til å endre id-en til de etterkommende bokstav-elementene i HTMLen slik at koden kan kjøre pent videre, her endres den til 1 slik at de etterkommende bokstavene får 1 id lavere enn tidligere
            many = 1
        }
    }

    right = true

    // Hvis alle ordene er gjettet vinner du
    if (count == wordList.length) {
        congratulations()
        return;
    }
}

// Feil gjettet
function wrong() {
    correctEl.innerText = "FEIL!"
    correctEl.style.color = "red"
}

// Allerede gjettet ord
function used() {
    correctEl.innerText = "USED"
    correctEl.style.color = "yellow"
}

// Funksjon for seier
function congratulations() {
    finishEl.classList.remove('show')
    inputEl.classList.add('show')
    bodyEl.removeEventListener('keydown', submit)
}


// Reseter nettsiden hvis du er stuck gjennom å reloade pagen
function resetFunc() {
    location.reload()
}


resetEl.addEventListener('click', resetFunc)

bodyEl.addEventListener('keydown', submit)

/* Knytter knappen til javascript gjennom id og legger til klassen show hvis den ikke er lagt til og fjerner den hvis den er det */
function dropdownMeny() {
    document.getElementById("minMeny").classList.toggle("shower");
}

/* Når webvinduet klikkes starter funksjonen, som fortsetter om knappen som blir trykket ikke er meny-knappen. Denne funksjonen fjerner altså menyen om du trykker et annet sted */
window.onclick = function (event) {
    if (!event.target.matches('.menyKnapp')) {
        let dropdowns = document.getElementsByClassName("menyInnhold");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('shower')) {
                openDropdown.classList.remove('shower');
            }
        }
    }
}

