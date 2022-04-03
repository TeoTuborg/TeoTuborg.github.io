let inputEl = document.querySelector('#words-form')

let resetEl = document.querySelector('#resetButton')

let countEl = document.querySelector('#counter')

let correctEl = document.querySelector('#correct')

let finishEl = document.querySelector('#congratulations')

let bodyEl = document.querySelector('body')

let lettersEl = document.querySelector('#letters')

let now = ''

let count = 0;

const wordListOg = [
    'Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate', 'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu', 'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran', 'Nidorina', 'Nidoqueen', 'Nidorino', 'Nidoking', 'Clefairy', 'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff', 'Wigglytuff', 'Zubat', 'Golbat', 'Oddish', 'Gloom', 'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth', 'Diglett', 'Dugtrio', 'Meowth', 'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra', 'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Bellsprout', 'Weepinbell', 'Victreebel', 'Tentacool', 'Tentacruel', 'Geodude', 'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke', 'Slowbro', 'Magnemite', 'Magneton', 'Farfetch’d', 'Doduo', 'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk', 'Shellder', 'Cloyster', 'Gastly', 'Haunter', 'Gengar', 'Onix', 'Drowzee', 'Hypno', 'Krabby', 'Kingler', 'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone', 'Marowak', 'Hitmonlee', 'Hitmonchan', 'Lickitung', 'Koffing', 'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela', 'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking', 'Staryu', 'Starmie', 'Mr. Mime', 'Scyther', 'Jynx', 'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp', 'Gyarados', 'Lapras', 'Ditto', 'Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax', 'Articuno', 'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite', 'Mewtwo', 'Mew'
]

let wordList = []

let written = []


updateStorage()

function updateStorage(){
    let m
    let shufflerWords
    for(let i = 0; i < 20; i++){
        m = Math.floor(Math.random()*150)
        if(!wordList.includes(wordListOg[m])){
            wordList.push(wordListOg[m])
        } else {
            i --
        }
    }
         
    restartSite()
}

function restartSite(){
    console.log(wordList)

    correctEl.innerText = "START"
    correctEl.style.color = "blue"
    count = written.length
    countEl.innerText = `Words Written: ${count}/${wordList.length}` 

    giveHelp()
}

function giveHelp(){
    for(let i = 0; i < wordList.length; i++){
        let pEl = document.createElement('p')
        pEl.innerHTML = wordList[i].charAt(0)
        lettersEl.appendChild(pEl)
    }
}

function submit(e){
    if(e.which == 13){
        now = String(inputEl.value.toLowerCase())
        inputEl.value = ''
        for(let i = 0; i < wordList.length; i++){
            if(now == wordList[i].toLowerCase()){
                if(written.length !== 0){
                    for(let j = 0; j < written.length; j++){
                        if(wordList[i].toLowerCase() == written[j]){
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

function correct(n){
    written.push(n)
    correctEl.innerText = "CORRECT"
    correctEl.style.color = "green"
    count = written.length
    countEl.innerText = `Words Written: ${count}/${wordList.length}` 

    if(count == wordList.length){
        congratulations()
        return;
    }

    console.log(written)
}

function wrong(){
    correctEl.innerText = "WRONG"
    correctEl.style.color = "red"
}

function used(){
    correctEl.innerText = "USED"
    correctEl.style.color = "yellow"
}

function congratulations(){
    finishEl.classList.remove('show')
    inputEl.classList.add('show')
    bodyEl.removeEventListener('keydown', submit)
}

function resetFunc(){
    written = []
    correctEl.innerText = "START"
    correctEl.style.color = "blue"
    count = written.length
    countEl.innerText = `Words Written: ${count}/${wordList.length}` 
}


resetEl.addEventListener('click', resetFunc)

bodyEl.addEventListener('keydown', submit)

/* Knytter knappen til javascript gjennom id og legger til klassen show hvis den ikke er lagt til og fjerner den hvis den er det */
function dropdownMeny() {
  document.getElementById("minMeny").classList.toggle("shower");
}

/* Når webvinduet klikkes starter funksjonen, som fortsetter om knappen som blir trykket ikke er meny-knappen. Denne funksjonen fjerner altså menyen om du trykker et annet sted */
window.onclick = function(event) {
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

