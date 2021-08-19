import { update } from "../../api";
import { clearUser, getUserInfo, setUserInfo } from "../../localStorage";
import { catalogHeader, cleanPage, createFooter, hideLoading, showLoading, showMessage } from "../../utils";

const ProfileScreen = {
    render: () => {
        const { name, email } = getUserInfo();
        if(!name && name.length > '1') {
          document.location.hash = '/';
        }
        cleanPage();
        catalogHeader();
        createFooter();
        document.getElementById("dynamic").innerHTML = `<div class="form-container">
        <form id="profile-form">
          <ul class="form-items">
            <li>
              <h1>User Profile</h1>
            </li>
            <li>
            <label for="name">Name</label>
            <input type="name" name="name" id="name" value="${name}" />
          </li>
            <li>
              <label for="email">Email</label>
              <input type="email" name="email" id="email" value="${email}" />
            </li>
            <li>
              <label for="password">Password</label>
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
      `
        return `<div class="allrights"><h3>All rights reserved @whenever</h3></div>`
    },
    after_Render: () =>{
        document.getElementById("signout-button").addEventListener('click', () => {
            clearUser();
            document.location.hash = '/catalog';
        });
        document.getElementById("profile-form").addEventListener('submit', async(e) => {
            e.preventDefault();
            showLoading();
            const data = await update({
              name: document.getElementById("name").value,
              email: document.getElementById("email").value,
              password: document.getElementById("password").value
            })
            hideLoading();
            if (data.error) {
              showMessage(data.error);
            }
            setUserInfo(data);
            document.location.hash = '/catalog'
        })
    },
}

export default ProfileScreen;