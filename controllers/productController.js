const express = require("express")
const Product = require("../models/product")

const router = express.Router()


router.get("/", (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
    const productFamily = req.query.family
    if (productFamily) {
         Product.find({ family: productFamily})
         .populate("comments.author", "username")
         .then(products => {
             res.render('products/products', { products, username, loggedIn, userId })
         })
         .catch(err => res.redirect(`/error?error=${err}`))
    } else {
        Product.distinct("family")
            .then(families => {
                res.render('products/families', { families, username, loggedIn, userId })
            })
            .catch(err => res.redirect(`/error?error=${err}`)) 
    }
      
})


router.post("/", (req, res) => {
    req.body.updated = req.body.updated === 'on' ? true : false
    req.body.waterProof = req.body.waterProof === 'on' ? true : false
    console.log("req.body initially", req.body)
    console.log('req.body after changing checkbox value', req.body)
    Product.create(req.body)
    .then(data => {
        res.json(data)
    })
})



// GET for new fruit
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    res.render('products/new', { username, loggedIn, userId })
})

// GET request
router.get('/mine', (req, res) => {
    Product.find({ owner: req.session.userId })
        .then(products => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId

            res.render('products/index', { products, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// GET request to show the update page
router.get("/edit/:id", (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    const productId = req.params.id

    Product.findById(productId)
        .then(product => {
            res.render('products/edit', { product, username, loggedIn, userId })
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
})

// POST request
// CREATE route -> gives the ability to create new products
router.post("/", (req, res) => {
    req.body.updated = req.body.updated === 'on' ? true : false
    req.body.waterProof = req.body.waterProof === 'on' ? true : false
    console.log("req.body initially", req.body)
    console.log('req.body after changing checkbox value', req.body)
    Product.create(req.body)
    .then(data => {
        res.json(data)
    })
})

// SHOW request
// READ route -> finds and displays a single resource
router.get("/:id", (req, res) => {
    const id = req.params.id
    Product.findById(id)
        .populate("comments.author", "username")
        .then(product => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            res.render('products/show', { product, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// PUT request
// UPDATE route -> updates a specific product
router.put("/:id", (req, res) => {
    console.log("req.body initially", req.body)
    const id = req.params.id

    req.body.waterProof = req.body.waterProof === 'on' ? true : false
    console.log('req.body after changing checkbox value', req.body)
    Product.findById(id)
        .then(product => {
            if (product.owner == req.session.userId) {
                res.sendStatus(204)
                return product.updateOne(req.body)
            } else {
                res.sendStatus(401)
            }
        })
        .then(() => {
            res.redirect(`/products/${id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// DELETE REQUEST
// DELETE route -> deletes a route
router.delete('/:id', (req, res) => {
    const productId = req.params.id

    Product.findByIdAndRemove(productId)
        .then(product => {
            res.redirect('/products')
        })
        .catch(error => {
            res.redirect(`/error?error=${err}`)
        })
})

module.exports = router

