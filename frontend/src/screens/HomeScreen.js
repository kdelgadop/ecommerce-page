import { apiUrl } from "../config";
// Hardcoded data in case the api call fails and the website doesn't crash
import stuffJustInCase from "../data/stuff.json";

const HomeScreen = {
  render: async () => {
    let array = [];
    let random = Math.floor(Math.random() * 2 +1);

    try {
      const response = await fetch(`${apiUrl}/stuff`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonResponse = await response.json();
      array = jsonResponse
    } catch (error) {
      // Just in case the api doesn't respond bc Mongo shut down the server
      // se serve hardcoded data for demostration
      // return  `<div>Error in getting data</div>`
      array = stuffJustInCase
    }
    if (random === 1) {
      array = array.filter(x => x.group === 1);
    } else {
      array = array.filter(x => x.group === 2);
    }

    return `
    <h2 class="section-title">Featured things</h2>
    <div class="split">
        ${array.map((thing) => `
        <a href="/#/cart/${thing._id}" class="featured-item" id="button">
        <img src="${thing.img}">
        <p class="featured-details"><span class="price">${thing.price}</span>${thing.name}</p>
    </a>`).join('')
}
</div>`;
  },
};
export default HomeScreen;
