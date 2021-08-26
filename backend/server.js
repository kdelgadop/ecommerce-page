import express from 'express'
const cors = require('cors')
import bodyParser from 'body-parser'
import userRouter from './userRouter'
import data from './data'
const mongoose = require('mongoose')

const app = express();
const port = 3000;
const port2 = 3001;
const dbURI = process.env.MONGODB_URI

app.use(cors());
app.use(bodyParser.json())
app.use(express.json());
app.use('/user', userRouter)

// mongoose.connect('mongodb://localhost/things', { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true }).then((result) => {
app.listen(port2, ()=> console.log("Served at http://localhost:3001/stuff"))
});

const db = mongoose.connection; 
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Data Base'));

process.on('uncaughtException', (err) => {
    console.log(err);
});

const router = require('./router')

app.use('/stuff', router);
