const mongoose = require('./connection')
const User = require('./user')

const commentSchema = require('./comment')

const { Schema, model } = mongoose

const productSchema = new Schema({
    name: String,
    color: String,
    waterProof: Boolean,
    family: String,
    updated: Boolean,
    info: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema]
}, { timestamps: true })

const Product = model("Product", productSchema)

module.exports = Product