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

const deals = await run(
  `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=9999`
)

deals.forEach((game) => {
  app.insertAdjacentHTML(
    "beforeend",
    `
    <div class="card bg-base-100 w-80">
      <figure>
        <img
          class="w-50 h-50 mx-auto"
          src="${game.thumb}"
          alt="deal"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-sm">${game.title}</h2>
      </div>
    </div>
    `
  )
})


