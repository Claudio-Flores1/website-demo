///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Product = require('./product')

///////////////////////////////////////
// Seed Script code
///////////////////////////////////////
const db = mongoose.connection

db.on('open', () => {
    const startProducts = [
        { name: "Alpha SV", color: "24k", waterProof: true, quantity: 2 },
        { name: "Beta SV", color: "kingfisher", waterProof: true, quantity: 8 },
        { name: "Gamma MX", color: "black", waterProof: false, quantity: 1 },
        { name: "Beta ", color: "offlime", waterProof: true, quantity: 5 },
        { name: "Atom LT", color: "timelapse", waterProof: false, quantity: 7 },
    ]

    Product.deleteMany({})
        .then(deletedProducts => {
            console.log('this is what .deleteMany returns', deletedProducts)

            Product.create(startProducts)
                .then(data => {
                    console.log('here are the newly created products', data)
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            db.close()
        })
})