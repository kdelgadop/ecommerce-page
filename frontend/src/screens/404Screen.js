import { catalogHeader, cleanPage } from "../../utils";

export const notFoundScreen = {
    render: () => {
        cleanPage();
        if (document.getElementById("hero").classList.contains('header')) {
            document.getElementById("hero").classList.remove('header')
          }
          if (document.getElementById("bottom-section").classList.contains('footer')) {
            document.getElementById("bottom-section").classList.remove('footer')
          }
          document.getElementById("hero").innerHTML = '<h1>404 Page Not found</h1>'
          return `<div><h1>The page you are looking for is not here.</h1></div>`
    }
}