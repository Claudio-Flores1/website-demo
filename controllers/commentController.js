const express = require("express")
const Product = require("../models/product")

const router = express.Router()

// POST
// only loggedIn users can post comments
router.post("/:productId", (req, res) => {
    const productId = req.params.productId

    if (req.session.loggedIn) {
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    Product.findById(productId)
        .then(product => {
            product.comments.push(req.body)
            return product.save()
        })
        .then(product => {
            res.redirect(`/products/${product.id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// DELETE
// only the author of the comment can delete it
router.delete('/delete/:productId/:commId', (req, res) => {
    const productId = req.params.productId 
    const commId = req.params.commId
    Product.findById(productId)
        .then(product => {
            const theComment = product.comments.id(commId)
            console.log('this is the comment that was found', theComment)
            if (req.session.loggedIn) {
                if (theComment.author == req.session.userId) {
                    theComment.remove()
                    product.save()
                    res.redirect(`/products/${product.id}`)
                } else {
                    const err = 'you%20are%20not%20authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                }
            } else {
                const err = 'you%20are%20not%20authorized%20for%20this%20action'
                res.redirect(`/error?error=${err}`)
            }
        })
        .catch(err => res.redirect(`/error?error=${err}`))

})

module.exports = router