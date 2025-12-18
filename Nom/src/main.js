import "./style.css";

const app = document.querySelector("#app");

function centerDeck(Name, Image){
  app.innerHTML = `
  <div class="card bg-base-100 w-96 h-100 shadow-sm">
    <figure>
      <img
        src=${Image}
        alt="Card" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">${Name}</h2>
    </div>
  </div>
  `
}

const deckID = "ih8tge5x22di"
await run(`https://www.deckofcardsapi.com/api/deck/${deckID}/return/`)

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

await run(`https://www.deckofcardsapi.com/api/deck/${deckID}/shuffle/`)
const all_cards = await run(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
const card = all_cards.cards[0]
const card_name = (card.value + " of " + card.suit)
centerDeck(card_name, card.image)

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