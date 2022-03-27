/* Knytter alle matte-kortene opp mot en javascript konstant */
const cards = document.querySelectorAll('.memory-card');

/* Lager en variabel som sjekker om ett kort er flippet og setter det til 'false' */
let hasFlippedCard = false;
/* Variabel som styrer om brettet er klikkbart eller ikke */
let lockBoard = false;
/* Lager to variabler for å sjekke om kortet som trykkes er det første eller andre kortet */
let firstCard, secondCard;

function flipCard() {
  /* Hvis lockboard er true stopper funksjonen slik at man ikke kan klikke på kortene */
  if (lockBoard) return;
  /* Hvis kortet du trykker på allerede er trykket inn stopper funksjonen slik at ingenting med det kortet endrer seg */
  if (this === firstCard) return;

  /* Legger til klassen 'flip' til elementet som startet funksjonen */
  this.classList.add('flip');

  if (!hasFlippedCard) {
    /* Sier at kortet som er trykket er flippet, knytter firstCard variabelen til kortet som ble klikket og stopper funksjonen slik at ikke secondCard også får verdien til det trykkede kortet */
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  /* Hvis et kort ikke allerede er flippet vil kortet som blir trykket bli tilknyttet variabelen secondCard  */
  secondCard = this;
  /* Kaller en ny funksjon som sjekker om kortene matcher */
  checkForMatch();
}

/* Sjekker om kortene matcher */
function checkForMatch() {
  /* Lager en variabel som sjekker om kortene matcher ved å gi isMatch verdien true eller false */
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  /* Hvis isMatch er true kjøres disableCards, og hvis den er false kjøres unflipCards (? er en slags snarvei på if else når du bruker boolean verdier)  */
  isMatch ? disableCards() : unflipCards();
}

/* Funksjonen fjerner lytteren fra kortene som er trykket om de matcher slik at de er låst og starter resetBoard funksjonen */
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

/* Funksjonen låser brettet slik at du ikke kan trykke noen kort før kortene er flippet tilbake, mens det flipper kortene */
function unflipCards() {
  /* Låser brettet */
  lockBoard = true;

  /* Venter 1.5 sekunder før det flipper kortene tilbake ved å fjerne klassen flip. Dette er slik at brukeren skal rekke å se begge kortene han/hun trykket på */
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

/* Fjerner verdiene fra variablene som brukes i koden slik at du kan klikke på nytt og låser opp brettet  */
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

/* Funksjonen som stokker kortene. Er skrevet med parantes rundt slik at den kjøres med en gang den er definert */
(function shuffle() {
  /* Hvert card i cards tildeles et tilfeldig tall mellom 0 og 15 og så vil kortet bli satt på sin plass gjennom style.order i css gjennom randomPos variabelen */
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();

/* Lager en lytter som starter funksjonen flipCard om kortet blir klikket */
cards.forEach(card => card.addEventListener('click', flipCard));





/* Knytter knappen til javascript gjennom id og legger til klassen show hvis den ikke er lagt til og fjerner den hvis den er det */
function dropdownMeny() {
  document.getElementById("minMeny").classList.toggle("show");
}

/* Når webvinduet klikkes starter funksjonen, som fortsetter om knappen som blir trykket ikke er meny-knappen. Denne funksjonen fjerner altså menyen om du trykker et annet sted */
window.onclick = function(event) {
  if (!event.target.matches('.menyKnapp')) {
    let dropdowns = document.getElementsByClassName("menyInnhold");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


var x = document.getElementById("myAudio"); 

function playAudio() { 
  x.play(); 
} 

function pauseAudio() { 
  x.pause(); 
} 



