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
await fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/return/`)

/* async function cards() {
  try {
    const response = await fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
    if (response.status !== 200) {
      throw new Error(response);
    } else {
      const deck = await response.json();
      document.querySelector("body").insertAdjacentHTML("afterbegin", `<p>${deck}</p>`);
      console.log(deck);
    }
  } catch (error) {
    console.log(error);
  }
}

cards(); */
const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
const all_cards = await response.json()
console.log(all_cards)
document.querySelector("body").insertAdjacentHTML("afterbegin", `<p>${all_cards}</p>`)


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