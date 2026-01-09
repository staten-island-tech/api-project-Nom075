import "./style.css";

const app = document.querySelector("#app");
let pageNumber = 1
let errorTracker = 0

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
    errorTracker = 1
    dealContainer.insertAdjacentHTML("afterbegin", 
    `
    <div class="deal-card card bg-base-100 w-80 h-80 shadow-sm z-50">
      <div class="card-body items-center gap-5">
        <h2 class="card-title">Something went wrong.</h2>
        <p>If you are seeing this error, it is probably because you spammed buttons and searched things too frequently. This caused the API to rate limit your IP address lol. Please wait for your rate limit to end.</p>
        <p>${error}</p>
        <button class = "btn btn-active btn-info" onclick = "window.location.reload()">Refresh the site.</button>
      </div>
    </div>
    `
    )

  }
}

const dealContainer = document.createElement("div")
dealContainer.className = "flex flex-wrap gap-10 p-10 w-full h-full overflow-scroll justify-center items-center"
app.insertAdjacentElement("afterbegin", dealContainer)

const tool_bar = document.createElement("div")
tool_bar.className = "flex flex-col gap-10 p-10 w-full h-20 items-center"
app.insertAdjacentElement("afterbegin", tool_bar)



tool_bar.insertAdjacentHTML("afterbegin", 
  `
    <div class="navbar bg-base-100 shadow-sm z-2 rounded-2xl gap-10">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">CheapShark Deals</a>
      </div>
      <div class="join z-2">
        <button class="join-item btn backPage">«</button>
        <button class="join-item btn pageDisplay">Page ${pageNumber}</button>
        <button class="join-item btn nextPage">»</button>
      </div>
      <div class="flex gap-2">
        <input type="text" placeholder="Search" class="search input input-bordered w-24 md:w-auto rounded-xl" />
        <div class="dropdown dropdown-end">
        </div>
      </div>
    </div>
  `
)

let deals = await run(
  `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=9999&pageNumber=${pageNumber - 1}`
)

function mainPage(){
  dealContainer.innerHTML = "<p>uh</p>"
  
  deals.forEach((game) => {
  dealContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="deal-card card bg-base-100 w-80 h-80 shadow-sm z-1">
      <figure>
        <img src="${game.thumb}" alt="deal" class="w-full" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${game.title}</h2>
        <div class="flex flex-col">
          <p>Price: <s>$${game.normalPrice}</s> <b>$${game.salePrice}</b></p>
        </div>
        <div class="card-actions flex flex-row justify-center">
          <button class="more-info btn btn-outline btn-info rounded-xl">More info! OMG!</button>
        </div>
      </div>
    </div>
    `
  )
})
  moreInfoButtons()

}


function search(){
  const input = document.querySelector('.search');
      input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          filter(input.value)
        }
      });
}

async function filter(searched){
  const data = await run(`https://www.cheapshark.com/api/1.0/deals?title=${searched}`)
  dealContainer.innerHTML = ""
  data.forEach((deal) => {
    if (deal.isOnSale === "1"){
      dealContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="deal-card card bg-base-100 w-80 h-80 shadow-sm z-1">
          <figure>
            <img src="${deal.thumb}" alt="deal" class="w-full" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${deal.title}</h2>
            <div class="flex flex-col">
              <p>Price: <s>$${deal.normalPrice}</s> <b>$${deal.salePrice}</b></p>
            </div>
            <div class="card-actions flex flex-row justify-center">
              <button class="more-info btn btn-outline btn-info rounded-xl">More info! OMG!</button>
            </div>
          </div>
        </div>
        `
    )
    }

  })
  moreInfoButtons()
  search()
}


function page(){
  const left = document.querySelector(".backPage")
  left.addEventListener("click", async function(){
    if (pageNumber > 1){
      pageNumber -= 1
      deals = await run(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=9999&pageNumber=${pageNumber - 1}`)
      document.querySelector(".pageDisplay").innerHTML = `Page ${pageNumber}`
      mainPage()
    }
  })
  const right = document.querySelector(".nextPage")
  right.addEventListener("click", async function(){
    pageNumber += 1
    deals = await run(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=9999&pageNumber=${pageNumber - 1}`)
    document.querySelector(".pageDisplay").innerHTML = `Page ${pageNumber}`
    mainPage()
  })
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

  const Rating = parseInt(Deal.steamRatingPercent)
  
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
        <div class="flex flex-col items-start gap-3">
          <p>Meta Critic Rating Score: ${parseInt(Deal.metacriticScore)}</p>
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


if (errorTracker === 0){
  mainPage()
}
search()
page()