import { getUserInfo, setPayment } from "../../localStorage";
import { catalogHeader, CheckoutSteps, cleanPage, createFooter } from "../../utils";


const PaymentScreen = {
    render: () => {
        cleanPage();
        catalogHeader();
        createFooter();
        const dynamic = document.getElementById("dynamic")
      if(getUserInfo.name.length > '1' && getUserInfo.name !== '' && getUserInfo) {
        document.location.hash = '/signin'
      }
      dynamic.innerHTML = `
      ${CheckoutSteps.render({ step1: true, step2: true, step3: true })}
        <div class="form-container">
          <form id="payment-form">
            <ul class="form-items paymentf">
                <li>
                    <h1>Payment</h1>
                </li>
                <li>
                  <div>
                  <label class="checkbox">
                    <input type="radio" name="payment-method" id="paypal" value="Paypal" checked /> 
                    <label for="paypal">
                        <img src="img/paypal.png" alt="Paypal Logo" class="payment-img">
                      </label>
                      <span class="checkmark"></span> 
                    </label>
                    </div>
                </li>
                <li>
                <div>
                <label class="checkbox">
                    <input class="checkbox" type="radio" name="payment-method" id="stripe" value="Stripe" />
                    
                    <label for="stripe">
                        <img src="img/stripe.png" alt="Paypal Logo" class="payment-img">
                      </label>
                      <span class="checkmark"></span>
                  </label>
                </div>
              </li>
                    <button type="submit" class="primary" id="sp">Continue</button>
              </li>
            </ul>
          </form>
        </div>`
      return `<div class="allrights"><h3>All rights reserved @whenever</h3></div>`
    },
    after_Render: () => {
        document.getElementById("payment-form").addEventListener('submit', async (e)=> {
          e.preventDefault();
          setPayment({ 
              paymentMethod: document.querySelector('input[name="payment-method"]:checked').value,
           });
           document.location.hash = '/placeorder';
        });
      },
};

export default PaymentScreen;