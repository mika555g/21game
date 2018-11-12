let cards = [
    '6S', '6H', '6C', '6D',
    '7S', '7H', '7C', '7D',
    '8S', '8H', '8C', '8D',
    '9S', '9H', '9C', '9D',
    '10S', '10H', '10C', '10D',
    'JS', 'JH', 'JC', 'JD',
    'QS', 'QH', 'QC', 'QD',
    'KS', 'KH', 'KC', 'KD',
    'AS', 'AH', 'AC', 'AD',
];

let cardsValues = {
    '6S': 6, '6H': 6, '6C': 6, '6D': 6,
    '7S': 7, '7H': 7, '7C': 7, '7D': 7,
    '8S': 8, '8H': 8, '8C': 8, '8D': 8,
    '9S': 9, '9H': 9, '9C': 9, '9D': 9,
    '10S': 10, '10H': 10, '10C': 10, '10D': 10,
    'JS': 2, 'JH': 2, 'JC': 2, 'JD': 2,
    'QS': 3, 'QH': 3, 'QC': 3, 'QD': 3,
    'KS': 4, 'KH': 4, 'KC': 4, 'KD': 4,
    'AS': 11, 'AH': 11, 'AC': 11, 'AD': 11
};

let playerCards = 0;
let dealerCards = 0;
let points = 0;
let firstCard = 0;
let playerVisibleCards = 0;

let playerCard = function random() {
    let randomCard = cards[Math.floor(Math.random() * cards.length)];
    let index = cards.indexOf(randomCard);

    if (index > -1) {
        cards.splice(index, 1);
    }

    return randomCard;
}



function addCards(player, i) {

    for (let j = 1; j <= i; ++j) {
        let card = document.createElement('div');
        cardName = playerCard();
        card.style.backgroundImage = 'url(./images/cards/' + cardName + '.png)';

        cardValue = cardsValues[cardName];
        points += cardValue;

        if (player == 'player' && i == 2 && j == 1) {
          firstCard = cardValue;
          console.log("first card " + firstCard);  
        }

        if (player == 'player') {
            playerCards += points;
            document.getElementById('playerCards').appendChild(card);
            console.log(playerCards);
            if(playerCards > 21){
                showCards('dealer', 'win'); 
            }
            points = 0;
        }
        if (player == 'dealer') {
            document.getElementById('dealerCards').appendChild(card);
            dealerCards += points;
            console.log(dealerCards);
            points = 0;
        }

        document.getElementById('deal').disabled = true;
    }
}



function deal(playerToDeal) {
    if (playerToDeal == 'both') {
        addCards('player', 2);
        addCards('dealer', 2);
    }

    if (playerToDeal == 'player') {
        addCards('player', 1);
    }
    if (playerToDeal == 'dealer') {
        addCards('dealer', 1);
    }

}

