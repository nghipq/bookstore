const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        maxlength: 50,
        match: /[a-zA-Z]/
    },
    src: {
        type: String,
        require: true,
        trim: true,
        match: /[a-zA-Z]/
    },
    price: {
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        maxlength: 10,
        match: /[0-9]/
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    author: {
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        maxlength: 30,
        match: /[a-zA-Z]/
    },
    categories: {
        type: Array,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('product', productSchema)