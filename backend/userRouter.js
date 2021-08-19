import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from 'bcrypt'
import User from "./models/userModel";
import jwt from "jsonwebtoken"
import config from "./config"

const userRouter = express.Router();

// Middlewares
const authentication = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if(!bearerToken) {
        res.status(401).send({ message: 'Token is not supplied' })
    } else { 
        const token = bearerToken.slice(7, bearerToken.length)
        // const token = bearerToken.split(' ')[1]
        jwt.verify(token, config.JWT_SECRET, (error, data) => {
            if (error) {
                res.status(403).send({ message: 'Invalid Token' });
            } else {
                req.user = data;
                next();
            }
        })    
   }
};

// Router routes
userRouter.post('/register', expressAsyncHandler(async ( req, res ) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({ 
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
         })
         const newUser = await user.save()
         if(!newUser) {
            res.status(401).send({ message: 'Invalid User Data' })
         } else {
             res.send({
                 _id: newUser._id,
                 name: newUser.name,
                 email: newUser.email,
                 password: newUser.password,
                 token: jwt.sign({ _id: newUser._id, name: newUser.name, email: newUser.email, password: newUser.password}, process.env.JWT_SECRET)
             })
         }
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));

userRouter.post('/signin', expressAsyncHandler(async ( req, res ) => {
    const signInUser = await User.findOne({ 
        email: req.body.email
     });
     if(!signInUser) {
         res.status(401).send({ message: 'Invalid Email' })
     } else {
         try {
             if(await bcrypt.compare(req.body.password, signInUser.password)) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                res.send({
                    _id: signInUser._id,
                    name: signInUser.name,
                    email: signInUser.email,
                    password: hashedPassword,
                    token: jwt.sign({ _id: signInUser._id, name: signInUser.name, email: signInUser.email, password: signInUser.password}, config.JWT_SECRET)
                })
            } else {
                res.status(401).send({ message: 'Invalid Password' })
            }
        } catch (error) {
             res.status(500).send()
         }
     }
}));

userRouter.put('/:id', authentication, expressAsyncHandler(async ( req, res ) => {

    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).send({ message: 'User Not Found' });
    try {
        let hashedPassword = null;
        if(req.body.password) hashedPassword = await bcrypt.hash(req.body.password, 10);

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = hashedPassword || user.password;

        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            password: updatedUser.password,
            token: jwt.sign({ _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, password: updatedUser.password}, config.JWT_SECRET)
        })
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));


export default userRouter;
