const moves = document.getElementById("moves");
const matches = document.getElementById("matches");
const cards = document.getElementById("cards");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

const emojis = ["🍎", "🍌", "🍇", "🍓", "🍒", "🥭"];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moveCount = 0;
let matcheCount = 0;
let hideTimeout = null;


function createCards(){
    cards.innerText = "";
    const gameEmojis = [...emojis, ...emojis];

    gameEmojis.sort(function(){
        return Math.random() - 0.5
    });

    gameEmojis.forEach(function(emoji){
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.innerText = "?";

        card.addEventListener("click", function(){
            flipCard(card);
        });

    cards.appendChild(card);
    });
}


function flipCard(card){
    if(lockBoard === true){
        return;
    }
    if(card.classList.contains("fliped")){
        return;
    }
    if(card.classList.contains("matched")){
        return;
    }

    card.classList.add("fliped");
    card.innerText = card.dataset.emoji;

    if (firstCard === null) {
       firstCard = card;
    }else{
        secondCard = card;
        moveCount++;
        moves.innerText = moveCount;

        checkMatch();
    }
}


function checkMatch(){
    if(firstCard.dataset.emoji === secondCard.dataset.emoji){
        firstCard.classList.add("fliped");
        secondCard.classList.add("fliped");

        matcheCount++;
        matches.innerText = matcheCount;

        firstCard = null;
        secondCard = null;

        if (matcheCount === emojis.length) {
            message.innerText = "Congrulation! You Won!";
        }
    }else{
        lockBoard = true;

        hideTimeout = setTimeout(function(){
            firstCard.classList.remove("fliped");
            secondCard.classList.remove("fliped");

            firstCard.innerText = "?";
            secondCard.innerText = "?";

            firstCard = null;
            secondCard = null;

            lockBoard = false;
            hideTimeout = null
        }, 1000);
    }
}


function restartGame(){
    clearTimeout (hideTimeout);
    hideTimeout = null;
    firstCard = null;
    secondCard = null;
    lockBoard = null;

    moveCount = 0;
    matcheCount = 0;

    moves.innerText = 0;
    matches.innerText = 0;
    message.innerText = "";

    createCards();
}

restartBtn.addEventListener("click", function(){
    restartGame();
});

restartGame();