import { getUserInfo, getShipping, setShipping } from "../../localStorage";
import { catalogHeader, CheckoutSteps, cleanPage, createFooter, showMessage } from "../../utils";


const ShippingScreen = {
    render: () => {
        cleanPage();
        catalogHeader();
        createFooter();
        const { name } = getUserInfo();
        if(!(name.length > 1 && name !== '' && getUserInfo())) {
          document.location.hash = '/signin'
        }
        const { address, city, postalCode, country } = getShipping()
        // if(address && city && postalCode && country) {
        //     document.location.hash = '/payment'
        // }
        const dynamic = document.getElementById("dynamic")
        dynamic.innerHTML = `
        ${CheckoutSteps.render({ step1: true, step2: true })}
        <div class="form-container">
          <form id="shipping-form">
            <ul class="form-items">
                <li>
                    <h1>Shipping</h1>
                </li>
                <li>
                    <label for="address">Address</label>
                    <input type="text" name="address" id="address" value="${address}" />
                </li>
                <li>
                    <label for="city">City</label>
                    <input type="text" name="city" id="city" value="${city}" />
                </li>
                <li>
                    <label for="postalCode">Postal Code</label>
                    <input type="text" name="postalCode" id="postalCode" value="${postalCode}" />
                </li>
                <li>
                    <label for="country">Country</label>
                    <input type="text" name="country" id="country" value="${country}" />
                </li>
                    <button type="submit" class="primary">Continue</button>
                </li>
            </ul>
          </form>
        </div>`
        return `<div class="allrights"><h3>All rights reserved @whenever</h3></div>`
        },

    after_Render: () => {
        document.getElementById("shipping-form").addEventListener('submit', (e)=> {
            e.preventDefault()
            if (document.getElementById("address").value === '' || document.getElementById("city").value === '' || document.getElementById("postalCode").value === '' || document.getElementById("country").value === '') {
                showMessage('Some fields are empty.')
                document.location.hash = '/shipping'
            }
            else {
                setShipping({ 
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                postalCode: document.getElementById("postalCode").value,
                country: document.getElementById("country").value
            })
            document.location.hash = '/payment';
        }
        });
      },
};

export default ShippingScreen;