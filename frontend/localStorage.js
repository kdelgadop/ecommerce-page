export const setCartItems = (item) => {
    localStorage.setItem("cart", JSON.stringify(item));
};

export const getCartItems = () => {
    const cart = localStorage.getItem("cart") ? 
    JSON.parse(localStorage.getItem('cart')) :
    [];

    return cart
}

export const setUserInfo = ({
    _id = '',
    name = '',
    email = '',
    password = '',
    token = ''
}) => {
    localStorage.setItem('userInfo', JSON.stringify({
        _id, name, email, password, token
    }))
};

export const getUserInfo = () => localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) :
    { name: '', email: '', password: '' }

export const clearUser = () => localStorage.removeItem('userInfo');

export const cart = {
    setCartItem: (item) => {
        localStorage.setItem("cart", JSON.stringify(item));
    },
    getCartItems: () => {
        const cart = localStorage.getItem("cart") ? 
        JSON.parse(localStorage.getItem("cart")) :
        [];
        return cart
    },
    clearStorage: () => {
        localStorage.clear();
    },
};

export const user = {
    setInfo: ({
        _id = '',
        name = '',
        email = '',
        password = '',
        token = ''
    }) => {
            localStorage.setItem('userInfo', JSON.stringify({ _id, name, email, password, token }))
        },
    clear: () => { localStorage.removeItem('userInfo') },
    getInfo: () => {
        userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : { name: '', email: '', password: '' }
    }
};
