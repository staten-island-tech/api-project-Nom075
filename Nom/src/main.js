import "./style.css";

const app = document.querySelector("#app");
let pageNumber = 1
let errorTracker = 0

async function run(data_link) {
  try {
    dealContainer.innerHTML = `<span class="loading loading-dots loading-xl bg-white darklightB"></span>`
    const response = await fetch(`${data_link}`);
    dealContainer.innerHTML = ""
    if (response.status !== 200) {
      throw new Error(response);
    } else {
      const value = await response.json();
      return (value)
    }
  } catch (error) {
    errorTracker = 1
    dealContainer.innerHTML = ""
    dealContainer.insertAdjacentHTML("afterbegin", 
    `
    <div class="deal-card card bg-base-100 w-80 h-100 shadow-sm z-50 darklightB border darklightBorder">
      <div class="card-body items-center gap-3">
        <h2 class="card-title text-black darklightT">Something went wrong.</h2>
        <p class = "text-black darklightT">If you are seeing this error, it is probably because you spammed buttons and searched things too frequently. This caused the API to rate limit your IP address lol. Please wait for your rate limit to end.</p>
        <p class = "text-black darklightT">If it wasn't because of rate limiting, sorry idk what happened. Yell at me I guess.</p>
        <p class = "text-black darklightT">${error}</p>
        <button class = "btn btn-active btn-info border darklightBorder" onclick = "window.location.reload()">Click here to refresh the site.</button>
      </div>
    </div>
    `
    )
  }
}

const dealContainer = document.createElement("div")
dealContainer.className = "flex flex-wrap gap-10 p-10 w-full h-full overflow-scroll justify-center items-center pb-30 pt-10 bg-white darklightB"
app.insertAdjacentElement("afterbegin", dealContainer)

const tool_bar = document.createElement("div")
tool_bar.className = "flex flex-col gap-10 p-10 w-full h-20 items-center bg-white darklightB"
app.insertAdjacentElement("afterbegin", tool_bar)

tool_bar.insertAdjacentHTML("afterbegin", 
  `
    <div class="navbar bg-base-100 shadow-sm z-2 rounded-2xl gap-10 bg-white darklightB border darklightBorder">
      <div class="flex-1">
        <button class="logo btn btn-ghost hover:bg-sky-300 text-xl text-black darklightT">CheapShark Deals</button>
      </div>
      <input type="checkbox" checked="checked" class="toggle toggle-neutral darklight" />
      <div class="join z-2">
        <button class="join-item btn backPage border darklightBorder">«</button>
        <button class="join-item btn pageDisplay border darklightBorder">Page ${pageNumber}</button>
        <button class="join-item btn nextPage border darklightBorder">»</button>
      </div>
      <div class="flex gap-2">
        <input type="text" placeholder="Search" class="search input input-bordered w-24 md:w-auto rounded-xl border darklightBorder" />
        </div>
      </div>
    </div>
  `
)

let deals = await run(
  `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=9999&pageNumber=${pageNumber - 1}`
)

function mainPage(){
  dealContainer.innerHTML = ""
  
  deals.forEach((game) => {
  dealContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="deal-card card bg-base-100 w-80 h-80 shadow-sm z-1 bg-white darklightB border darklightBorder">
      <figure>
        <img src="${game.thumb}" alt="deal" class="w-full border darklightBorder" />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-black darklightT">${game.title}</h2>
        <div class="flex flex-col">
          <p class = "text-black darklightT">Price: <s>$${game.normalPrice}</s> <b>$${game.salePrice}</b></p>
        </div>
        <div class="card-actions flex flex-row justify-center">
          <button class="more-info btn btn-outline btn-info rounded-xl border darklightBorder">More info! OMG!</button>
        </div>
      </div>
    </div>
    `
  )
})
  moreInfoButtons()
  applyDarkMode()
}

function darklight(){
  const toggle = document.querySelector(".darklight")
  toggle.addEventListener("click", function(){
      const isNowDark = toggle.checked
      document.querySelectorAll(".darklightB").forEach((div) =>
      {
        div.classList.toggle("bg-white", !isNowDark)
        div.classList.toggle("bg-black", isNowDark)
      })
      document.querySelectorAll(".darklightT").forEach((div) =>
      {
        div.classList.toggle("text-white", isNowDark)
        div.classList.toggle("text-black", !isNowDark)
      })
      document.querySelectorAll(".darklightBorder").forEach((div) => {
        div.classList.toggle("border-black", !isNowDark)
        div.classList.toggle("border-white", isNowDark)
      })
      localStorage.setItem("darkMode", isNowDark ? "1" : "0")
  })
}

function applyDarkMode(){
  const isDark = localStorage.getItem("darkMode") === "1"
  document.querySelectorAll(".darklightB").forEach((div) => {
    div.classList.toggle("bg-white", !isDark)
    div.classList.toggle("bg-black", isDark)
  })
  document.querySelectorAll(".darklightT").forEach((div) => {
    div.classList.toggle("text-white", isDark)
    div.classList.toggle("text-black", !isDark)
  })
  document.querySelectorAll(".darklightBorder").forEach((div) => {
    div.classList.toggle("border-black", !isDark)
    div.classList.toggle("border-white", isDark)
  })
  const toggle = document.querySelector(".darklight")
  if(toggle) toggle.checked = isDark
}

function search(){
  const input = document.querySelector('.search');
      input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          filter(input.value, "Y")
        }
      });
}

function logo(){
  const logo = document.querySelector(".logo")
  logo.addEventListener("click", async function(){
    deals = await run(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=9999&pageNumber=${pageNumber - 1}`)
      mainPage()
  })
}

