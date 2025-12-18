import "./style.css";

const app = document.querySelector("#app");

app.innerHTML = `
<div class="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
`;

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

const all_cards = await run(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
console.log(all_cards)
const first_card = all_cards.cards[0]
console.log(first_card.image)
document.querySelector("body").insertAdjacentHTML("afterbegin", 
  `
  <p>${first_card.value} of ${first_card.suit}</p>
  <img src = ${first_card.image}/>
  
  
  `) 


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