import axios from "axios";
import { getUserInfo } from "./localStorage";

export const register = async({ name, email, password }) => {
    try {
        const response = await axios({
            url: 'http://localhost:3001/user/register',
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
        return { error: error.response.data.message || error.message };
    }
};

export const signin = async({ email, password }) => {
    try {
        const response = await axios({
            url: 'http://localhost:3001/user/signin',
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
        return { error: error.response.data.message || error.message };
    }
};

export const update = async({ name, email, password }) => {
    try {
        const user = getUserInfo();

        const response = await axios({
            url: `http://localhost:3001/user/${user._id}`,
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
        return { error: error.response.data.message || error.message };
    }
}