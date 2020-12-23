/*
name
legsCount
hasWings
*/
const mongoose = require('mongoose');

const animalSchema = mongoose.Schema({
    name: {type: String, required: true},
    legsCount: {type: Number, required: true},
    hasWings: {type: Boolean, required: true}
})

module.exports = mongoose.model("Post", animalSchema);