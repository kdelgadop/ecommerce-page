import { catalogHeader, cleanPage, createFooter, hideLoading, showLoading } from "../../utils";
import { apiUrl } from "../config";
//Hardcoded data in case the api call fails and the website doesn't crash
import stuffJustInCase from "../data/stuff.json";

const CatalogScreen = {
    render: async () => {
        cleanPage();
        catalogHeader();
        createFooter();
        let jsonResponse = []
        try {
            const response = await fetch(`${apiUrl}/stuff`, {
                headers: {
                'Content-Type': 'application/json',
                },
            });
            jsonResponse = await response.json()
        } catch (error) {
            jsonResponse = stuffJustInCase;
        }

    
    const catalog = jsonResponse.filter(x => x.group);
    const dynamic = ['<h1>Catalog</h1>','<ul class="products">']
    catalog.forEach(e => {
        dynamic.push(`
            <li>
                <div class="product">
                        <a href="/#/cart/${e._id}">
                            <img src="${e.img}" alt="${e.name}" class="catalog-img">
                        </a>
                        <div class="product-name">
                            <a href="/#/cart/${e._id}">
                                ${e.name}
                            </a>
                        </div>
                        <div id="mouseover"></div>
                        <div class="product-price">
                            ${e.price}
                        </div>
                </div>
            </li>
        `
        )
    });
    dynamic.push(`</ul>`)
    document.getElementById('dynamic').innerHTML = dynamic.join('')
    createFooter();

    return `<div class="allrights"><h3>All rights reserved @whenever</h3></div>`
    },
}
export default CatalogScreen;