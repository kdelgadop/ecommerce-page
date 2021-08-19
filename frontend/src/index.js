import { hideLoading, parseRequestUrl, showLoading } from '../utils.js';
import { notFoundScreen } from './screens/404Screen.js'; 
import CartScreen from './screens/CartScreen.js';
import CatalogScreen from './screens/CatalogScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import OtherThings from './screens/OtherThings.js';
import ProfileScreen from './screens/ProfileScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import SigninScreen from './screens/SigninScreen.js';

const homeRouter = async () => {
  if (document.getElementById("hero").classList.contains('header')) {
    document.getElementById("hero").classList.remove('header')
  }
  if (document.getElementById("bottom-section").classList.contains('footer')) {
    document.getElementById("bottom-section").classList.remove('footer')
  }
  if (document.getElementById("bottom-section").classList.contains('cartScreen')) {
    document.getElementById("bottom-section").classList.remove('cartScreen')
  }
  document.getElementsByTagName('section')[0].style.padding = '112px 0'
  document.getElementsByTagName('section')[1].style.padding = '112px 0'
  document.getElementById("hero").innerHTML = `
    <div class="container spacing">
      <h1 class="primary-title">The best things in life are things</h1>
        <p>And no, they're not free.</p>
      <a href="#/catalog" class="btn">See more stuff</a>
  </div>
  `
  document.getElementById("bottom-section").innerHTML =`
  <div class="container" id="container"></div>`

  const featured = document.getElementById('dynamic');
  const other = document.getElementById('container');
  featured.innerHTML = await HomeScreen.render();
  other.innerHTML = await OtherThings.render();
};

const routes = {
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/catalog': CatalogScreen,
  '/profile/:id': ProfileScreen
}

const router = async () => {
  if (document.getElementById("bottom-section").classList.contains('cartScreen')) {
    document.getElementById("bottom-section").classList.remove('cartScreen')
  }
  const url = parseRequestUrl();
  const parseUrl = (url.page ? `/${url.page}` : '/') + (url.id ? `/:id` : '')

  if(parseUrl === '/' && parseUrl !== '/catalog') {
    showLoading();
    homeRouter();
    hideLoading();
    return
  } else { 
    const screen = routes[parseUrl] ? routes[parseUrl] : notFoundScreen;
    const container = document.getElementById('container');

    showLoading();
    container.innerHTML = await screen.render();
    if(screen.after_Render){
      await screen.after_Render();
    }
    hideLoading();
  }
}
window.addEventListener('load', router);
window.addEventListener('hashchange', router)
