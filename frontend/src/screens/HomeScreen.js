const HomeScreen = {
  render: async () => {
    let array = [];
    let random = Math.floor(Math.random() * 2 +1);

    try {
      const response = await fetch("http://localhost:3001/stuff", {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonResponse = await response.json();

      if (random === 1) {
        array = jsonResponse.filter(x => x.group === 1);
      } else {
        array = jsonResponse.filter(x => x.group === 2);
      }

    } catch (error) {
      return  `<div>Error in getting data</div>`
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
