import jwt from "jsonwebtoken"
import config from "./config"

export const generateToken = (user) => {
    // console.log(jwt.sign({ _id: user._id, name: user.name, email: user.email, password: user.password}, config.JWT_SECRET));
    jwt.sign({ 
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password
     }, config.JWT_SECRET)
};

export function parseRequestUrl() {
    const urlRequest = document.location.hash.toLowerCase().split('/')
    return {
      page: urlRequest[1],
      id: urlRequest[2]
    }
  };