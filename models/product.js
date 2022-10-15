///////////////////////////////////////////////////////////
// Our schema and model for the fruit resource
///////////////////////////////////////////////////////////
// this is the old mongoose import
// const mongoose = require("mongoose") // import mongoose
const mongoose = require('./connection')
const User = require('./user')

// here we'll import our commentSchema
const commentSchema = require('./comment')

const { Schema, model } = mongoose

// product schema
const productSchema = new Schema({
    name: String,
    color: String,
    waterProof: Boolean,
    family: String,
    updated: Boolean,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema]
}, { timestamps: true })


const Product = model("Product", productSchema)

//////////////////////////////////////////////////
// Export our model
//////////////////////////////////////////////////
module.exports = Product