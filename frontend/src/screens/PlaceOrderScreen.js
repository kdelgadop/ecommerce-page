import { setOrder } from "../../api";
import { clearCartItems, getCartItems, getPayment, getShipping, getUserInfo } from "../../localStorage";
import { catalogHeader, CheckoutSteps, cleanPage, createFooter, hideLoading, showLoading, showMessage } from "../../utils";

const convertCartToOrder = () => {
    const orderItems = getCartItems();
    if(orderItems.length === 0) {
        document.location.hash = '/cart'
    }
    const shipping = getShipping();
    if(!shipping.address) {
        document.location.hash = '/shipping';
    }
    const payment = getPayment();
    if(!payment.paymentMethod) {
        document.location.hash = '/payment'
    }
    const itemPrice = orderItems.reduce((a, c) => a+c.priceNum*c.qty, 0)
    const shippingPrice = itemPrice > 100 ? 0 : 10;
    const taxPrice = Math.round(0.15 * itemPrice * 100) / 100
    const totalPrice = itemPrice + shippingPrice + taxPrice
    return {
        orderItems,
        shipping, 
        payment,
        itemPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    }
}

const PlaceOrderScreen = {
    render: () => {
        cleanPage();
        catalogHeader();
        createFooter();
        const { orderItems, shipping, payment, itemPrice, shippingPrice, taxPrice, totalPrice} = convertCartToOrder();
        document.getElementById("dynamic").innerHTML = `
        <div>
        ${CheckoutSteps.render({ step1: true, step2: true, step3: true, step4: true })}
          <div class="order">
            <div>
            <h2>Shipping</h2>
              <div>
                ${shipping.address}, ${shipping.city}, ${shipping.postalCode},
                ${shipping.country}
              </div>
              <div>
                <h2>Payment</h2>
                  <div>
                    Payment Method: ${payment.paymentMethod}
                  </div>
                  <div>
                    <ul class="cart-list-container">
                      <li>
                        <h2>Shopping Cart</h2>
                        <div>Price</div>
                      </li>
                        ${orderItems.map(item => `
                        <li>
                          <div class="cart-image">
                            <img src="${item.img}" alt="item.name" />
                          </div>
                          <div class="cart-item">
                            <div>
                              <a href="/#/product/${item._id}">${item.name}</a>
                            </div>
                            <div>
                                Qty: ${item.qty}
                            </div>
                          </div>
                          <div class="cart-price">
                            ${item.price}
                          </div>
                        </li>`).join('')}
                    </ul>
                  </div>
              </div>
        `
        return ` <div class="order-action">
        <ul>
          <li><h2>Order Summary</h2></li>
          <li><div>Items</div><div>$${itemPrice}</div></li>
          <li><div>Shipping</div><div>$${shippingPrice}</div></li>
          <li><div>Tax</div><div>$${taxPrice}</div></li>
          <li><div>Order Total</div><div>$${totalPrice}</div></li>
          <li><button class="primary fw btn" id="place-order">Place Order </button></li>
        </ul>
      </div>
    </div>
  </div>`
    },
    after_Render: async () => {
        document.getElementById('place-order').addEventListener('click', async (e) => {
            e.preventDefault();
            showLoading();
            const { orderItems, shipping, totalPrice } = convertCartToOrder();
            console.log(totalPrice)
            const address = `${shipping.address}, ${shipping.city}, ${shipping.postalCode},
            ${shipping.country}`
            const { name, email } = getUserInfo();
            const data = await setOrder({
                name: name,
                address: address,
                order: orderItems,
                orderStatus: "Order sent.",
                email: email,
                total: totalPrice
             })
             hideLoading();
            if (data.error) {
                showMessage(data.error)
            }
            else {
                clearCartItems();
                document.location.hash = '/thankyou'
            }
        })
    }
}

export default PlaceOrderScreen;