////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Product = require("../models/product")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
////////////////////////////////////////////

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

// GET for new fruit
// renders the form to create a jacket
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    res.render('products/new', { username, loggedIn, userId })
})

// GET request
// only products owned by logged in user
// we're going to build another route, that is owner specific, to list all the fruits owned by a certain(logged in) user
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
    req.body.waterProof = req.body.waterProof === 'on' ? true : false
    req.body.owner = req.session.userId
    console.log('the product from the form', req.body)
    Product.create(req.body)
        .then(product => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            res.redirect('/products')
        })
        .catch(err => res.redirect(`/error?error=${err}`))
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


//UPDATED ROUT - DOESN'T WORK//

router.put("/:id", (req, res) => {
    console.log("req.body initially", req.body)
    const id = req.params.id

    req.body.updated = req.body.updated === 'on' ? true : false
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

//////////////////////////////////////////////////////////////////////////


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

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router