async function filter(searched, mustBeOnSale){
  const data = await run(`https://www.cheapshark.com/api/1.0/deals?title=${searched}`)
  console.log(data)
  if (errorTracker === 0) {

    if (!(data.length === 0)){
      dealContainer.innerHTML = ""
      data.forEach((deal) => {
        if ((deal.isOnSale === "1") || (mustBeOnSale === "N")){
          dealContainer.insertAdjacentHTML(
            "beforeend",
            `
            <div class="deal-card card bg-base-100 w-80 h-80 shadow-sm z-1 bg-white darklightB border darklightBorder">
              <figure>
                <img src="${deal.thumb}" alt="deal" class="w-full border darklightBorder" />
              </figure>
              <div class="card-body">
                <h2 class="card-title text-black darklightT">${deal.title}</h2>
                <div class="flex flex-col">
                  <p class = "text-black darklightT">Price: <s>$${deal.normalPrice}</s> <b>$${deal.salePrice}</b></p>
                </div>
                <div class="card-actions flex flex-row justify-center">
                  <button class="more-info btn btn-outline btn-info rounded-xl border darklightBorder">More info! OMG!</button>
                </div>
              </div>
            </div>
            `
        )
        }

      })
      moreInfoButtons()
      applyDarkMode()

    } else {
      dealContainer.innerHTML = 
      `
        <div class="deal-card card bg-base-100 w-80 h-80 shadow-sm z-50 bg-white darklightB border darklightBorder">
          <div class="card-body items-center gap-5">
            <h2 class="card-title text-black darklightT">Oops! No results!</h2>
            <p class = "text-black darklightT">No results were found for your search. Please search something more normal.</p>
            <button class = "btn btn-active btn-info border darklightBorder" onclick = "window.location.reload()">Click here to refresh the site.</button>
          </div>
        </div>
      `
    }
    if (dealContainer.innerHTML === ""){
      dealContainer.innerHTML = 
      `
        <div class="deal-card card bg-base-100 w-80 h-80 shadow-sm z-50 bg-white darklightB border darklightBorder">
          <div class="card-body items-center gap-5">
            <h2 class="card-title text-black darklightT">Expired Deals</h2>
            <p class = "text-black darklightT">Deals were found, but they are expired. Please try something else.</p>
            <button class = "btn btn-active btn-info border darklightBorder" onclick = "window.location.reload()">Click here to refresh the site.</button>
            <button class = "btn btn-active btn-info border darklightBorder offsale">Allow off sale items.</button>
          </div>
        </div>
      `
      offsale()
    }
    applyDarkMode()
  }
}

function offsale(){
  const btn = document.querySelector(".offsale")
  btn.addEventListener("click", function(){
    const searched = document.querySelector(".search").value
    console.log(searched)
    filter(searched, "N")
  })
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
      <button class="mainMenuBTN btn btn-soft btn-info w-100 border darklightBorder">Go Back</button>
    </div>
    <div class="deal-card card bg-base-100 w-200 h-200 shadow-sm bg-white darklightB border darklightBorder">
      <figure>
        <img src="${Deal.thumb}" alt="deal" class="w-full border darklightBorder" />
      </figure>
      <div class="card-body">
        <h2 class="card-title justify-center text-black darklightT">${Deal.title}</h2>
        <div class = "badges gap-3 flex justify-center"></div>
        <div class="flex flex-col items-center gap-3">
          <p class = "text-black darklightT">Price: <s>$${Deal.normalPrice}</s> <b>$${Deal.salePrice}</b></p>
          <p class = "text-black darklightT">Save <b>${Math.round(Deal.savings)}%!</b></p>
        </div>
        <div class="flex flex-col items-start gap-3">
          <p class = "text-black darklightT">Meta Critic Rating Score: ${parseInt(Deal.metacriticScore)}</p>
        </div>
      </div>
    </div>
    `

  if (Deal.isOnSale === "1"){
    document.querySelector(".badges").insertAdjacentHTML("afterbegin", `<div class="badge badge-warning border darklightBorder">On Sale!</div>`)
  } else {
    document.querySelector(".badges").insertAdjacentHTML("afterbegin", `<div class="badge badge-neutral border darklightBorder">Not on Sale</div>`)
  }
  if (Rating > 79){
    document.querySelector(".badges").insertAdjacentHTML("afterbegin", `<div class="badge badge-success border darklightBorder">Very Positive</div>`)
  } else if (Rating > 69){
    document.querySelector(".badges").insertAdjacentHTML("afterbegin", `<div class="badge badge-accent border darklightBorder">Mostly Positive</div>`)
  } else if (Rating > 39){
    document.querySelector(".badges").insertAdjacentHTML("afterbegin", `<div class="badge badge-warning border darklightBorder">Mixed Reviews</div>`)
  } else {
    document.querySelector(".badges").insertAdjacentHTML("afterbegin", `<div class="badge badge-error border darklightBorder">Negative</div>`)
  }
  
  document.querySelector(".mainMenuBTN").addEventListener("click", mainPage)
  applyDarkMode()
}


if (errorTracker === 0){
  mainPage()
}
search()
page()
logo()
darklight()
applyDarkMode()
