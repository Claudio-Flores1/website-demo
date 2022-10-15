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
        { name: "Andessa", color: "Color", waterProof: true, family: "Whiteline", updated: true},
        { name: "Macai", color: "Color", waterProof: true, family: "Whiteline", updated: true},
        { name: "Sabre", color: "Color", waterProof: true, family: "Whiteline", updated: true},
        { name: "Alpha SV", color: "Color", waterProof: true, family: "Ascent", updated: false},
        { name: "Beta AR", color: "Color", waterProof: true, family: "Essentials", updated: false},
        { name: "Monitor Down Coat", color: "Color", waterProof: true, family: "Veilance", updated: true},
        { name: "Therme", color: "Color", waterProof: true, family: "Everyday", updated: true},
        { name: "Norvan LD 3", color: "Color", waterProof: true, family: "Trail-Running", updated: true},

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