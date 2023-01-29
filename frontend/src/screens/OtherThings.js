import { apiUrl } from "../config";

const OtherThings = {
  render: async () => {
    let array = [];
    const random = Math.floor(Math.random() * 2 + 1);
    try {
      const response = await fetch(`${apiUrl}/stuff`, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const jsonResponse = await response.json();

      if (random === 1) {
        array = jsonResponse.filter(x => x.group === 3);

      } else {
        array = jsonResponse.filter(x => x.group === 4);
      }

      const body = ['<h2 class="section-title">Our other things</h2>'];
      
      array.forEach((other) => {
          body.push(`<article class="product-${other.design} spacing">
                          <img src="${other.img}" alt="" class="product-img">
                          <h3 class="product-title">${other.name}</h3>
                          <p class="product-description">${other.description}</p>
                          <a href="/#/cart/${other._id}" class="btn">Buy Now</a>
                    </article>`);
      });
      return body.join('');


    } catch (error) {
      return  `<div>Error in getting data</div>`
    }
  },
};
export default OtherThings;
