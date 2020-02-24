const router = require('express').Router()

const productRouter = require('./api/product.route')

router.get('/', (req, res) => {
    res.send("Bookstore server")
})

router.use('/product', productRouter)

module.exports = router