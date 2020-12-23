const express = require('express');
const request = require('request');
const router = express.Router();
const Post = require('./model/animalModel')

const base = 'http://localhost:8080/animal';
const f5 = '/firstFive';
const all = '/all';
const add = '/add';


router.get(f5, (req, res, next) => {
    Post.find({},null,{limit: 5},(err,doc)=> {
        if(err) {
            console.error(err);
            res.render('animal',{animals: {name:'error',legsCount:'error',hasWings:'error'}})
        }
        res.render('animal',{animals: doc})
    })
})

router.get(all, (req, res, next) => {
    Post.find((err, docs) => {
        if(err) {
            console.error(err);
            res.render('animal',{animals: {name:'error',legsCount:'error',hasWings:'error'}})
        }
        res.render('animal',{animals: docs})
    })
})

router.post(add, (req, res, next) => {   

    let post = new Post(req.body);

    post.save().then((animal) => {
        res.render("animal", {animal: animal})
    });
})

// router.get(f5, (req, res, next) => {
//     const url = base+f5;
//     console.log("request sent!! firstFive")
//     request.get(url,{json: true}, (err, resp, body) => {
//         if(err) {
//             console.error(err);
//             res.json({error: err});
//         }
//         res.render("animal", {animals: body})
//     })
// })

// router.get(all, (req, res, next) => {
//     const url = base+all;
//     request.get(url,{json: true}, (err, resp, body) => {
//         if(err) {
//             res.json({error: err});
//         }
//         res.render("animal", {animals: body})
//     })
// })

// router.post('/add', (req, res, next) => {   
//     const options = {
//         url: base+add,
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(req.body)
//     }
    
//     request.post(options, (err, resp, body) => {
//         if(err) {
//             res.json({error: err})
//         }
//         res.render("animal", {animal: req.body})
//     })    
// })

module.exports = router;