function dealerPlay(){
    document.getElementById("gameEnd").disabled = true;
    document.getElementById("more").disabled = true;
    playerVisibleCards = playerCards - firstCard;
    console.log("visible " + playerVisibleCards)
     
    while( dealerCards <= 16 ) {
        if (dealerCards != 16 || dealerCards == 16  &&  ((Math.floor(Math.random() * 3)) == 1)) {
            this.deal('dealer');
        }
    }
    

    if( dealerCards > 21 ) {
        showCards('dealer', 'over');
    } else if ( dealerCards == 21 ){
        if( dealerCards == playerCards ){
            showCards('dealer', 'equal');
        } else {
            showCards('dealer', 'win'); 
        }
    } else if ((playerVisibleCards == 15 || playerVisibleCards == 16 ) && dealerCards == 16 ){
        this.deal('dealer');
        if (dealerCards >= 18 && dealerCards <= 21 ) {
            if ( dealerCards > playerCards){
                showCards('dealer', 'win');
            } else if (dealerCards == playerCards ){
                showCards('dealer', 'equal'); 
            } else {
                showCards('player', 'win');  
            }
        } else {
            showCards('dealer', 'over');
        }
    } else if ( playerVisibleCards == 17 && dealerCards == 16 ){
        this.deal('dealer'); 
        if ( dealerCards > 21 ) {
            showCards('dealer', 'over');
        } else if ( dealerCards == 18 ) {
            this.deal('dealer'); 
            if (dealerCards > 21 ) {
                showCards('dealer', 'over'); 
            } else if ( dealerCards >= 19 && dealerCards <= 21 ){
                if ( dealerCards > playerCards) {
                    showCards('dealer', 'win');
                } else if (dealerCards == playerCards) {
                    showCards('dealer', 'equal');
                } else {
                    showCards('player', 'win');
                }
            }
        }
   
    } else if ( playerVisibleCards == 18 && dealerCards == 16 ) {
        this.deal('dealer');
        if ( dealerCards > 21 ) {
            showCards('dealer', 'over');
        } else if ( dealerCards < 20 ) {
            this.deal('dealer'); 
            if ( dealerCards > 21 ){
                showCards('dealer', 'over');
            } else if ( dealerCards == playerCards ) {
                showCards('dealer', 'equal');
            } else if ( dealerCards > playerCards ) {
                showCards('dealer', 'win');
            } else {
                showCards('player', 'win');
            }
        }    

    } else if (playerVisibleCards == 15 && dealerCards == 17 ) {
        if ( dealerCards > playerCards) {
            showCards('dealer', 'win');
        } else if (dealerCards == playerCards) {
            showCards('dealer', 'equal');
        } else {
            showCards('player', 'win');
        }
    } else if ((playerVisibleCards == 16 || playerVisibleCards == 17 ) && dealerCards == 17) {
        this.deal('dealer'); 
        if ( dealerCards > 21 ) {
            showCards('dealer', 'over'); 
        } else if (dealerCards > playerCards) {
            showCards('dealer', 'win');
        } else if (dealerCards == playerCards) {
            showCards('dealer', 'equal');
        } else {
            showCards('player', 'win');
        }

    } else if (playerVisibleCards == 18 && dealerCards == 17) {
        while (dealerCards < 20) {
            this.deal('dealer');
        }
        if (dealerCards > 21) {
            showCards('dealer', 'over');
        } else if (dealerCards > playerCards) {
            showCards('dealer', 'win');
        } else if (dealerCards == playerCards) {
            showCards('dealer', 'equal');
        } else {
            showCards('player', 'win');
        }

    } else if (playerVisibleCards < 17 && dealerCards == 18) {
         if (dealerCards > playerCards) {
            showCards('dealer', 'win');
        } else if (dealerCards == playerCards) {
            showCards('dealer', 'equal');
        } else {
            showCards('player', 'win');
        }

    } else if (playerVisibleCards >= 17 && dealerCards == 18) {
        this.deal('dealer');
    
        if (dealerCards > 21) {
            showCards('dealer', 'over');
        } else if (dealerCards > playerCards) {
            showCards('dealer', 'win');
        } else if (dealerCards == playerCards) {
            showCards('dealer', 'equal');
        } else {
            showCards('player', 'win');
        }

    } else if (playerVisibleCards < 18 && dealerCards == 19) {
        if (dealerCards > playerCards) {
            showCards('dealer', 'win');
        } else if (dealerCards == playerCards) {
            showCards('dealer', 'equal');
        } else {
            showCards('player', 'win');
        }

    } else if (playerVisibleCards >= 18 && dealerCards == 19) {
        this.deal('dealer');

        if (dealerCards > 21) {
            showCards('dealer', 'over');
        } else if (dealerCards > playerCards) {
            showCards('dealer', 'win');
        } else if (dealerCards == playerCards) {
            showCards('dealer', 'equal');
        } else {
            showCards('player', 'win');
        }

    } else if (playerVisibleCards < 19 && dealerCards == 20) {
        if (dealerCards > playerCards) {
            showCards('dealer', 'win');
        } else if (dealerCards == playerCards) {
            showCards('dealer', 'equal');
        } else {
            showCards('player', 'win');
        }

    }  else if (playerVisibleCards == 19 && (dealerCards == 16 || dealerCards == 17 || dealerCards == 18 || dealerCards == 19)) {
        while (dealerCards < 21) {
            this.deal('dealer');
        }
        if (dealerCards > 21) {
            showCards('dealer', 'over');
        } else {
            showCards('dealer', 'equal');
        }

    } else if ( playerVisibleCards < 15  ){ 
        if (dealerCards > playerCards) {
            showCards('dealer', 'win');
        } else if (dealerCards == playerCards) {
            showCards('dealer', 'equal');
        } else {
            showCards('player', 'win');
        }
    }
}

function showCards(player, status) {
    let message = document.createElement('h1');
    document.getElementById('playerCards').classList.add("opacity");
    document.getElementById('dealerCards').classList.add("opacity");

    if(( player == 'player' && status == 'over' ) || ( player == 'dealer' && status == 'win' )) {
        message.innerHTML = "Dealer wins press New Game";
    } else if (( player == 'dealer' && status == 'over' ) || ( player == 'player' && status == 'win' )){
        message.innerHTML = "Player wins press New Game";
    } else if ( player == 'dealer' && status == 'equal' ){
        message.innerHTML = "Draw press New Game";
    } 


    document.getElementById('result').appendChild(message);
}

function reset(){
    location.reload();
}


