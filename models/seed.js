const mongoose = require('./connection')
const Product = require('./product')

const db = mongoose.connection

db.on('open', () => {
    const startProducts = [
        { name: "Andessa", color: "Black, Techno, & Atmos", waterProof: true, family: "Whiteline", updated: true, info: "TWaterproof, down insulated jacket for cold days skiing and snowboarding in resort."},
        { name: "Macai", color: "Black, Black Saphire, Bitters", waterProof: true, family: "Whiteline", updated: true, info: "Warm, down-insulated GORE-TEX jacket for on-piste skiing and snowboarding."},
        { name: "Sabre", color: "Daze, Phenom, Black, & Multiverse", waterProof: true, family: "Whiteline", updated: true, info:"Durable, versatile freeride shell with stormproof GORE-TEX protection."},
        { name: "Alpha SV", color: "Color", waterProof: true, family: "Ascent", updated: false, },
        { name: "Beta AR", color: "Color", waterProof: true, family: "Essentials", updated: false, },
        { name: "Monitor Down Coat", color: "Color", waterProof: true, family: "Veilance", updated: true, },
        { name: "Therme", color: "Color", waterProof: true, family: "Everyday", updated: true, },
        { name: "Norvan LD 3", color: "Color", waterProof: true, family: "Trail-Running", updated: true, },

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