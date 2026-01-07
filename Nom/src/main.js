import "./style.css";

const app = document.querySelector("#app");

async function run(data_link) {
  try {
    const response = await fetch(`${data_link}`);
    if (response.status !== 200) {
      throw new Error(response);
    } else {
      const value = await response.json();
      console.log(value)
      return (value)
    }
  } catch (error) {
    console.log(error);
  }
}

const dealContainer = document.createElement("div")
dealContainer.className = "flex flex-wrap gap-10 p-10 w-full h-full overflow-scroll justify-center items-center"
app.insertAdjacentElement("afterbegin", dealContainer)


const deals = await run(
  `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=9999`
)

function mainPage(){
  console.log("loading main page")
  dealContainer.innerHTML = ""
  
  deals.forEach((game) => {
  dealContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="deal-card card bg-base-100 w-80 h-80 shadow-sm">
      <figure>
        <img src="${game.thumb}" alt="deal" class="w-full" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${game.title}</h2>
        <div class="flex flex-col">
          <p>Price: <s>$${game.normalPrice}</s> <b>$${game.salePrice}</b></p>
        </div>
        <div class="card-actions flex flex-row justify-center">
          <button class="more-info btn btn-outline btn-info">More info! OMG!</button>
        </div>
      </div>
    </div>
    `
  )
})
  moreInfoButtons()
}

function moreInfoButtons(){
  const all_btn = dealContainer.querySelectorAll(".more-info")
  all_btn.forEach((btn) => {
    btn.addEventListener("click", function(){
      const clicked_card = btn.closest(".deal-card")
      displayFullDeal(clicked_card)
    })
  })

}

async function displayFullDeal(card){
  const title = card.children[1].children[0].textContent
  const data = await run(`https://www.cheapshark.com/api/1.0/deals?title=${title}&exact=1`)
  const Deal = data[0]
  console.log(Deal)

  const Rating = parseInt(Deal.steamRatingPercent)

  console.log(dealContainer)
  
  dealContainer.innerHTML = 

  `
    <div class = "flex justify-center w-full ">
      <button class="mainMenuBTN btn btn-soft btn-info w-100">Go Back</button>
    </div>
    <div class="deal-card card bg-base-100 w-200 h-200 shadow-sm">
      <figure>
        <img src="${Deal.thumb}" alt="deal" class="w-full" />
      </figure>
      <div class="card-body">
        <h2 class="card-title justify-center">${Deal.title}</h2>
        <div class = "badges gap-3 flex justify-center"></div>
        <div class="flex flex-col items-center gap-3">
          <p>Price: <s>$${Deal.normalPrice}</s> <b>$${Deal.salePrice}</b></p>
          <p>Save <b>${Math.round(Deal.savings)}%!</b></p>
        </div>
      </div>
    </div>
    `

  if (Deal.isOnSale === "1"){
    document.querySelector(".badges").insertAdjacentHTML("afterbegin", `<div class="badge badge-warning">On Sale!</div>`)
  } else {
    document.querySelector(".badges").insertAdjacentHTML("afterbegin", `<div class="badge badge-neutral">Not on Sale</div>`)
  }
  if (Rating > 79){
    document.querySelector(".badges").insertAdjacentHTML("afterbegin", `<div class="badge badge-success">Very Positive</div>`)
  } else if (Rating > 69){
    document.querySelector(".badges").insertAdjacentHTML("afterbegin", `<div class="badge badge-accent">Mostly Positive</div>`)
  } else if (Rating > 39){
    document.querySelector(".badges").insertAdjacentHTML("afterbegin", `<div class="badge badge-warning">Mixed Reviews</div>`)
  } else {
    document.querySelector(".badges").insertAdjacentHTML("afterbegin", `<div class="badge badge-error">Negative</div>`)
  }
  
  document.querySelector(".mainMenuBTN").addEventListener("click", mainPage)



}


mainPage()




