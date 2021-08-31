import { getUserInfo } from "../../localStorage";
import { catalogHeader, cleanPage, createFooter } from "../../utils";

const ThankYouScreen = {
    render: () => {
        cleanPage();
        catalogHeader();
        createFooter();
        const user = getUserInfo();
        document.getElementById('dynamic').innerHTML = `
            <div class="thankyou">
            <div class="pdd">
                <h1>Thank You for your purchase!</h1>
            </div>
            <div class="pdd">
                <h1>Please buy more stuff.</h1>
            </div>
            <div class="pdd">
                <h2>The hunger for stuff will never rest.</h2>
            </div>
            <div class="pdd">
            <h2>To fill the void: </h2>
        </div>
        <div class="pdd">
        ${user.name ? `<button class="primary" id="button"> Click here, ${user.name}</button>` : ' <button> Click here</button>'}
    </div>
            </div>`
        createFooter();

        return `<div class="allrights"><h3>All rights reserved @whenever</h3></div>`
    },
    after_Render: () => {
        document.getElementById('button').addEventListener('click', (e) => {
            document.location.hash = '/catalog'
        })
    }
}

export default ThankYouScreen

