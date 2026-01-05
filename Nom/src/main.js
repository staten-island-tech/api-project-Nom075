import "./style.css";

const app = document.querySelector("#app");

function centerDeck(Name, Image){
  app.innerHTML = `
  <div class="card bg-base-100 w-96 h-120 mx-1000 shadow-sm">
    <figure>
      <img class="m-5 h-70"
        src=${Image}
        alt="Card" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">${Name}</h2>
      <button class = "drawNew">Draw 1</button>
      <p>Cards in this pile:</p>
    </div>
  </div>

  <div class="flex space-x-4 my-20">
    
  <div class="card bg-base-100 w-96 h-100 mx-10 shadow-sm" id=P1>
    <figure>
      <img class="m-5 h-70"
        src=${CardBack}
        alt="Card" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">Player1</h2>
      <p> Remaining Cards:</p>
    </div>
  </div>
  
  <div class="card bg-base-100 w-96 h-100 mx-10 shadow-sm" id=P2>
    <figure>
      <img class="m-5 h-70"
        src=${CardBack}
        alt="Card" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">Player2</h2>
    </div>
  </div>

  <div class="card bg-base-100 w-96 h-100 mx-10 shadow-sm" id=P3>
    <figure>
      <img class="m-5 h-70"
        src=${CardBack}
        alt="Card" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">Player3</h2>
    </div>
  </div>

  <div class="card bg-base-100 w-96 h-100 mx-10 shadow-sm" id=P4>
    <figure>
      <img class="m-5 h-70"
        src=${CardBack}
        alt="Card" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">Player4</h2>
    </div>
  </div>
  
  </div>
  
  `
  buttons()
}

async function run(data_link) {
  try {
    const response = await fetch(`${data_link}`);
    if (response.status !== 200) {
      throw new Error(response);
    } else {
      const value = await response.json();
      return (value)
    }
  } catch (error) {
    console.log(error);
  }
}

async function drawCard(amount){
  await run(`https://www.deckofcardsapi.com/api/deck/${deckID}/shuffle/`)
  const response = await run(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=${amount}`)
  const card = response.cards[0]
  return (card)
}

function buttons(){
  document.querySelector(".drawNew").addEventListener("click", async function(){
  const grabbed_card = await drawCard(1)
  const card_name = grabbed_card.value + " of " + grabbed_card.suit
  centerDeck(card_name, grabbed_card.image)
})
}

const deckID = "ih8tge5x22di"

//reset deck
await run(`https://www.deckofcardsapi.com/api/deck/${deckID}/return/`)

//game set up

await run()

//get blank card
const CardBack = "https://www.deckofcardsapi.com/static/img/back.png"



centerDeck("No Cards... Draw one!", CardBack)




document.addEventListener("keydown", (event) => {
  if (event.key === "e" || event.key === "E") {
    if (card.value === "JACK"){
      console.log("SLAPPED!")
    } else{
      console.log("WRONG SLAP U DUMBASS")
    }
  }
});


//Get a deck: https://www.deckofcardsapi.com/api/deck/new/
//Draw a card: https://www.deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
//Shuffle ALL: https://www.deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/
//Shuffle all remain: https://www.deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/

//PILES

//Add to a pile: https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S
//Shuffle piles: https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/shuffle/
//See pile cards: https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/list/


/* DRAWING FROM A PILE
https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/draw/?cards=AS
https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/draw/?count=2
https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/draw/bottom/
https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/draw/random/ 
*/


  /* RETURN TO DECK
https://www.deckofcardsapi.com/api/deck/<<deck_id>>/return/
https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/return/
https://www.deckofcardsapi.com/api/deck/<<deck_id>>/return/?cards=AS,2S
https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/return/?cards=AS,2S 
*/