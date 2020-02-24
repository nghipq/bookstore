const router = require('express').Router()
const ProductController = require('../../controllers/products.controller')

router.get('/all', ProductController.allProducts)
router.post('/create', ProductController.createProduct);

module.exports = router