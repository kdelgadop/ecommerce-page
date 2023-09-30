import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);

export const setCartItems = (item) => {
    localStorage.setItem("cart", JSON.stringify(item));
};

export const getCartItems = () => {
    const cart = localStorage.getItem("cart") ? 
    JSON.parse(localStorage.getItem('cart')) :
    [];

    return cart
}

export const clearCartItems = () => localStorage.removeItem('cart')

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

export const getShipping = () => {
    const shipping = localStorage.getItem('shipping') ? JSON.parse(localStorage.getItem('shipping')) : { address: '', city: '', postalCode: '', country: '' };
    return shipping
}
export const setShipping = ( { address= '', city= '', postalCode= '', country= '' } ) => {
    localStorage.setItem('shipping', JSON.stringify({ address, city, postalCode, country }))
}
export const getPayment = () => {
    const payment = localStorage.getItem('payment') ? JSON.parse(localStorage.getItem('payment')) : { paymentMethod: 'paypal' };
    return payment
}
export const setPayment = ( { paymentMethod = 'paypal' } ) => {
    localStorage.setItem('payment', JSON.stringify({ paymentMethod }))
}

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

//CODE FOR DEMO SITE:
/* 
    In the /backend folder, I have POST and GET functions that handle this functionality
    However, this site serves the unique purpouse of being a humorous demo site.
    Therefore, to prevent creating a firebase app with cron jobs to keep the server alive +
    prevent working on security issues, This code here handles the same functionality
    for the purpouse of beind demostrated. 

    I recognize this is NOT the way to handle users and orders in any site 😁
 */

// Users 👥

export const getAllUsers = () => localStorage.getItem('allUsers') ? JSON.parse(localStorage.getItem('allUsers')) : []

export const addUserToAllUsers = (user) => {
    const allUsers = getAllUsers()
    if (user.name && user.email && user.password) {
        const hashedPassword = bcrypt.hashSync(user.password, salt);
        user.password = hashedPassword
        allUsers.push(user)
        localStorage.setItem('allUsers', JSON.stringify(allUsers))
    }
}

export const signInLocalStorage = (signedUser) => {
    const allUsers = getAllUsers()
    if (signedUser.email && signedUser.password) {
        const foundUser = allUsers.find(user => user.email === signedUser.email)
        if (foundUser) {
            if (bcrypt.compareSync(signedUser.password, foundUser.password)) return foundUser
            else return  {error: 'Wrong password'}
        } else return {error: 'User not found'}
    } else return {error: 'User email and/or password missing'}
}

export const updateUser = (user) => {
    const allUsers = getAllUsers()
    const currentUser = getUserInfo()
    if (currentUser.name && currentUser.email && currentUser.password) {
        const updatedUsers = allUsers.filter(user => user.email !== currentUser.email)
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        user.password = hashedPassword
        updatedUsers.push(user)
        localStorage.setItem('allUsers', JSON.stringify(updatedUsers))
        setUserInfo(user)
        return user
    }
}

// Orders 📝

export const getAllOrders = () => {
    const user = getUserInfo()
    if (!user.name) return []
    const orders = localStorage.getItem('allOrders') ? JSON.parse(localStorage.getItem('allOrders')) : []
    return orders.filter(order => order.email === user.email)

}

export const addOrderToAllOrders = (order) => {
    const allOrders = getAllOrders()
    allOrders.push(order)
    localStorage.setItem('allOrders', JSON.stringify(allOrders))
}

// Clean all local storage 🧹
// export const clearAllStorage = () => localStorage.clear();