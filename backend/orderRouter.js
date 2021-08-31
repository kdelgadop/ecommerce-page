import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from 'bcrypt'
import Order from "./models/orderModel";
import jwt from "jsonwebtoken"
import config from "./config"

const orderRouter = express.Router();

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
orderRouter.post('/send', authentication, expressAsyncHandler(async ( req, res ) => {
    try {
        const order = new Order({ 
            name: req.body.name,
            address: req.body.address,
            order: req.body.order,
            orderStatus: "Verifying order.",
            email: req.body.email,
            total: req.body.total
         })
         const newOrder = await order.save()
         if(!newOrder) {
            res.status(401).send({ message: 'Invalid Order Data.' })
         } else {
             res.send({
                 _id: newOrder._id,
                 name: newOrder.name,
                 address: newOrder.address,
                 order: newOrder.order,
                 email: newOrder.email,
                 total: newOrder.total,
                 token: jwt.sign({ _id: newOrder._id, name: newOrder.name, address: newOrder.address, order: newOrder.order, orderStatus: newOrder.orderStatus, email: newOrder.email, total: newOrder.total }, process.env.JWT_SECRET)
             })
         }
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));

orderRouter.post('/get', async (req, res) => {
    try {
      const orders = await Order.find({
        email: req.body.email
      });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default orderRouter;
