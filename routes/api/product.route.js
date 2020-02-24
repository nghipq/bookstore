const router = require('express').Router()
const ProductController = require('../../controllers/products.controller')

router.get('/all', ProductController.allProducts)
router.post('/create', ProductController.createProduct)

router.get('/:id', ProductController.getById)
router.delete('/:id', ProductController.delById)
router.patch('/:id', ProductController.modifyById)

router.get('/filterByPrice?', ProductController.filterByPrice)
router.get('/search?', ProductController.searchByName)

module.exports = router