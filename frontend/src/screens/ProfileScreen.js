import { getOrders, update } from "../../api";
import { clearUser, getUserInfo, setUserInfo } from "../../localStorage";
import { catalogHeader, cleanPage, createFooter, hideLoading, showLoading, showMessage } from "../../utils";

const ProfileScreen = {
    render: async () => {
      const { name, email } = getUserInfo();
      const orders = await getOrders({ email: email });

      if(!name && name.length > '1') {
        document.location.hash = '/';
      }
      cleanPage();
      catalogHeader();
      createFooter();
      const dynamic = [`<div class="form-container">
      <form id="profile-form">
        <ul class="form-items">
          <li>
            <h1>User Profile</h1>
          </li>
          <li>
          <label for="name">Change Name</label>
          <input type="name" name="name" id="name" value="${name}" />
        </li>
          <li>
            <label for="email">Change Email</label>
            <input type="email" name="email" id="email" value="${email}" />
          </li>
          <li>
            <label for="password">Change Password</label>
            <input type="password" name="password" id="password" />
          </li>
          <li>
            <button type="submit" class="primary">Update</button>
          </li>
          <li>
          <button type="button" id="signout-button">Sign Out</button>
        </li>
        </ul>
      </form>
    </div>
    <div class="cart-list">
    <ul class="cart-list-container">
      <li>
        <h2>Orders</h2>
      </li>`]
      if (orders.length === 0) {
        dynamic.push(`<h3>No orders. Oh no! Buy sumething! Hurry~!</h3>`)
      } else {
          orders.forEach(e => {
            dynamic.push(`<h3>Order #${e._id}</h3><div>Total: $${e.total}</div><br>`)
            e.order.forEach(item => {
              dynamic.push(`
              <li>
              <div class="cart-image">
              <img src="${item.img}" alt="${item.name}">
              </div>
              <div class="cart-name">
                <a href="/#/product/${item._id}">
                  ${item.name},
                </a>
                <br>
                Qty: ${item.qty}
              </div>
              <div class="cart-price">
                ${item.price}
                <b>Address: </b><i>${e.address}</i>
                <b>Status: </b><i>${e.orderStatus}</i>
              </div>
            </li>`)
            });
          });
      }

      document.getElementById("dynamic").innerHTML = dynamic.join('')

      return `<div class="allrights"><h3>All rights reserved @whenever</h3></div>`
    },
    after_Render: () =>{
        document.getElementById("signout-button").addEventListener('click', () => {
            clearUser();
            document.location.hash = '/catalog';
        });
        document.getElementById("profile-form").addEventListener('submit', async(e) => {
            e.preventDefault();
            const { email } = getUserInfo();
            let emailValue = ''
            if (email === document.getElementById("email").value) {
              emailValue = ''
            } else {
              emailValue = document.getElementById("email").value
            }
            showLoading();
            const data = await update({
              name: document.getElementById("name").value,
              email: emailValue,
              password: document.getElementById("password").value
            })
            hideLoading();
            if (data.error) {
              showMessage(data.error);
            }
            else {
              showMessage("Profile Updated")
              setUserInfo(data);
            }
        })
    },
}

export default ProfileScreen;