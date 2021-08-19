import { getCartItems, setCartItems } from "../../localStorage";
import { catalogHeader, cleanPage, createFooter, parseRequestUrl } from "../../utils";


const addToCart = async (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const itemExist = cartItems.find(x => x._id === item._id)
    if (itemExist) {
        if (forceUpdate) {
            cartItems = cartItems.map(x => x._id === itemExist._id ? item : x)};
    } else {
        cartItems.push(item);
    }
    setCartItems(cartItems);
    if(forceUpdate) {
        const container = document.getElementById('container');
        container.innerHTML = await CartScreen.render();
        CartScreen.after_Render();
    }
};

const deleteItem = async (id) => {
    let cartItems = getCartItems();
    const container = document.getElementById('container');
    setCartItems(cartItems.filter(x => x._id !== id))
    if(id === parseRequestUrl().id){
        document.location.hash = '/cart';

        container.innerHTML = await CartScreen.render();
        CartScreen.after_Render()
    } else {
        container.innerHTML = await CartScreen.render();
        CartScreen.after_Render()
    }
}

const CartScreen = {
    render: async () => {
        const url = parseRequestUrl()
        if(url.id) {
            const response = await fetch("http://localhost:3001/stuff", {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            const jsonResponse = await response.json();
            const itemToCart = jsonResponse.find(x => x._id === url.id)
            addToCart({ 
                _id: itemToCart._id,
                price: itemToCart.price,
                name: itemToCart.name,
                img: itemToCart.img,
                countInStock: itemToCart.countInStock,
                priceNum: itemToCart.priceNum,
                qty: 1
             })
        }
        cleanPage();
        catalogHeader();
        createFooter();

        let dynamic = [`
        <div class="cart-list">
        <ul class="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
        `];

        let cartItems = getCartItems()
        if(cartItems.length === 0) {
            dynamic.push(`<div>Oh no, your cart is empty! Buy Something! Hurry!</div>`)
            document.getElementById("dynamic").innerHTML = dynamic.join('\n')
            return `
              <div class="cart-action">
                <h3>Subtotal 0 items:
                $0 Oh the humanity!</h3>
            <a id="checkout-button" class="btn">
              Proceed to checkout
            </a>
          </div>`
        } else {
            cartItems.forEach(e => {

                const qtyArray = [...Array(e.countInStock).keys()].map(x => e.qty === x+1 
                    ? `<option selected value="${x+1}">${x+1}</option>` 
                    : `<option value="${x+1}">${x+1}</option>`)

                dynamic.push(`
                <li>
                  <div class="cart-image">
                    <img src="${e.img}" alt="${e.name}">
                  </div>
                  <div class="cart-name">
                    <a href="/#/product/${e._id}">
                      ${e.name}
                    </a>
                  </div>
                  <div class="qty-delete">
                    Qty: <select class="qty-selector" id="${e._id}">
                    ${qtyArray}
                  </select>
                  <button type="button" class="delete-button btn" id="${e._id}">
                    Delete
                  </button>
                  </div>
                  <div class="cart-price">
                    ${e.price}
                  </div>
                </li>`
                )});

        dynamic.push('</ul></div>');
        document.getElementById("dynamic").innerHTML = dynamic.join('\n')

            return `
            <div class="cart-action">
              <h3 class="subtotal">Subtotal ${cartItems.reduce((a, c) => a + c.qty, 0)} items:
                $${Math.round(((cartItems.reduce((a, c) => a + c.priceNum*c.qty, 0)) + Number.EPSILON) * 100) / 100}</h3>
              <a href="#/signin" id="checkout-button" class="btn">
                Proceed to checkout
              </a>
            </div>`
        }
    },
    after_Render: () => {
        const hs = document.getElementById('return');
        hs.addEventListener('click', () => {
            document.location.hash = '/catalog'
        })
        const remove = document.getElementsByClassName("delete-button")
        Array.from(remove).forEach(removeButton => {
            removeButton.addEventListener('click', () => {
                deleteItem(removeButton.id)
            })
        }) 
        const qty = document.getElementsByClassName("qty-selector")
            Array.from(qty).forEach(e => {
                e.addEventListener('change', (x) => {
                    const cartItems = getCartItems();
                    const item = cartItems.find(y => y._id === e.id)
                    addToCart({ ...item, qty: Number(e.value) }, true);
                })
            });
        document.getElementById("bottom-section").classList.add('cartScreen')
    }
}

export default CartScreen