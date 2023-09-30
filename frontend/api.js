import axios from "axios";
import { addOrderToAllOrders, addUserToAllUsers, getAllOrders, getUserInfo, setUserInfo, signInLocalStorage, updateUser } from "./localStorage";
import { apiUrl } from "./src/config";

export const register = async({ name, email, password }) => {
    try {
        const response = await axios({
            url: `${apiUrl}/user/register`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                name,
                email,
                password
            }
        })
        if(response.statusText !== 'OK') {
            throw new Error(esponse.data.message)
        }
        return response.data
    } catch (error) {
        console.log(error);
        if (!window.location.host.includes('local')) {
            const newUser = {
                _id: Math.floor((1 + Math.random()) * 0x10000).toString(8),
                name,
                email,
                password
            }
            addUserToAllUsers(newUser)
            setUserInfo(newUser)
            return getUserInfo()
        }
        return { error: error.response.data.message || error.message };
    }
};

export const signin = async({ email, password }) => {
    try {
        const response = await axios({
            url: `${apiUrl}/user/signin`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                email,
                password
            }
        })
        if(response.statusText !== 'OK'){
            console.log(response.data.message);
            throw new Error(response.data.message)
        }
        return response.data
    } catch (error) {
        console.log(error);
       if (!window.location.host.includes('local')) {
        const foundUser = signInLocalStorage({ email, password })
        return foundUser
       }
        return { error: error.response.data.message || error.message };
    }
};

export const update = async({ name, email, password }) => {
    try {
        const user = getUserInfo();

        const response = await axios({
            url: `${apiUrl}/user/${user._id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            data: {
                name,
                email,
                password
            }
        })
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message)
        }
        return response.data
    } catch (error) {
        console.log(error);
       if (!window.location.host.includes('local')) {
        const user = getUserInfo()
        const updatedUser = {
            _id: user._id,
            name: name || user.name,
            email: email || user.email,
            password: password || user.password
        }
        updateUser(updatedUser)
        return updatedUser
       }
        return { error: error.response.data.message || error.message };
    }
};

export const setOrder = async({ name, address, order, orderStatus, email, total }) => {
    try {
        const user = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/orders/send`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            data: {
                name,
                address,
                order,
                orderStatus,
                email,
                total
            }
        })
        if(response.statusText !== 'OK') {
            throw new Error(response.data.message)
        }
        return response.data
    } catch (error) {
        console.log(error);
        if (!window.location.host.includes('local')) {
            const newOrder = {
                _id: Math.floor((1 + Math.random()) * 0x10000).toString(8),
                name,
                address,
                order,
                orderStatus,
                email,
                total
            }
            addOrderToAllOrders(newOrder)
            return newOrder
        }

        return { error: error.response.data.message || error.message };
    }
};

export const getOrders = async({ email }) => {
    try {
        const response = await axios({
            url: `${apiUrl}/orders/get`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                email
            }
        })
        if(response.statusText !== 'OK'){
            console.log(response.data.message);
            throw new Error(response.data.message)
        }
        return response.data
    } catch (error) {
        console.log(error);
        if (!window.location.host.includes('local')) {
            return getAllOrders()
        }
        return { error: error.response.data.message || error.message };
    }
};