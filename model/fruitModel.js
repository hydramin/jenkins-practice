const mongoose = require('mongoose');

const fruitSchema = mongoose.Schema({
    name: {type: String, required: true}
})

const fruitModel = mongoose.model('Fruit', fruitSchema);

module.exports = fruitModel;