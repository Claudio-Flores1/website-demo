const mongoose = require('./connection')
const Product = require('./product')

const db = mongoose.connection

db.on('open', () => {
    const startProducts = [
        { name: "Andessa", color: "Black, Techno, & Atmos", waterProof: true, family: "Whiteline", updated: true, info: "TWaterproof, down insulated jacket for cold days skiing and snowboarding in resort."},
        { name: "Macai", color: "Black, Black Sapphire, Bitters", waterProof: true, family: "Whiteline", updated: true, info: "Warm, down-insulated GORE-TEX jacket for on-piste skiing and snowboarding."},
        { name: "Sabre", color: "Daze, Phenom, Black, & Multiverse", waterProof: true, family: "Whiteline", updated: true, info:"Durable, versatile freeride shell with stormproof GORE-TEX protection."},
        { name: "Alpha SV", color: "Vitality, Orca, & Phenom", waterProof: true, family: "Ascent", updated: false,  info: "Our most durable GORE-TEX PRO shell is designed for severe (SV) alpine conditions. Alpha Series: Climbing and alpine focused systems."},
        { name: "Beta AR", color: "Phenom, Daze, & Lucent", waterProof: true, family: "Essentials", updated: false,  info: "Light, packable, highly versatile GORE-TEX PRO shell with hybrid construction. Beta Series: All round mountain apparel."},
        { name: "Monitor Down Coat", color: "Black Saphire & Black", waterProof: true, family: "Veilance", updated: true,  info: "Iconic Monitor silhouette with down insulation and GORE-TEX weather protection."},
        { name: "Bitters & Black Sapphire", color: "Color", waterProof: true, family: "Everyday", updated: true,  info: "Parka-length Therme providing outstanding warmth and protection in severe weather."},
        { name: "Norvan LD 3", color: "Black Sapphire, Dark Pehnom, & Oracle", waterProof: true, family: "Trail-Running", updated: true,  info: "Lightweight, supportive GORE-TEX shoe for lasting comfort on extended trail runs."},

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