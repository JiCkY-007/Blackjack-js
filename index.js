
// challenge Blackjack 

let blackjackGame = {
    'you': {'scoreSpan':'#your-blackjack-result', 'div':'#your-box', 'score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result', 'div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11 ]},
     'wins':0 ,
     'losses':0,
     "draws":0,

};

const YOU =blackjackGame['you']
const DEALER=blackjackGame['dealer']
const hitSound= new Audio('/home/aaswin/blackjack-js/sounds/swish.m4a');
const winSound= new Audio('/home/aaswin/blackjack-js/sounds/cash.mp3')
const lostSound=new Audio('/home/aaswin/blackjack-js/sounds/aww.mp3')

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit );

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic );

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
function blackjackHit(){

  let card = randomCard();
  console.log(card);    
  showCard(card, YOU);
  updateScore(card,YOU);
  showScore(YOU);
  console.log(YOU['score']);

};
function randomCard(){

  let randomIndex = Math.floor(Math.random()*13);
  return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
    if (activePlayer['score']<= 21){
  
    let cardImage = document.createElement('img');
    cardImage.src =`/home/aaswin/blackjack-js/images/${card}.png`;//string templating /home/aaswin/blackjack-js/blackjack-js/images/${card}.png
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play(); 
  }
}

function blackjackDeal(){

    let winner = computeWinner();

    //showResult(computeWinner());
    showResult(winner);

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    for(i=0; i<yourImages.length; i++){
      yourImages[i].remove();
    }
    
    for (i=0; i<dealerImages.length; i++){
      dealerImages[i].remove();
    }
        YOU['score']= 0;
        DEALER['score']=0;
      
        document.querySelector('#your-blackjack-result').textContent=0;

        document.querySelector('#dealer-blackjack-result').textContent=0;

        
        document.querySelector('#your-blackjack-result').style.color ='#ffffff';

        document.querySelector('#dealer-blackjack-result').style.color ='#ffffff';
      }
function updateScore(card, activePlayer){
  if (card === 'A'){
  // iF ADDING 11 KEEPS ME BELOW 21, ADD 11, OTHERWISE, ADD  1
    if(activePlayer['score' ]+ blackjackGame ['cardsMap'][card]<= 21){
    activePlayer['score'] += blackjackGame['cardsMap'][card][1];
      }else {
       activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }
  } else {
     activePlayer['score']+= blackjackGame['cardsMap'][card];
    }
 }

function showScore(activePlayer){
  if (activePlayer['score']>21){
    document.querySelector(activePlayer['scoreSpan']).textContent = 'bust!';

    document.querySelector(activePlayer['scoreSpan']).style.color= 'red';
  }else{
  document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
  }
};

function dealerLogic() {
  //showResult(computeWinner());
  
  let card = randomCard();
  showCard(card , DEALER);
  updateScore(card, DEALER)
  showScore(DEALER);
  
  

}


// compute winner and return who just won 
//update the wins, draws, and losses
function computeWinner(){
  let winner;

  if(YOU['score'] <= 21){
    // consition : higher score than dealer or when dealer bust but you're 21 or under

    if (YOU['score']>DEALER ['score'] || (DEALER['score']>21)){
      blackjackGame['wins']++;
      winner= YOU;
    }else if(YOU['score'] <DEALER['score']){

      blackjackGame['losses']++;
      winner = DEALER;

    }else if (YOU['score'] === DEALER ['score']){

      blackjackGame['draws']++;
}
  }else if(YOU['score']>21 && DEALER['score']<=21){

    blackjackGame['losses']++;
    winner = DEALER ;

  }else if (YOU["score"]> 21 && DEALER['score']> 21){

    blackjackGame['draws']++;

  }

  console.log('winner is ', winner);
  return winner;
}

function  showResult(winner){
  let message, messageColor;

  if(winner=== YOU ){
    document.querySelector('#wins').textContent = blackjackGame['wins']; 
    message = "you won";
    messageColor='green';
    winSound.play();
  }else if(winner === DEALER){
    document.querySelector('#losses').textContent = blackjackGame['losses']; 
    message ="you lost";
    messageColor='red';
    lostSound.play();
  }else{
    document.querySelector('#draws').textContent = blackjackGame['draws']; 
    message='You drew';
    messageColor= 'black';
  }
  document.querySelector('#blackjack-result').textContent= message;
  document.querySelector('#blackjack-result').style.color=messageColor;   
}