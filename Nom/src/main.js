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

/* async function getData(country){
  try{
    const response = await fetch(``)
    if (response.status !== 200){
      throw new Error(response)
    } else {
      const data = await response.json();
      document.getElementById("the Id").textContent = data
    }
  }
  catch (error){
    console.log(error)
  }
}

getData("country") */

async function all_games() {
  try {
    const response = await fetch(`https://www.gamerpower.com/api/giveaways`);
    if (response.status !== 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      document.querySelector("body").insertAdjacentHTML("afterbegin", `<p>${data}</p>`);
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}

all_games();
