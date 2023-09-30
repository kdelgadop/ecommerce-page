import { register } from "../../api";
import { setUserInfo, user } from "../../localStorage";
import { catalogHeader, cleanPage, createFooter, hideLoading, showLoading, showMessage } from "../../utils"

const RegisterScreen = {
    render: () => {
        showLoading();
        cleanPage();
        catalogHeader();
        createFooter();

        const dynamic = [
       `
        <div class="form-container">
          <form id="register-form">
            <ul class="form-items">
              <li>
                <h1 class="center">Register</h1>
              </li>
              <li>
              <label for="name">Name</label>
              <input type="name" name="name" id="name" />
            </li>
              <li>
                <label for="email">Email</label>
                <input type="email" name="email" id="email" />
              </li>
              <li>
                <label for="password">Password</label>
                <input type="password" name="password" id="password" />
              </li>
              <li>
              <label for="password">Confirm Password</label>
              <input type="password" name="password" id="password2" />
            </li>
              <li>
                <button type="submit" class="primary">Sign in</button>
              </li>
              <li>
                <div>
                  Have an account?
                  <a href="/#/signin"> Sign In</a>
                </div>
              </li>
            </ul>
          </form>
        </div>
        `]

        document.getElementById('dynamic').innerHTML = dynamic;
        return `<div class="allrights"><h3>All rights reserved @whenever</h3></div>`
    },
    after_Render: () => {
        document.getElementById('register-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            showLoading();
            const data = await register({ 
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
             })
             hideLoading();
            if (data.error) {
                showMessage(data.error)
            } else {
                setUserInfo(data)
                // user.setInfo(data)
                document.location.hash = '/catalog'
            }
        })
    }

}
export default RegisterScreen