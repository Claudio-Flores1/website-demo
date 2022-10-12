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
    Product.find({})
        .populate("comments.author", "username")
        .then(products => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            // console.log(fruits)
            // this is fine for initial testing
            // res.send(fruits)
            // this the preferred method for APIs
            // res.json({ fruits: fruits })
            // here, we're going to render a page, but we can also send data that we got from the database to that liquid page for rendering
            res.render('products/index', { products, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
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
// only jackets owned by logged in user
// we're going to build another route, that is owner specific, to list all the fruits owned by a certain(logged in) user
router.get('/mine', (req, res) => {
    // find the jackets, by ownership
    Product.find({ owner: req.session.userId })
        // then display the fruits
        .then(products => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId

            // res.status(200).json({ fruits: fruits })
            res.render('products/index', { products, username, loggedIn, userId })
        })
        // or throw an error if there is one
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
// CREATE route -> gives the ability to create new fruits
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
            // res.json({ jacket: jacket })
            res.render('products/show', { product, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// PUT request
// UPDATE route -> updates a specific fruit
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

// DELETE request
// DESTROY route -> finds and deletes a singel resource(fruit)
// router.delete("/:id", (req, res) => {
//     // grab the id from the request
//     const id = req.params.id
//     Jacket.findByIdAndRemove(id)
//         .then(() => {
//             res.sendStatus(204)
//         })
//         .catch(err => res.json(err))
// })

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