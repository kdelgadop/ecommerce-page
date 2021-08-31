import { getUserInfo } from "./localStorage";

export function parseRequestUrl() {
  const urlRequest = document.location.hash.toLowerCase().split('/')
  return {
    page: urlRequest[1],
    id: urlRequest[2]
  }
};

export const cleanPage = () => {
    document.getElementById("hero").innerHTML = ''
    document.getElementById("dynamic").innerHTML = ''
    document.getElementById("container").innerHTML = `
    <div class="container" id="container">
                    
    </div>`
    const { page } = parseRequestUrl()
    if (page === 'register'){
      document.getElementsByTagName('section')[0].style.padding = '5rem 0'
      document.getElementsByTagName('section')[1].style.padding = '1rem 0'
    } else {
      document.getElementsByTagName('section')[0].style.padding = '1rem 0'
      document.getElementsByTagName('section')[1].style.padding = '1rem 0'
    }
    
    if (document.getElementById("bottom-section").classList.contains('cartScreen')) {
      document.getElementById("bottom-section").classList.remove('cartScreen')
    }
};

export const afterRenderHS = () => {
    const urlRequest = parseRequestUrl();
    const button = document.getElementById("button");
    button.addEventListener('click', () => {
        document.location.hash = `cart/${urlRequest.id}`
    }) 
};

export const showLoading = () => {
    document.getElementById('loading-overlay').classList.add('active');
  };
  
export const hideLoading = () => {
    document.getElementById('loading-overlay').classList.remove('active');
  };

export const showMessage = ((message, callback) =>{
    document.getElementById('message-overlay').innerHTML = `
    <div>
     <div id="message-overlay-content">
      ${message}
      <br>
      <button id="message-overlay-close-button">OK</button>
     </div>
    </div>
    `;
    document.getElementById("message-overlay").classList.add("active");
    document.getElementById("message-overlay-close-button").addEventListener('click', () => {
    document.getElementById("message-overlay").classList.remove("active");
      if(callback){
        callback();
      }
    })
  })

export const catalogHeader = () => {
    const user = getUserInfo()
    const hero = document.getElementById("hero");
    hero.innerHTML = `
        <a href="${user.name ? `/#/profile/${user._id}` : '/#/signin'}" class="signin">
          ${user.name ? `<h3>Welcome ${user.name}</h3>` : '<img src="img/user.png" alt="Sign in" class="header-image"></img>'}
        </a>
        <a href="/#/catalog">
          <h1 id="return" class="brand">Great Stuff .inc</h1>
        </a>
        <a href="/#/cart" class="cart">
          <img src="img/cart.png" alt="Cart" class="header-image">
        </a>
        `;
    hero.classList.add('header');
  }

  export const createFooter = () => {
    document.getElementById("bottom-section").classList.add("footer")
  }

export const CheckoutSteps = {
    render: (props) => `
        <div class="checkoutSteps">
            <div class="${props.step1 ? 'active' : ''}">Signin</div>
            <div class="${props.step2 ? 'active' : ''}">Shipping</div>
            <div class="${props.step3 ? 'active' : ''}">Payment</div>
            <div class="${props.step4 ? 'active' : ''}">Place Order</div>
        </div>
        `,
}