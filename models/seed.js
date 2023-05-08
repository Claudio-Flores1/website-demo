const mongoose = require('./connection')
const Product = require('./product')

const db = mongoose.connection

db.on('open', () => {
    const startProducts = [
        { name: "Andessa", color: "Black", brand: "Arc'teryx", family: "Jackets", price: "$1", info: "Heavyweight winter parka for Women. Down Insulated and water proof", condition: "lightly worn"},
        { name: "Better Sweater", color: "white", brand: "Patagonia", family: "Sweaters", price: "$13", info: "Synthetic sweates for the wall street bros", condition: "barely used"},
        { name: "Mountain Light Boots", color: "Brown Leather", brand: "Danner", family: "Footwear", price: "$231", info: "It's THE HIKING BOOT, this boot is the granddaddy of them all.", condition: "minor wear and tear"},
        { name: "Cobra 65 Pack", color: "White", brand: "The North Face", family: "Packs", price: "$134", info: "65L Backpack made to tackle the harshest conditions nature can throw at you.", condition: "used", picture: "https://media.istockphoto.com/id/931042070/vector/website-construction-line-style-illustration.jpg?s=612x612&w=is&k=20&c=nUuYoZxobPuitaSBN0AtOTTz_CIevEiszvFFdjQNhXs="},
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