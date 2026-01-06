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

deals.forEach((game) => {
  dealContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="card bg-base-100 w-80 h-80 shadow-sm">
      <figure>
        <img src="${game.thumb}" alt="deal" class="w-full" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${game.title}</h2>
        <div class="flex flex-col">
          <p>Normal price: ${game.normalPrice}</p>
          <p>Discount price: ${game.salePrice}</p>
        </div>
        <div class="card-actions flex flex-row items-right justify-end">
          <button class="btn btn-outline btn-info">More info! OMG!</button>
        </div>
      </div>
    </div>
    `
  )
})


