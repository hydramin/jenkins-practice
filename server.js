const express = require('express');
const body_parser = require('body-parser');
const animalRouter = require('./animal');
const mongoose = require('mongoose');
const Fruit = require('./model/fruitModel')

const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const host = process.env.MONGO_DB_HOST | 'localhost:27017';

const connection_string = 'mongodb://'
    .concat(username).concat(':')
    .concat(password).concat('@/mydb');

console.log(connection_string);

mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true, authSource:"admin" })
    .then(() => {
        console.log("Connection Successful");
    })
    .catch(err => {
        console.error("Connection unsuccessful");
    });

const app = express();

app.use(body_parser.urlencoded({extended:false}));
app.use(express.json());
app.set("view engine", "pug");
app.set("views","view");

app.use('/animal', animalRouter)

app.get('/fruit', (req,res, next) => {    
    Fruit.find((err, fruits) => {
        if(err) {
            console.error(err);
            res.render('fruit', {f: 'error: no fruits fetched'})
        }
        res.render('fruit', {f: fruits})    
    })
})

app.post("/fruit",(req,res,next) => {

    let postFruit = new Fruit(req.body)
    postFruit.save().then(frt => {
        res.render('new_fruit', {f: frt})
    }).catch(err => {
        console.error(err);
        res.render('new_fruit', {f: {name: 'error fetching fruits'}})
    })

})

app.get('/', (req,res, next) => {
    res.render('home')
})


app.listen(3000, ()=> {
    console.log('running on localhost:3000')
})